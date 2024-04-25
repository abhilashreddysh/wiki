---
title: Bookstack Setup
description: Setting up bookstack for local network
tags: [linux, bookstack, wiki]
---

## Requirements

#### php >= 8.0.2

- For installation and maintenance, you’ll need to be able to run php from the command line.
- Required Extensions: OpenSSL, PDO, MBstring, iconv, Tokenizer, GD, MySQL, SimpleXML & DOM.

=== "Debian"

```
apt install php8.2-fpm php-cli php-gd php-mysql php-xml php-mbstring php-curl
```

uncommnet the lines in php.ini on `/etc/php/8.2/fpm/php.ini`

```
extension=curl
extension=mbstring
extension=exif      ; Must be after mbstring as it depends on it
extension=openssl
extension=pdo_mysql

```

#### MySQL >= 5.7 or MariaDB >= 10.2

- For the storage of BookStack content and data.
- Single Database (All permissions advised since application manages schema)

=== "Debian"

```
apt install mariadb-server
```

#### Git Version Control

For application of updates when following our standard process.

=== "Debian"

```
apt install git
```

#### A PHP Compatible Webserver

For usage with PHP and for serving static files.

[NGINX](nginx.md) or APACHE

#### Composer >= v2.0

- For installation and management of our PHP dependencies.

follow the [page](https://getcomposer.org/) linked and then move the file to `PATH`

```
sudo mv composer.phar /usr/local/bin/composer
```

## Installation

- Clone the release branch of the BookStack GitHub repository into a folder.

```
git clone https://github.com/BookStackApp/BookStack.git --branch release --single-branch
```

- `cd` into the application folder and run

```
composer install --no-dev
```

- Copy the `.env.example` file to `.env` and fill with your own database and mail details.
- Ensure the `storage`, `bootstrap/cache` & `public/uploads` folders are writable by the web server.
- In the application root, Run `php artisan key:generate` to generate a unique application key.
- If not using Apache or if `.htaccess` files are disabled you will have to create some URL rewrite rules as shown below.
- Set the web root on your server to point to the BookStack public folder. This is done with the root setting on Nginx or the DocumentRoot setting on Apache.
- Run `php artisan migrate` to update the database.
- Done! You can now login using the default admin details `admin@admin.com` with a password of `password`. You should change these details immediately after logging in for the first time.
