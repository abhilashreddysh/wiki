---
title: Local SSL Certificate Authority
description: This guide will help you to create local CA and a wildcard certificate for unlimited subdomains.
tags:
  - linux
  - network
  - utils
  - ssl
  - certificate
---

To use my own Root CA to manage certificates in the homelab environment.

## Create a Root CA Certificate

First you need to create the Root’s private key,

```
openssl genrsa -des3 -out root.key 2048
```

??? example

    ```
    zeb:~/ssl_demo # openssl genrsa -des3 -out root.key 2048
    Enter PEM pass phrase:
    Verifying - Enter PEM pass phrase:
    zeb:~/ssl_demo # ll
    total 4
    -rw------- 1 root root 1854 Sep  8 20:34 root.key
    zeb:~/ssl_demo #
    ```

Now generate root CA

```
openssl req -newkey rsa:2048 -keyout root.key -nodes -x509 -days 3650 -out root.pem
```

Adjust `-days` to the need, this sets for next 10 years

??? example

    ```
    zeb:~/ssl # openssl req -x509 -new -nodes -key root.key -sha256 -days 7200 -out root.pem
    Enter pass phrase for root.key:
    You are about to be asked to enter information that will be incorporated
    into your certificate request.
    What you are about to enter is what is called a Distinguished Name or a DN.
    There are quite a few fields but you can leave some blank
    For some fields there will be a default value,
    If you enter '.', the field will be left blank.
    -----
    Country Name (2 letter code) [AU]:IN
    State or Province Name (full name) [Some-State]:Karnataka
    Locality Name (eg, city) []:Gauribidanur
    Organization Name (eg, company) [Internet Widgits Pty Ltd]:Homelab
    Organizational Unit Name (eg, section) []:Server
    Common Name (e.g. server FQDN or YOUR name) []:zeb.a.sh
    Email Address []:tendec99@gmail.com
    zeb:~/ssl #
    ```

### Check the contents of your Authority’s certificate by issuing,

```
openssl x509 -text -noout -in  root.pem | head -15
```

??? example

    ```
    zeb:~/ssl # openssl x509 -text -noout -in  root.pem | head -15
    Certificate:
        Data:
            Version: 3 (0x2)
            Serial Number:
                58:d0:e2:59:3c:5a:01:55:4c:ce:c8:4f:53:40:43:bf:7e:21:35:4c
            Signature Algorithm: sha256WithRSAEncryption
            Issuer: C = IN, ST = Karnataka, L = Gauribidanur, O = Homelab, OU = Server, CN = zeb.a.sh, emailAddress = tendec99@gmail.com
            Validity
                Not Before: Sep  8 14:00:19 2023 GMT
                Not After : May 26 14:00:19 2043 GMT
            Subject: C = IN, ST = Karnataka, L = Gauribidanur, O = Homelab, OU = Server, CN = zeb.a.sh, emailAddress = tendec99@gmail.com
            Subject Public Key Info:
                Public Key Algorithm: rsaEncryption
                    Public-Key: (2048 bit)
                    Modulus:
    ```

Also to make sure that this is a CA you can also issue this command,

```
openssl x509 -text -noout -in root.crt | grep CA
```

??? example

    ```
    zeb:~/ssl # openssl x509 -text -noout -in root.pem | grep CA
                CA:TRUE
    ```

This will be the main authority that issues certificates.

### Import the certificate to your browser

Navigate to **Preferences -> Certificates -> View Certificates -> Authorities** Tab and Import you `.crt`/`.pem` file.

!!! Note

    For chrome navigate to *Settings -> Privacy -> Manage Certificates* and import the file to ** Trusted root authorities**

## Create Self Signed Wildcard Certificate

Create our private key,

```
openssl genrsa -out wildcard-a-sh.key 2048
```

you can rename anything for the out file

??? example

    ```
    zeb:~/ssl # openssl x509 -text -noout -in root.pem | grep CA:
    CA:TRUE
    ```

#### Create opensslsan conf file for certs

Now we will create the certificate request by using the config file found below

```
vi opensslsan.cnf
```

```
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no
[req_distinguished_name]
#C = IN
#ST = Karnataka
#L = Gauribidanur
O = Homelab
OU = Home
CN = *.a.sh
[v3_req]
keyUsage = keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS.1 = *.a.sh
```

You can modify **CN** and **DNS** fields according to your needs

#### Generate _csr_ and _key_ files

```
openssl req -new -out wildcard-a-sh.csr \
-key wildcard-a-sh.key \
-config opensslsan.cnf
```

Now instead of sending the csr to a legitimate certificate authority so as to sign it with its private key, we will sign it with our own!

```
openssl x509 -req -in wildcard-a-sh.csr \
-CA root.pem \
-CAkey root.key \
-CAcreateserial \
-out wildcard-a-sh.crt \
-days 7200 \
-sha256 \
-extensions v3_req \
-extfile opensslsan.cnf
```

#### verify that the certificate is correct and the chain is trusted,

```
openssl verify -CAfile root.pem wildcard-a-sh.crt
```

#### View Wildcard Certificate

```
openssl x509 -text -noout -in  wildcard-a-sh.crt  | head -15
```

```
openssl x509 -text -noout -in  wildcard-a-sh.crt | grep DNS
```
