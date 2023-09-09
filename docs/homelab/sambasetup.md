---
title: Setting up Samba
description: Setting up samba as file share files across the network
tags:
  - linux
  - network
  - networkshare
  - samba
  - utils
---

## Install samba

First install Samba package. From Terminal enter:

=== "Debian"

```bash
sudo apt install samba
```

## Configure Samba File Server

Append the samba configuration file located in `/etc/samba/smb.conf` with below lines.

### Restricted share

#### What is Restricted share

- Share only for specific group
- Only accessible if correct username and password is provided

```conf title="/etc/samba/smb.conf"
[SHARE-NAME]
    comment = ANY-COMMENT
    // highlight-next-line
    # allows only users from that group to access this path
    valid users = @GROUPNAME
    path = /PATH/TO/SHARE/DIR/
    read only = no
    browseable = yes
```

Make sure to update values to your server directory to be used.

??? abstract "Breakdown of values to be updated.."

    |        Value        |                                    Description                                    |
    | :-----------------: | :-------------------------------------------------------------------------------: |
    |     SHARE-NAME      | Share name that is visible to the Network. Use something that describes the share |
    |     ANY-COMMENT     |                Comments for better understanding. Can be anything                 |
    |     @GROUPNAME      |              Used to restrict the share to specific group in linux.               |
    | /PATH/TO/SHARE/DIR/ |                 Absolete Path to directory that should be shared                  |

### Guest Share

#### What is Guest Share

- Anyone can access this share.
- This share will be visible without username or password.
- If the user enters wrong username and password this share will be visible.

```conf title="/etc/samba/smb.conf"
[guest]
comment = Guest File Share
// highlight-next-line
path = /PATH/TO/SHARE/DIR/ # change the path to match your guest FS
read only = no
browseable = yes
guest ok = yes
guest only = yes
writeable = yes
```

## Create the directory

Samba is now configured, the directory needs to be created and the permissions changed.

```bash
sudo mkdir -p /PATH/TO/SHARE/DIR/
sudo chown nobody:nogroup /PATH/TO/SHARE/DIR/
```

!!! note "The -p switch tells mkdir to create the entire directory tree if it doesn’t already exist."

## Enable the new configuration

Restart the Samba services to enable the new configuration by running the following command:

=== "Debian"

```bash
sudo systemctl restart smbd.service nmbd.service
```

</TabItem>
</Tabs>

## Advanced Setup

This will get you a basic samba setup to share files for more advanced setup refer

- [Advanced Setup for smb.conf](https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html)
- [Ubuntu Documentation](https://help.ubuntu.com/community/Samba)
