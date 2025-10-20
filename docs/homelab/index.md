---
title: Homelab Overview
description: "Comprehensive overview of current homelab architecture, services, and recovery procedures."
tags:
  - infrastructure
  - network
  - inventory
status: updated
---

!!! info "Important Note"

    This document is intentionally **anonymized**: hostnames, IP ranges, exact OS versions, and specific product names are replaced with generic descriptors.

### Infrastructure

```yaml
physical_servers:
  - name: Primary Node
    specs: mid-range CPU / 24GB RAM / ~500GB storage
    role: ["Primary Node", "VPN Gateway", "Hypervisor Host"]
    os: Virtualization OS / Linux
    backup: Secondary Node
    uptime_policy: always-on

  - name: Secondary Node
    specs: low-mid CPU / 12GB RAM / ~1TB storage
    role: ["Secondary Node", "Backup Target"]
    os: Linux
    backup: none
    uptime_policy: standby

vm:
  - name: Docker Host A
    specs: 4 cores / 6GB RAM / GPU passthrough
    role: ["Primary Docker Host"]
    services:
      - Media Server
      - Photo Backup

  - name: Docker Host B
    specs: 2 cores / 4GB RAM
    role: ["Monitoring & Core Stack"]
    services:
      - Password Manager
      - Reverse Proxy
      - Dashboard / Metrics
      - Automation Stack
      - Torrent / Media Download

lxc:
  - name: VPN LXC
    purpose: Encrypted remote gateway
    host: Primary Node
    resources: small
    uptime_policy: always-on

  - name: DNS LXC
    purpose: Internal DNS / DHCP services
    host: Primary Node
    resources: small
    uptime_policy: always-on

  - name: CI LXC
    purpose: CI/CD IaC
    host: Primary Node
    resources: small-to-medium
    uptime_policy: on-demand
```

## Networking


=== "Home Network"

    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;font-size:13px;line-height:1.4">
        <!-- Internet / ISP -->
        <div style="text-align:center;margin-bottom:4px;">
            <div style="border:1px solid #7c7c7c;padding:6px 10px;display:inline-block;">Internet (ISP)</div>
        </div>
        <div style="text-align:center;color:#7c7c7c;font-size:11px;margin:-2px 0 4px;">⇅</div>
        <!-- ISP Router -->
        <div style="text-align:center;margin-bottom:4px;">
            <div style="border:1px solid #7c7c7c;padding:6px 10px;display:inline-block;">ISP Router [Subnet A]<br><small style="color:#7c7c7c;font-size:11px;">Modem/Router combo</small></div>
        </div>
        <div style="text-align:center;color:#7c7c7c;font-size:11px;margin:-2px 0 4px;">⇅</div>
        <div style="text-align:center;margin-bottom:4px;">
            <div style="border:1px solid #7c7c7c;padding:6px 10px;display:inline-block;">Home Router [Internal LAN]<br><small style="color:#7c7c7c;font-size:11px;">Wi‑Fi + Ethernet for devices</small></div>
        </div>
        <div style="text-align:center;color:#7c7c7c;font-size:11px;margin:-2px 0 4px;">⇅</div>
        <!-- Devices -->
        <div style="display:flex;gap:5px;justify-content:center;flex-wrap:wrap;">
            <div style="border:1px solid #7c7c7c;padding:5px 8px;text-align:center;flex:1;min-width:100px;">Desktop / Laptop</div>
            <div style="border:1px solid #7c7c7c;padding:5px 8px;text-align:center;flex:1;min-width:100px;">Phone / Tablet</div>
            <div style="border:1px solid #7c7c7c;padding:5px 8px;text-align:center;flex:1;min-width:100px;">Smart TV / IoT</div>
            <div style="border:1px solid #7c7c7c;padding:5px 8px;text-align:center;flex:1;min-width:100px;">Server / Lab Device</div>
        </div>
    </div>

