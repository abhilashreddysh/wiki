---
title: Nginx Setup
description: Setting up nginx for local network
tags: [linux, network, utils, nginx]
---

## Install Nginx
To install Nginx, use following command:

=== "Debian"

```console
sudo apt update
sudo apt install nginx
```

After installing it, you already have everything you need.

You can point your browser to your server IP address. You should see a default nginx page.

The root folder for the webpage is located at `/var/www/`

## Setting up reverse Proxy

Create a new file under `/etc/nginx/sites-available/` and create a symbolic link in `sites-enabled` to enable it.

```console
server {
        listen <port>;
        server_name <server-name>;
        location / {
                proxy_pass <dest-addr>:<port>;
        }
}

```