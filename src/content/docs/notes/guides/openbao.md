---
title: "OpenBao Setup"
description: OpenBao Secrets Management Setup
---

## Overview

OpenBao is deployed as the central secrets management system for the homelab.

The goal of this deployment is:

* Keep secrets outside Git repositories
* Provide Kubernetes workloads with secrets securely
* Automatically recover after power loss or planned reboots
* Avoid manual intervention for family services
* Provide a migration path toward TPM2.0-based auto-unseal in the future

## Architecture

```
                    Proxmox Host
                         |
                         |
                  Alpine LXC Container
                  IP: 192.168.10.117
                         |
                         |
                    OpenBao v2.6.1
                         |
              ------------------------
              |                      |
          Raft Storage          Auto Unseal
              |                      |
 /var/lib/openbao/data     /etc/openbao/unseal
                                    |
                            3 Shamir Keys
```

## Current Environment

| Component       | Value          |
| --------------- | -------------- |
| Platform        | Proxmox LXC    |
| Container ID    | 110            |
| OS              | Alpine Linux   |
| IP Address      | 192.168.10.117 |
| OpenBao Version | v2.6.1         |
| Storage Backend | Raft           |
| Listener        | HTTP           |
| Service Manager | OpenRC         |
| Seal Type       | Shamir         |
| Shares          | 5              |
| Threshold       | 3              |

---

# LXC Configuration

Current Proxmox configuration:

```
arch: amd64
cores: 1
features: nesting=1
hostname: openbao
memory: 512
net0: name=eth0,bridge=vmbr0,firewall=1,ip=dhcp,type=veth
ostype: alpine
rootfs: local-lvm:vm-110-disk-0,size=2G
swap: 0
unprivileged: 1
```

The container is intentionally isolated from the public internet.

---

# Installation

Install required packages:

```bash
apk update
apk add wget tar ca-certificates
```

Download OpenBao:

```bash
cd /tmp

wget https://github.com/openbao/openbao/releases/download/v2.6.1/openbao_2.6.1_linux_amd64.tar.gz
```

Extract:

```bash
tar -xzf openbao_2.6.1_linux_amd64.tar.gz
```

Install:

```bash
install -m 0755 bao /usr/local/bin/bao
```

Verify:

```bash
bao version
```

Expected:

```
OpenBao v2.6.1
```

---

# OpenBao User and Directories

Create service user:

```bash
adduser -D -H -s /sbin/nologin openbao
```

Create directories:

```bash
mkdir -p /etc/openbao
mkdir -p /var/lib/openbao/data
mkdir -p /var/log/openbao
```

Permissions:

```bash
chown -R openbao:openbao /var/lib/openbao
chown -R openbao:openbao /var/log/openbao
```

---

# Configuration

File:

```
/etc/openbao/config.hcl
```

Current configuration:

```hcl
ui = true

storage "raft" {
  path    = "/var/lib/openbao/data"
  node_id = "openbao-01"
}

listener "tcp" {
  address     = "0.0.0.0:8200"
  tls_disable = true
}

api_addr = "http://192.168.10.117:8200"

cluster_addr = "http://192.168.10.117:8201"

log_level = "info"
```

## Notes

TLS is currently disabled because:

* OpenBao is only reachable inside the trusted LAN
* This is a homelab deployment
* TLS hardening will be added later

---

# OpenRC Service

OpenBao runs as an OpenRC managed service.

Service file:

```
/etc/init.d/openbao
```

Configuration:

```sh
#!/sbin/openrc-run

name="openbao"
description="OpenBao Server"

command="/usr/local/bin/bao"
command_args="server -config=/etc/openbao/config.hcl"

command_user="openbao:openbao"

supervisor="supervise-daemon"

output_log="/var/log/openbao/openbao.log"
error_log="/var/log/openbao/openbao.err"

depend() {
    need net
}

start_post() {
    sleep 5
    su -s /bin/sh openbao -c "/usr/local/bin/openbao-unseal.sh"
}
```

Enable at boot:

```bash
chmod +x /etc/init.d/openbao

rc-update add openbao default
```

Start:

```bash
rc-service openbao start
```

Check:

```bash
rc-service openbao status
```

---

# Initial Setup

Set OpenBao address:

```bash
export BAO_ADDR=http://127.0.0.1:8200
```

Initialize:

```bash
bao operator init
```

Current seal configuration:

```
Seal Type: shamir
Total Shares: 5
Threshold: 3
```

This means:

* 5 recovery keys are generated
* Any 3 keys are required to unseal

---

# Automatic Unseal

## Purpose

The homelab frequently experiences:

* planned reboots
* power failures
* graceful shutdowns

Manual unsealing would require logging into servers after every outage.

The current solution uses a local OpenRC startup script.

## Key Storage

Three unseal keys are stored locally:

```
/etc/openbao/unseal/

├── key1
├── key2
└── key3
```

Permissions:

```bash
chmod 700 /etc/openbao/unseal
chmod 600 /etc/openbao/unseal/*
chown -R openbao:openbao /etc/openbao/unseal
```

The remaining two keys are stored separately for recovery.

---

# Auto Unseal Script

Location:

```
/usr/local/bin/openbao-unseal.sh
```

Purpose:

1. Check OpenBao status
2. Detect sealed state
3. Apply three Shamir keys
4. Leave OpenBao ready for applications

Execution:

```bash
/usr/local/bin/openbao-unseal.sh
```

---

# Verification

Check status:

```bash
bao status
```

Healthy state:

```
Initialized     true
Sealed          false
Storage Type    raft
```

---

# Backup

OpenBao data is stored in:

```
/var/lib/openbao/data
```

Create Raft snapshot:

```bash
bao operator raft snapshot save /root/openbao-backup.snap
```

Backup:

* Raft snapshots
* Unseal recovery keys
* Root token

---

# Kubernetes Integration (Future)

Target architecture:

```
Kubernetes
    |
    |
External Secrets Operator
    |
    |
OpenBao
    |
    |
Applications
```

Git repositories will contain:

* ExternalSecret resources
* Application manifests
* Configuration

Secrets will remain inside OpenBao.

---

# Future Hardening

Planned improvements:

## TLS

Replace HTTP listener:

```
tls_disable = true
```

with proper certificates.

## TPM2.0 Auto-Unseal

Two homelab devices support TPM2.0.

Future architecture:

```
TPM 2.0
   |
   |
OpenBao Auto-Unseal
   |
   |
Kubernetes Secrets
```

## Additional Improvements

* Enable audit logging
* Automated Raft backups
* Kubernetes authentication
* External Secrets Operator
* Remove GitHub Actions secret injection workflow

---

# Recovery Procedure

If OpenBao starts sealed:

Check:

```bash
bao status
```

Manual unseal:

```bash
bao operator unseal
```

or run:

```bash
/usr/local/bin/openbao-unseal.sh
```

Verify:

```bash
bao status
```

Expected:

```
Sealed false
```

---

# Current Design Decision

This setup intentionally prioritizes:

* Availability
* Automatic recovery
* Family usability
* Homelab simplicity

Security hardening will be introduced incrementally as the platform evolves.
