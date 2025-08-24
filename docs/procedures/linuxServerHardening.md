---
title: Linux Server Hardening
description: Linux Server Hardening
tags:
  - linux
  - setup
---

## Install security updates and patches

Keeping your server updated is the first line of defense.

=== "apt"

    Distros Applicable : `Debian/Ubuntu`

    Install latest Updates

    ```bash
    sudo apt update && sudo apt upgrade -y
    ```

    Enable automatic security updates:

    ```bash
    sudo apt install unattended-upgrades
    sudo dpkg-reconfigure --priority=low unattended-upgrades
    ```
    Remove unnecessary packages:

    ```bash
    sudo apt autoremove -y
    ```

=== "yum"

    Distros Applicable : `RHEL/CentOS/OCL`

    Install latest Updates

    ```bash
    sudo yum update -y # Fedora
    sudo dnf update -y
    ```

    Remove unnecessary packages:

    ```bash
    sudo yum autoremove -y
    ```

## Strong Passwords

Use a strong password consists of a variety of characters (alphanumeric, numbers, special characters).

[Password Generator :fontawesome-solid-external-link:](https://safepasswordgenerator.net/ "External Link"){ .md-button }
