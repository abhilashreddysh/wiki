---
title: Transmission BitTorrent Setup
description: transmission setup to download torrents on cli
tags:
  - linux
  - network
  - transmission
  - utils
---

## Installation

Install transmission packages from terminal enter:

=== "Debian"

```bash
sudo apt install transmission-cli transmission-common transmission-daemon
```

## Configuration

### Trasmission stop

Make sure the Transmission daemon is not running when changing the config file otherwise your changes will be over written.

```bash
sudo service transmission-daemon stop
```

edit `/var/lib/transmission-daemon/info/settings.json`

```bash
sudo nano /var/lib/transmission-daemon/info/settings.json
```

### Username and Password

The default rpc-username and password is `transmission`

Change if increased security is required.

Change it to whatever you want (any password will work). After next restart the password will be rewritten in SHA1 encrypted format for security reasons.

```bash title="/var/lib/transmission-daemon/info/settings.json"
"rpc-password": "{62b16db87b89a91dd49a5110a7cafc06d20eb4f2wtK6kqPj",
"rpc-username": "transmission",
```

### Whitelist

This must be changed for remote access
rpc-whitelist defines access to transmission. Localhost (`127.0.0.1`) is defined by default. I added ,`192.268.*.*` to allow any machine on my LAN access.

```bash
"rpc-whitelist": "127.0.0.1,192.168.*.*",
```

### umask parameter

You will also have to set the "umask" parameter in Transmission’s settings file to “2” (default is 18) for the account user to have full access to files/folders created by Transmission.

```bash
"umask": 2,
```

### Transmission Restart

After configuration change, restart transmission

```bash
sudo service transmission-daemon start
```

## Default File Directory

Place a torrent file in this directory for automatic file download

```
/var/lib/transmission-daemon/downloads/
```

## Configure Users and Permissions

It is recommended that Transmission runs under it’s own username for security reasons. This creates a few issues with file and folder access by Transmission as well as your account (let us assume it is user).

Add the username user to the group debian-transmission:

```bash
sudo usermod -a -G debian-transmission user
```

Change "user" to you own Ubuntu user login name.

!!! note

    When adding a user to a new group, the user must log out and log back in for it to take affect. A reboot will also accomplish this.

## Web Interface

With your browser you can now add torrents, download and seed. You can also configure many transmission settings.

```
http://<server-ip>:9091
```

## Command Line Interface

With a headless server full control of Transmission requires CLI

### Transmission Create

Create a torrent file with transmission CLI. Torrent files can be generated from either a single file or directories. The example below is a directory example

```console
transmission-create -o /var/lib/transmission-daemon/downloads/files.torrent -c "My comments" -t udp://tracker.openbittorrent.com:80 -t udp://open.demonii.com:1337 -t udp://tracker.coppersurfer.tk:6969 -t udp://tracker.leechers-paradise.org:6969 ~/torrent/complete/
```

??? abstract "Breakdown of options used.."

    |                         Option                          |                                                              Description                                                              |
    | :-----------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: |
    | -o /var/lib/transmission-daemon/downloads/files.torrent |                                            New torrent name and where to store the torrent                                            |
    |                    -c "My comments"                     |                                                Any comments to be attached to the file                                                |
    |         -t udp://tracker.openbittorrent.com:80          |
    |             -t udp://open.demonii.com:1337              |
    |          -t udp://tracker.coppersurfer.tk:6969          |
    |       -t udp://tracker.leechers-paradise.org:6969       |                    Trackers for the torrents, more than one tracker is recommended in case one or more goes down.                     |
    |                   ~/torrent/complete/                   | Directory to be made into a torrent. If a single file is required use this format `/var/lib/transmission-daemon/downloads/MyFile.txt` |

For more information about "transmission-create" - `transmission-create -h`

### Add a Torrent

To add a torrent to the daemon, use this command:

```console
transmission-remote -a [path to file].torrent
```

```console
transmission-remote -n 'transmission:transmission' -a /var/lib/transmission-daemon/downloads/files.torrent
```

### Torrent Information

Display information about torrent's being downloaded

|       Description        |                          Command                           |
| :----------------------: | :--------------------------------------------------------: |
|     Help information     |                   transmission-remote -h                   |
|    List all torrents     |       transmission-remote -n 'username:password' -l        |
| Basic Stats All Torrents |   transmission-remote -n 'transmission:transmission' -st   |
| Full Stats All Torrents  |   transmission-remote -n 'transmission:transmission' -si   |
|  Torrent #3 Full Stats   | transmission-remote -n 'transmission:transmission' -t 3 -f |
| Torrent #3 Summary Stats | transmission-remote -n 'transmission:transmission' -t 3 -i |

!!! note

    Authentication is required. Here **transmission:transmission** refers to `username:password` set to transmission

### Transmission Control

|         Description         |                          Command                           |
| :-------------------------: | :--------------------------------------------------------: |
|     Start all torrents      |   transmission-remote -n 'transmission:transmission' -s    |
|      Stop all torrents      |   transmission-remote -n 'transmission:transmission' -S    |
|  Start a specific torrent   |               transmission-remote -s [hash]                |
|                             | transmission-remote -n 'transmission:transmission' -s -t 3 |
|   Stop a specific torrent   |               transmission-remote -S [hash]                |
|                             | transmission-remote -n 'transmission:transmission' -S -t 3 |
|     Remove all torrents     |   transmission-remote -n 'transmission:transmission' -r    |
|  Remove a specific torrent  |               transmission-remote -r [hash]                |
|                             | transmission-remote -n 'transmission:transmission' -r -t 3 |
| Get hashes for all torrents |   transmission-remote -n 'transmission:transmission' -i    |
|       Quit the daemon       |   transmission-remote -n 'transmission:transmission' -q    |
