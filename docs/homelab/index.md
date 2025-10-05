---
title: Homelab Inventory
description: "Comprehensive overview of current homelab architecture, services, and recovery procedures."
tags:
  - infrastructure
  - network
  - inventory
status: updated
---

A living document defining the **hardware**, **VMs**, **networks**, and **core services** powering my HomeLab ecosystem.  
> _Primary Objective_: High-availability & rapid recovery across all nodes.

---

## Infrastructure

=== "Servers"

    ```yaml hl_lines="2 9"
    servers:
    - name: nexus
        specs: i5-12400 / 24GB DDR5 / 360GB HDD
        role: ["Primary Node", "Tailscale Gateway", "Proxmox Host"]
        os: Proxmox 9.x / Debian 13
        backup: hpnotebook
        uptime_policy: always-on

    - name: hpnotebook
        specs: i3-6006U / 12GB DDR4 / 1000GB HDD
        role: ["Secondary Node", "Backup Target"]
        os: Ubuntu 22.04 LTS
        backup: none
        uptime_policy: standby
    ```

=== "Virtual Machines"

    ```yaml hl_lines="2 10"
    vm:
    - name: docker-vm-01
        specs: 4c / 6G / Intel iGPU passthrough
        role: ["Primary Docker Host"]
        services:
          - jellyfin
          - immich
        backups: TBD

    - name: docker-vm-02
        specs: 2c / 4G
        role: ["Monitoring & Core Stack"]
        services:
          - Vaultwarden
          - Nginx Proxy Manager
          - Homepage
          - Grafana
          - Prometheus
          - ARR Stack:
              - Sonarr
              - Radarr
              - Prowlarr
          - Transmission
          - Jellyseerr
        backups: TBD
    ```

---

## Network Topology

=== "External Access Flow"

    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;font-size:13px;line-height:1.4">
    <!-- Remote Devices -->
    <div style="text-align:center;margin-bottom:4px;">
        <div style="border:1px solid #7c7c7c;padding:6px 10px;display:inline-block;">Remote Devices</div>
    </div>
    <div style="text-align:center;color:#7c7c7c;font-size:11px;margin:-2px 0 4px;">▼</div>
    <!-- Nexus Tailscale Gateway -->
    <div style="text-align:center;margin-bottom:4px;">
        <div style="border:1px solid #7c7c7c;padding:6px 10px;display:inline-block;">Tailscale Gateway<br><small style="color:#7c7c7c;font-size:11px;">Nexus / LXC</small></div>
    </div>
    <div style="text-align:center;color:#7c7c7c;font-size:11px;margin:-2px 0 4px;">▼</div>
    <!-- Reverse Proxy -->
    <div style="text-align:center;margin-bottom:4px;">
        <div style="border:1px solid #7c7c7c;padding:6px 10px;display:inline-block;">Reverse Proxy<br><small style="color:#7c7c7c;font-size:11px;">Nginx Proxy Manager</small></div>
    </div>
    <div style="text-align:center;color:#7c7c7c;font-size:11px;margin:-2px 0 4px;">▼</div>
    <!-- Internal Services -->
    <div style="display:flex;gap:5px;justify-content:center;flex-wrap:wrap;">
        <div style="border:1px solid #7c7c7c;padding:5px 8px;text-align:center;flex:1;min-width:100px;">Jellyfin</div>
        <div style="border:1px solid #7c7c7c;padding:5px 8px;text-align:center;flex:1;min-width:100px;">Vaultwarden</div>
        <div style="border:1px solid #7c7c7c;padding:5px 8px;text-align:center;flex:1;min-width:100px;">Immich</div>
        <div style="border:1px solid #7c7c7c;padding:5px 8px;text-align:center;flex:1;min-width:100px;">Grafana</div>
        <div style="border:1px solid #7c7c7c;padding:5px 8px;text-align:center;flex:1;min-width:100px;">Arr Stack</div>
    </div>
    </div>


=== "VLAN Map"

    ```yaml
    vlans:
    - id: 1
        name: LAN
        subnet: 10.10.0.0/16
        devices: [nexus, hpnotebook, router]
        dhcp: router
        notes: primary internal network

    - id: 2
        name: tailscale
        subnet: 100.64.0.0/10
        firewall: restricted
        notes: encrypted overlay for remote access
    ```

---

## Service Catalog

=== "Core Services"

    ```yaml
    core_services:
    - name: pi-hole
        type: DNS
        restore_priority: critical
        hosted_on: nexus/LXC
        dependency: network-online.target

    - name: tailscale
        type: VPN Mesh
        restore_priority: high
        hosted_on: nexus/LXC
        dependency: network-online.target

    - name: samba
        type: File Sharing
        restore_priority: high
        hosted_on: hpnotebook
        dependency: pi-hole
    ```

=== "Monitoring & Metrics"

    ```yaml
    observability:
      - grafana
      - prometheus
      - node-exporter
    ```

---

## Emergency Procedures

> **All commands should be executed from *Primary Node* `[nexus]` unless otherwise noted.**
> *Ensure network connectivity and backups before applying reset scripts.*

=== "Lockdown Procedure"

    ```bash
    # Step 1: Disable external access
    tailscale down

    # Step 2: Stop all Docker services
    docker stop $(docker ps -q)

    # Step 3: Flush all firewall rules
    ufw reset

    # Step 4: Verify containment
    nmap -sP 10.10.0.0/16
    ```

=== "Network Factory Reset"

    `TBD`