=== "Remote Access"

    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;font-size:13px;line-height:1.4">
        <!-- Remote Devices -->
        <div style="text-align:center;margin-bottom:4px;">
            <div style="border:1px solid #7c7c7c;padding:6px 10px;display:inline-block;">Remote Devices</div>
        </div>
        <div style="text-align:center;color:#7c7c7c;font-size:11px;margin:-2px 0 4px;">▼</div>
        <!-- Gateway -->
        <div style="text-align:center;margin-bottom:4px;">
            <div style="border:1px solid #7c7c7c;padding:6px 10px;display:inline-block;">Encrypted Remote Gateway<br><small style="color:#7c7c7c;font-size:11px;">VPN / Overlay Network</small></div>
        </div>
        <div style="text-align:center;color:#7c7c7c;font-size:11px;margin:-2px 0 4px;">▼</div>
        <!-- Reverse Proxy -->
        <div style="text-align:center;margin-bottom:4px;">
            <div style="border:1px solid #7c7c7c;padding:6px 10px;display:inline-block;">Reverse Proxy<br><small style="color:#7c7c7c;font-size:11px;">Handles Internal Services</small></div>
        </div>
        <div style="text-align:center;color:#7c7c7c;font-size:11px;margin:-2px 0 4px;">▼</div>
        <!-- Internal Services -->
        <div style="display:flex;gap:5px;justify-content:center;flex-wrap:wrap;">
            <div style="border:1px solid #7c7c7c;padding:5px 8px;text-align:center;flex:1;min-width:100px;">Media Server</div>
            <div style="border:1px solid #7c7c7c;padding:5px 8px;text-align:center;flex:1;min-width:100px;">Password Manager</div>
            <div style="border:1px solid #7c7c7c;padding:5px 8px;text-align:center;flex:1;min-width:100px;">Dashboard / Monitoring</div>
            <div style="border:1px solid #7c7c7c;padding:5px 8px;text-align:center;flex:1;min-width:100px;">Automation / Stack</div>
            <div style="border:1px solid #7c7c7c;padding:5px 8px;text-align:center;flex:1;min-width:100px;">Other Service</div>
        </div>
    </div>


=== "VLAN Map"

    ```yaml
    vlans:
    - id: 1
        name: WAN
        subnet: Subnet A
        dhcp: router
        notes: ISP network / failover

    - id: 2
        name: LAN
        subnet: Internal LAN
        devices: [gateway, workstation, router]
        dhcp: internal DHCP
        notes: Primary internal network

    - id: 3
        name: VPN Overlay
        subnet: Overlay Network
        firewall: restricted
        notes: Encrypted remote access / VPN
    ```


## Service Catalog 

=== "Core Services"

    ```yaml
    core_services:
    - name: DNS / DHCP
        type: network services
        restore_priority: critical
        hosted_on: gateway / virtual node
        dependency: network-online.target

    - name: VPN Mesh
        type: encrypted overlay
        restore_priority: high
        hosted_on: gateway / virtual node
        dependency: network-online.target

    - name: File Sharing
        type: storage service
        restore_priority: high
        hosted_on: workstation
        dependency: DNS / DHCP
    ```
=== "Observability"
    ```yaml
    observability:
    - Dashboard / Metrics
    - Time Series DB
    - Node Exporter
    ```

## Emergency Procedures 

!!! danger Important
 
    All commands should be executed from *Primary Node* `[gateway]` unless otherwise noted.
    Ensure network connectivity and backups before applying reset scripts.

=== "**Lockdown Procedure**"

    ```bash
    # Step 1: Disable remote/overlay access
    vpn stop

    # Step 2: Stop all containerized services
    container stop --all

    # Step 3: Reset firewall rules to default
    firewall reset

    # Step 4: Verify network containment
    network-scan local-subnets
    ```

=== "**Network Factory Reset**"

    ```text
    # Implementation depends on your environment.
    # Generic steps: backup configuration → disconnect internet → reset network devices → restore minimal services.
    ```
