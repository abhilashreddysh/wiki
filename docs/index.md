---
title: "Hub"
hide:
  - navigation
  - toc
  - footer
---

# :material-server-network: HomeLab Knowledge Hub {#main-header}

<div class="grid cards" markdown="1">

- **:material-account-hard-hat: Quick Links**

      - [Disaster Recovery](# "Work In Progress")
      - [Network Reset](# "Work In Progress")
      - [Credentials Vault](lab/security/index.md#credentials-vault) _(🔒)_

- **:material-book-multiple: Knowledge Base**

      - [Standard Procedures](# "Work In Progress")
      - [Troubleshooting Guides](# "Work In Progress")
      - [Change Log](# "Work In Progress")

</div>

---

## :material-cube-outline: Infrastructure Blueprint

=== "Physical Inventory"

    ```yaml hl_lines="2 7"
    servers:
      - name: hpnotebook
        make: hpnotebook
        specs: i3-6006U/12GB
        role: ["Secondary", "docker"]
        backup: none
      - name: nexus
        specs: Intel(R) Pentium(R) Dual  CPU  E2200  @ 2.20GHz (2 vCPU)
        role: ["Primary", "tailscale", "samba"]
        backup: none
    ```

=== "Network Topology"

    ```yaml
    vlans:
      - id: 1
        name: LAN
        subnet: 192.168.1.0/24
        devices: [hpnotebook, nexus, router]

      - id: 2
        name: tailscale
        subnet: 100.64.0.0/10
        firewall: restricted
    ```

=== "Service Catalog"

    ```yaml
    core_services:
      - name: samba
        type: file-sharing
        restore_priority: high
    ```

---

## :material-alert-octagon: Emergency Procedures

=== "Lockdown Procedure"

    ```sh
    TBD
    ```

=== "Network Factory Reset"

    ```bash
    TBD
    ```

---

## :material-bookmark-multiple: Critical Bookmarks

<div class="grid cards" markdown="1">
- [Network Diagrams](# "Work In Progress")
- [Password Matrix (🔒)](lab/security/index.md#password-matrix)
- [Service Dependencies](# "Work In Progress")
</div>
