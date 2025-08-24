---
title: SSL cert setup for duckdns
tags:
  - linux
  - certificate
  - ssl
  - ddns
---

There are Certification Authorities that allow to create trusted certificates.

Using them will avoid the warnings that we receive.

The Certificate Authority I’ll use for this is [https://letsencrypt.org/](https://letsencrypt.org/):

> Let’s Encrypt is a free, automated, and open Certificate Authority.

The process of creating a certificate and updating it (when it expires) is a little bit involved and while we could do it manually, for this step I’ll use a script that takes care of a lot of details directly for us.

You can find it there: [https://dehydrated.io/](https://dehydrated.io/)

> Dehydrated is a client for signing certificates with an ACME-server (currently only provided by Let’s Encrypt) implemented as a relatively simple bash-script.

The bash-script it’s referring to is here: [https://github.com/lukas2511/dehydrated](https://github.com/lukas2511/dehydrated)

## Dehydrated

If you want to grab the code from github you could checkout it with git or svn at the url: “_https://github.com/lukas2511/dehydrated.git_”

### Just grab the code

Let’s now download it straight from the source:
#### With git

With git you can simply grab the code (and it will create the dehydrated folder for you).

```sh
git clone https://github.com/lukas2511/dehydrated.git
```

That’s the output:

```sh
~/certs $ git clone https://github.com/lukas2511/dehydrated.git

Cloning into 'dehydrated'...

remote: Enumerating objects: 8, done.

remote: Counting objects: 100% (8/8), done.

remote: Compressing objects: 100% (7/7), done.

remote: Total 1922 (delta 1), reused 5 (delta 1), pack-reused 1914

Receiving objects: 100% (1922/1922), 637.08 KiB | 757.00 KiB/s, done.

Resolving deltas: 100% (1200/1200), done.
```

Enter in the folder to continue:

 ```sh
cd dehydrated/
```

### Make it executable

One important step is now to make the script executable.

This can be easily done with the command:

```
chmod a+x dehydrated
```

Ok, if we follow the documentation it says that before executing it we need to specify the domain we want to secure inside a file named “_domains.txt_” (you can read this here: “https://github.com/lukas2511/dehydrated/blob/master/docs/domains_txt.md”)

Let’s do this then:

```
nano domains.txt
```

Inside this file just write the name of your website, that should be something like this, naturally with your specific domain specified:

```
<your_domain>.duckdns.org
```

Once this is done we need to edit another file “_config_”

```
nano config
```

You can read about it here: “[https://github.com/lukas2511/dehydrated#config](https://github.com/lukas2511/dehydrated#config)”

Write this inside it:

```config
# Which challenge should be used? Currently http-01 and dns-01 are supported

CHALLENGETYPE="dns-01"

# Script to execute the DNS challenge and run after cert generation

HOOK="${BASEDIR}/hook.sh"
```

### Under the hood

If you are not interested into the details of what we just wrote, [skip](#ok-where-were-we) this section, otherwise bare with me.

Going back to Let’s Encrypt, let’s read more of its definition:

“_To enable HTTPS on your website, you need to get a certificate (a type of file) from a Certificate Authority (CA). Let’s Encrypt is a CA. In order to get a certificate for your website’s domain from Let’s Encrypt, you have to demonstrate control over the domain. With Let’s Encrypt, you do this using software that uses the [ACME protocol](https://ietf-wg-acme.github.io/acme/), which typically runs on your web host._”

Dehydrated is one of this software (well, script in this case) that use the ACME protocol we need. In fact, looking at dehydrated once again:

“_Dehydrated is a client for signing certificates with an ACME-server (e.g. Let’s Encrypt) implemented as a relatively simple (zsh-compatible) bash-script. This client supports both ACME v1 and the new ACME v2 including support for wildcard certificates!_”

Now, Let’s Encrypt need a demonstration that you control the domains you want to secure. For this we use the “dns-01” verification (you can read about other types of verification on their website). The details are here: [https://docs.certifytheweb.com/docs/dns-validation.html](https://docs.certifytheweb.com/docs/dns-validation.html)

Dehydrated supports “dns-01” ([https://github.com/lukas2511/dehydrated/blob/master/docs/dns-verification.md](https://github.com/lukas2511/dehydrated/blob/master/docs/dns-verification.md)).

As described in that documentation, this type of verification requires you to be able to create a specific TXT DNS record (from [wikipedia](https://en.wikipedia.org/wiki/TXT_record): “_a type of resource record in the Domain Name System (DNS) used to provide the ability to associate arbitrary text with a host or other name, such as human readable information about a server, network, data center, or other accounting information._“) for each hostname included in the certificate.

Dehydrated then specified that we need a hook script that deploys the challenge to our DNS server.

In order to do this, dehydrated will invoke our hook script… more on this in a bit.

As a matter of fact, DuckDNS allows us to generate this TXT record.

Looking at the documentation ([https://www.duckdns.org/spec.jsp](https://www.duckdns.org/spec.jsp)):

“_The TXT update URL can be requested on HTTPS or HTTP._”

and again:

“_You can update your domain(s) TXT record with a single HTTPS get to DuckDNS your TXT record will apply to all sub-subdomains under your domain e.g. xxx.yyy.duckdns.org shares the same TXT record as yyy.duckdns.org_”

As an example it’s given:

```
https://www.duckdns.org/update?domains={YOURVALUE}&token={YOURVALUE}&txt={YOURVALUE}[&verbose=true][&clear=true]
```

as you will see, we’ll do this in our dehydrated hook, using something like:

```
curl "https://www.duckdns.org/update?domains=$domain&token=$token&txt=$4"
```

The “$4” parameter is explained in dehydrated documentation (all the parameters):

- $1 an operation name (clean_challenge, deploy_challenge, deploy_cert, invalid_challenge or request_failure) and some operands for that.

For deploy_challenge

- $2 is the domain name for which the certificate is required,
- $3 is a “challenge token” (which is not needed for dns-01), and
- $4 is a token which needs to be inserted in a TXT record for the domain.

The DuckDNS hook is the one indicated online always in the documentation: [https://github.com/lukas2511/dehydrated/wiki/DNS-01-hook-for-DuckDNS](https://github.com/lukas2511/dehydrated/wiki/DNS-01-hook-for-DuckDNS)

As another example, to clear the token the real important part is only the last parameter to pass to DuckDNS: “_clear=true_“.

Note that the challenge token is what we’ll receive from Let’s Encrypt.

So, the full logic flow is essentially the following:

- We request Let’s Encrypt (our Certificate Authority) to generate a certificate for our domain
- We receive the certificate and the challenge token to use to prove that we control the domain
- We tell DuckDNS to update the TXT record for our domain to match the token used for the challenge
- We then tell Let’s Encrypt validate the domain (more here: [https://letsencrypt.org/how-it-works/](https://letsencrypt.org/how-it-works/))

This should help in clarifying what is this “dns-01”, how we tell DuckDNS to verify it and the meaning of the hook script.

### Ok, Where were we…

If you read the section above you should know why we need the hook script. In any case, we need a hook to help with the DNS challenge.

In the same script we’ll also provide a way of restarting the Home Assistant service and this is used when the certificate is created/updated.

Create a “_hook.sh_” file:

```
nano hook.sh
```

The content comes from the one provided by Dehydrated as an example: [https://github.com/lukas2511/dehydrated/wiki/DNS-01-hook-for-DuckDNS](https://github.com/lukas2511/dehydrated/wiki/DNS-01-hook-for-DuckDNS)

I modified the “deploy_cert” section in order to restart the service using the “pi” account (because we need the sudo privileges).

Anyway, this is the content:

```
#!/usr/bin/env bash

set -e

set -u

set -o pipefail

domain="<your_domain>"

token="<your_token>"

case "$1" in

    "deploy_challenge")

        curl "https://www.duckdns.org/update?domains=$domain&token=$token&txt=$4"

        echo

        ;;

    "clean_challenge")

        curl "https://www.duckdns.org/update?domains=$domain&token=$token&txt=removed&clear=true"

        echo

        ;;

    "deploy_cert")

        echo "edit this section to do whatever you need to do to deploy and restart your service"

        ;;

    "unchanged_cert")

        ;;

    "startup_hook")

        ;;

    "exit_hook")

        ;;

    *)

        echo Unknown hook "${1}"

        exit 0

        ;;

esac
```

>**NOTE**: *change*:
>- <your_domain> with your specific DuckDNS domain, in the same way you did above
>- <your_token> with your DuckDNS token

(if you t follow the other posts or you have a different installation, ensure to change the “deploy_cert” section as well to correctly restart the Home Assistant service)

Last thing to do is make it executable:

```
chmod 755 hook.sh
```

### Checkpoint

At the end of all of this verify that this is what you have in your folder:

```
pi@raspberrypi:~/certs/dehydrated $ ls -la

total 704

drwxr-xr-x 2 pi pi   4096 Oct 20 23:14 .

drwxr-xr-x 4 pi pi   4096 Oct 20 23:03 ..

-rw-r--r-- 1 pi pi    195 Oct 20 23:08 config

-rwxr-xr-x 1 pi pi 697126 Oct 20 23:03 dehydrated

-rw-r--r-- 1 pi pi     18 Oct 20 23:07 domains.txt

-rwxr-xr-x 1 pi pi    661 Oct 20 23:14 hook.sh
```

### Register with letsencrypt

From the (dehydrated) documentation:

“_Before any certificates can be requested, Dehydrated needs to acquire an account with the Certificate Authorities._

_Optionally, an email address can be provided. It will be used to e.g. notify about expiring certificates. You will usually need to accept the Terms of Service of the CA._

_Dehydrated will notify if no account is configured._

_Run with –register –accept-terms to create a new account._”

If you run dehydrated without the “_–accept-terms_” you can see the latest terms link.

If you want to register a mail, edit your config file adding (with your email):

```
# E-mail to use during the registration (default: <unset>)

CONTACT_EMAIL=<your_email>
```

Time to register!

When you are ready run dehydrated with the registration options:

```
./dehydrated --register --accept-terms
```

That should produce this output:

```
pi@raspberrypi:~/certs/dehydrated $ ./dehydrated --register --accept-terms

# INFO: Using main config file ~/certs/dehydrated/config

+ Generating account key...

+ Registering account key with ACME server...

+ Done!
```

It created a new folder “accounts” that will contain a folder with the information about the registrations with letsencrypt.

### Create the certificate

We can now happily created the wanted certificate!

Just run dehydrated with this option:

```
./dehydrated -c
```

and this should be the output:

```
~/certs/dehydrated $ ./dehydrated -c

# INFO: Using main config file ~/certs/dehydrated/config

Unknown hook this_hookscript_is_broken__dehydrated_is_working_fine__please_ignore_unknown_hooks_in_your_script

+ Creating chain cache directory ~/certs/dehydrated/chains

Processing <your_domain>.duckdns.org

+ Creating new directory ~/certs/dehydrated/certs/<your_domain>.duckdns.org ...

Unknown hook this_hookscript_is_broken__dehydrated_is_working_fine__please_ignore_unknown_hooks_in_your_script

+ Signing domains...

+ Generating private key...

+ Generating signing request...

+ Requesting new certificate order from CA...

+ Received 1 authorizations URLs from the CA

+ Handling authorization for <your_domain>.duckdns.org

+ 1 pending challenge(s)

+ Deploying challenge tokens...

OK

+ Responding to challenge for <your_domain>.duckdns.org authorization...

+ Challenge is valid!

+ Cleaning challenge tokens...

OK

+ Requesting certificate...

+ Checking certificate...

+ Done!

+ Creating fullchain.pem...

Password:

+ Done!
```

Note that at the end the script is requesting for the sudo password for pi.

This is because the hook is trying to execute “deploy_cert” that tries to restart the service.

If you didn’t change the default hook script in the way I described above, you should receive the request of the sudo password for “myuser”. At that point you will probably need to kill the script [CTRL+C].

Everything is still ok, but you will manually need to restart the service.

## Configure the service

As already mentioned in the previous section, the configuration really varies from service to service, so you’ll need to verify how to specify the certificate and key in the custom settings of your service.

The certificate and key can be found in:

```
ssl_certificate: ~/certs/dehydrated/certs/<your_domain>.duckdns.org/fullchain.pem

ssl_key: ~/certs/dehydrated/certs/<your_domain>.duckdns.org/privkey.pem
```

## Test it out

You can now open the browser and try again to reach your Service website using HTTPS.

This time the warning should have disappeared and everything should be nice and clean!

### Reference

- [Certificates and SSL/HTTPS with DuckDNS and Let’s Encrypt – Riccardo Tramma](https://riccardotramma.com/2019/03/certificates-and-ssl-https/)