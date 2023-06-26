---
slug: linuxwebconsole
title: Linux Web Console
description: Version - 1.0
sidebar_position: 3
tags: [linux, bash, php, moniter, web]
authors: abhi
---

Web page setup to moniter services and stats of a remote linux machine

<!--truncate-->

:::info Version - 1.0
[Repository Link](https://github.com/abhilashreddysh/AutomationScripts/tree/main/WebConsole)
:::

### Requirements

- Nginx
- PHP

### Setup

- Download the folder and save in nginx `sites-enabled` folder.
- Point the default nginx webpage to this folder.
- To be able to use the restart feature allow `www-data` user to act as sudo for these commands

```config title="/etc/sudoers.d/www-data-access"
%www-data ALL=NOPASSWD: /bin/systemctl restart nginx
%www-data ALL=NOPASSWD: /bin/systemctl restart sshd
%www-data ALL=NOPASSWD: /bin/systemctl restart smbd
%www-data ALL=NOPASSWD: /bin/systemctl restart transmission-daemon
```
This will allow www-data user to be able to use only the above commands as a sudo user.

Add more if there are any other services to be monitered.