---
title: How to Analyze Nginx configuration for security flaws
description: Analyze Nginx configuration for security flaws
tags:
  - linux
  - network
  - webserver
---

> Gixy is a tool to analyze [Nginx](setup-guides/nginx.md) configuration. The main goal of Gixy is to prevent security misconfiguration and automate flaw detection. Currently supported Python versions are 2.7 and 3.5+. Right now Gixy can find:
>
> 1. [ssrf] Server Side Request Forgery
> 2. [http_splitting] HTTP Splitting
> 3. [origins] Problems with referrer/origin validation
> 4. [add_header_redefinition] Redefining of response headers by “add_header” directive
> 5. [host_spoofing] Request’s Host header forgery
> 6. [valid_referers] none in valid_referers
> 7. [add_header_multiline] Multiline response headers

## Installation

Type the following command:

```sh
pip install gixy
```

### How do I use Gixy?

The syntax is:

```
$ gixy /etc/nginx/nginx.conf
$ gixy [options] /etc/nginx/nginx.conf
```

Here is the output from my own site:

```
(venv) abhi@dev-vm:~$ gixy /etc/nginx/nginx.conf
[nginx_parser]  WARNING File not found: /etc/nginx/modules-enabled/*.conf
[nginx_parser]  WARNING File not found: /etc/nginx/conf.d/*.conf

==================== Results ===================
No issues found.

==================== Summary ===================
Total issues:
    Unspecified: 0
    Low: 0
    Medium: 0
    High: 0

(venv) abhi@dev-vm:~$ gixy /etc/nginx/sites-available/*

==================== Results ===================
File path: /etc/nginx/sites-available/default
No issues found.

--------8<--------8<--------8<--------8<--------
File path: /etc/nginx/sites-available/reverse-proxy
No issues found.

--------8<--------8<--------8<--------8<--------
File path: /etc/nginx/sites-available/wiki
No issues found.

==================== Summary ===================
Total issues:
    Unspecified: 0
    Low: 0
    Medium: 0
    High: 0

```

### Options

To see gixy option type:

```
$ gixy -h
```

Sample outputs:

```
positional arguments:
  nginx.conf            Path to nginx.conf, e.g. /etc/nginx/nginx.conf

optional arguments:
  -h, --help            show this help message and exit
  -c CONFIG_FILE, --config CONFIG_FILE
                        config file path
  --write-config CONFIG_OUTPUT_PATH
                        takes the current command line args and writes them
                        out to a config file at the given path, then exits
  -v, --version         show program's version number and exit
  -l, --level           Report issues of a given severity level or higher (-l
                        for LOW, -ll for MEDIUM, -lll for HIGH)
  -f {text,json,console}, --format {text,json,console}
                        Specify output format
  -o OUTPUT_FILE, --output OUTPUT_FILE
                        Write report to file
  -d, --debug           Turn on debug mode
  --tests TESTS         Comma-separated list of tests to run
  --skips SKIPS         Comma-separated list of tests to skip
  --disable-includes    Disable "include" directive processing

plugins options:
  --origins-domains domains
                        Default: *
  --origins-https-only https_only
                        Default: False
  --add-header-redefinition-headers headers
                        Default: x-frame-options,x-xss-protection,content-
                        security-policy,x-content-type-options,cache-control


available plugins:
	add_header_multiline
	http_splitting
	host_spoofing
	origins
	add_header_redefinition
	valid_referers
	ssrf
```

## Reference

- [gixy github](https://github.com/yandex/gixy)
