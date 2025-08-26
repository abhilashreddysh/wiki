---
title: Logical Volume Manager
description: Logical Volume Manager (LVM)
tags: [linux, lvm]
---

LVM (aka Logical Volume Manager) is a tool for logical volume management which includes allocating disks, striping, mirroring and resizing logical volumes.

## Overview

<div style="font-family:sans-serif;max-width:500px;margin:0 auto;font-size:13px;line-height:1.4">
  <!-- Physical Disks -->
  <div style="display:flex;gap:5px;justify-content:center;margin-bottom:3px;">
    <div style="border:1px solid #eee;padding:3px 5px;text-align:center;flex:1;">
      /dev/sda<br><small style="color:#777">500GB</small>
    </div>
    <div style="border:1px solid #eee;padding:3px 5px;text-align:center;flex:1;">
      /dev/sdb<br><small style="color:#777">1TB</small>
    </div>
  </div>
  <div style="text-align:center;color:#ccc;margin:-2px 0 3px;font-size:11px">▼</div>

  <!-- Physical Volumes -->
  <div style="display:flex;gap:5px;justify-content:center;margin-bottom:3px;">
    <div style="border:1px solid #eee;padding:3px 5px;text-align:center;flex:1;">
      PV1<br><small style="color:#777">500GB</small>
    </div>
    <div style="border:1px solid #eee;padding:3px 5px;text-align:center;flex:1;">
      PV2<br><small style="color:#777">1TB</small>
    </div>
  </div>
  <div style="text-align:center;color:#ccc;margin:-2px 0 3px;font-size:11px">▼</div>

  <!-- Volume Group -->
  <div style="border:1px solid #eee;padding:4px;text-align:center;margin:0 auto 3px;max-width:250px;">
    VG_SYSTEM<br><small style="color:#777">1.5TB</small>
  </div>
  <div style="text-align:center;color:#ccc;margin:-2px 0 3px;font-size:11px">▼</div>

  <!-- Logical Volumes -->
  <div style="display:flex;gap:5px;justify-content:center;">
    <div style="border:1px solid #eee;padding:3px 5px;text-align:center;flex:1;">
      /root<br><small style="color:#777">ext4</small>
    </div>
    <div style="border:1px solid #eee;padding:3px 5px;text-align:center;flex:1;">
      /home<br><small style="color:#777">xfs</small>
    </div>
    <div style="border:1px solid #eee;padding:3px 5px;text-align:center;flex:1;">
      swap
    </div>
  </div>
</div>
LVM consists of **three** main components:

- Physical Volume (**PV**)
- Volume Group (**VG**)
- Logical Volume (**LV**)

## Physical Volume

A physical volume is a collection of disk partitions used to store all server data.
These are the physical hard drives that are mounted to the CPU.

Physical volumes are usually mounted on `/dev/sda`,`/dev/sdb`, and so on.

### Creating a Physical Volume

To create a physical volume use `pvcreate` command

```console
pvcreate <device_name>
```

!!! example

    ```console
    pvcreate /dev/sda
    ```

The above command initializes/creates a physical volume.

!!! note

        Change `/dev/sda` according to your physical device name.
        To list all the volumes available use `lsblk` or `fdisk -l`.

### Display Physical Volumes

To display a physical volume use `pvdisplay` or `pvs` or `pvscan` commands.

## Volume Groups

A volume group (**VG**) is what we create when we combine multiple physical volumes to create a single storage structure, equal to the storage capacity of the combined physical devices.

### Creating a Volume Group

To create a volume group use `vgcreate` command

```console
vgcreate <vgname> <device_name>
```

!!! example

    ```console
    vgcreate vg00 /dev/sda
    ```

### Display Volume Groups

To display a volume groups use `vgdisplay` or `vgs` or `vgscan` commands.

### Extending Volume Group

To extend a volume group use `vgextend` command

```console
vgextend <vgname> <device_name>
```

## Logical Volume

After you create a volume group, you can create logical volumes within that volume group. A logical volume, although it may reside on noncontiguous physical partitions or even on more than one physical volume, appears to users and applications as a single, contiguous, extensible disk volume

### Creating a Logical Volume

To create a logical volume use `lvcreate` command

```console
lvcreate -n <lvname> -L <lvsize_in_M/G> <vgname>
```

!!! example

    ```console
    lvcreate -L 50G -n gfslv vg0
    ```

### Display Logical Volume

To display a logical volume use `lvdisplay` or `lvs` or `lvscan` commands.

### Extending Logical Volume

To extend a volume group use `lvextend` command

```console
lvextend -L [+/-]<size_to_be_inc/dec_number> <path_to_lv> -r
```

`-r` is used to automatically format the allocated storage to required type like ext4,xfs, etc.

!!! example

    ```console
    lvextend -L +50G /dev/mapper/testvg-testlv -r
    ```
