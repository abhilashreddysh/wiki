---
id: network-share-in-fstab
title: Network Share in fstab
description: Adding network share in fstab to auto mount during boot
sidebar_position: 2
tags: [linux, network, fstab, networkshare, nfs]
last_update:
  date: 06/29/2023 # Should be MM/DD/YYYY
  author: Abhilash Reddy
---

This page shows you how to setup network share to auto mount during boot.

## Verify Connection

Check if your network share is accessible from the target system where you are setting up this `fstab` entry

```bash
sudo mount -t cifs -o username=user //server_name/share_name /mnt/networkshare/
```

## Backup /etc/fstab

Backup fstab file to your home directory. Use `.bak` extension for backups.

```bash
cp /etc/fstab ~/system_backups
```

:::tip Save all your original backups files under ~/system_backups
:::

## Create Mount Folder

Now create a directory to where the Network share should be mounted

:::tip In Linux `/mnt` or `/media` are used to mount external drives
:::

```bash
mkdir /mnt/networkshare
```

`networkshare` van be replaced with any name you like. Use an appropriate name to understand what files are available in the share

## Install additional required packages

Install `cifs-utils` package to be able to mount the share drive to linux systems

```bash
sudo apt install cifs-utils -y
```

## Add `fstab` Entry

Linux mounts all the drives to the mount points during system boot.

```bash
//server_name/share_name /mnt/networkshare cifs username=user,password=userpassword vers=2.0 0 0
```
:::caution Update below values to your server specific share

- `server_name`
- `share_name`
- `networkshare`
- `user`
- `userpassword`
:::
Now save and exit the fstab file.

## Mounting the network share

Now that the fstab entry has been added to mount the network drive. These drives wont mount automatically until you reboot the system. You may have to mount the drives manually for this time.

### Manual Mounting

To mount the drives manually, you need to reload the systemd as it still uses the old version of the fstab.

To update systemd to use the latest version reload the system with the below command.

```bash
systemctl daemon-reload
```

Now run mount to attach all the drives that are available in `/etc/fstab`

```bash
mount -a
```
