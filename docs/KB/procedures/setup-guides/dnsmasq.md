---
title: DNS Server Setup
description: Setting up dnsmasq for local dns server
tags: [linux, network, utils]
---

To setup Local Lan based DNS Server usuing _**dnsmasq**_.

## Install dnsmasq

First install dnsmasq package. From Terminal enter:

=== "Debian"

```bash
sudo apt install dnsmasq
```

## Configuration

Uncomment/update the below lines in `/etc/dnsmasq.conf`

Never forward plain names (without a dot or domain part)

```
domain-needed
```

Never forward addresses in the non-routed address spaces.

```
bogus-priv
```

Add local-only domains here, queries in these domains are answered from /etc/hosts or DHCP only.

```
local=/a.sh/
```

If you want dnsmasq to listen on by address (remember to include 127.0.0.1 if you use this.)

```
listen-address=192.168.1.11,127.0.0.1
```

Set this if you want to have a domain
automatically added to simple names in a hosts-file.

```
expand-hosts
```

Set the domain for dnsmasq. this is optional, but if it is set, it
does the following things.

1.  Allows DHCP hosts to have fully qualified domain names, as long
    as the domain part matches this setting.
2.  Sets the "domain" DHCP option thereby potentially setting the
    domain of all systems configured by DHCP
3.  Provides the domain part for "expand-hosts"

```
domain=a.sh

```

To set the cachesize.

```
cache-size=1000
```

## Adding hosts/records

Add hosts to `/etc/hosts` file to be able to resolve by dnsmasq.

??? example

    ```
    127.0.0.1       localhost

    # Manually added server list

    192.168.1.1 router
    192.168.1.11 zeb.a.sh zeb wiki torrent
    192.168.1.12 hpnotebook
    ```

## Advanced Setup

This will get you a basic dns setup for more advanced setup refer

- [Debian - dnsmasq](https://wiki.debian.org/dnsmasq)
