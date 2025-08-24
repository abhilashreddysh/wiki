---
title: What is SSL
tags:
  - ssl
  - network
---

[SSL](https://www.cloudflare.com/learning/ssl/what-is-ssl/) stands for Secure Sockets Layer, and it refers to a protocol for encrypting, securing, and authenticating communications that take place on the Internet. Although SSL was replaced by an updated protocol called [TLS (Transport Layer Security)](https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/) some time ago, "SSL" is still a commonly used term for this technology.

The main use case for SSL/TLS is securing communications between a client and a server, but it can also secure email, VoIP, and other communications over unsecured networks.

## How does SSL/TLS work?

These are the essential principles to grasp for understanding how SSL/TLS works:

- Secure communication begins with a [TLS handshake](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/), in which the two communicating parties open a secure connection and exchange the public key
- During the TLS handshake, the two parties generate session keys, and the session keys encrypt and decrypt all communications after the TLS handshake
- Different session keys are used to encrypt communications in each new session
- TLS ensures that the party on the server side, or the website the user is interacting with, is actually who they claim to be
- TLS also ensures that data has not been altered, since a message authentication code (MAC) is included with transmissions

With TLS, both [HTTP](https://www.cloudflare.com/learning/ddos/glossary/hypertext-transfer-protocol-http/) data that users send to a website (by clicking, filling out forms, etc.) and the HTTP data that websites send to users is encrypted. Encrypted data has to be decrypted by the recipient using a key.

#### The TLS handshake

TLS communication sessions begin with a TLS handshake. A TLS handshake uses something called asymmetric encryption, meaning that two different keys are used on the two ends of the conversation. This is possible because of a technique called public key cryptography.

In [public key cryptography](https://www.cloudflare.com/learning/ssl/how-does-public-key-encryption-work/), two keys are used: a public key, which the server makes available publicly, and a private key, which is kept secret and only used on the server side. Data encrypted with the public key can only be decrypted with the private key.

During the TLS handshake, the client and server use the public and private keys to exchange randomly generated data, and this random data is used to create new keys for encryption, called the session keys.

#### Symmetric encryption with session keys

Unlike asymmetric encryption, in symmetric encryption the two parties in a conversation use the same key. After the TLS handshake, both sides use the same session keys for encryption. Once session keys are in use, the public and private keys are not used anymore. Session keys are temporary keys that are not used again once the session is terminated. A new, random set of session keys will be created for the next session.

![Symmetric Encryption](https://cf-assets.www.cloudflare.com/slt3lc6tev37/1PYEAgdkoII5tQ5yzweHEX/a025977d2cb6a74df020ceb6273ae6d5/symmetric-encryption.svg)

## Authenticating the origin server

TLS communications from the server include a message authentication code, or MAC, which is a digital signature confirming that the communication originated from the actual website. This authenticates the server, preventing [on-path attacks](https://www.cloudflare.com/learning/security/threats/on-path-attack/) and domain spoofing. It also ensures that the data has not been altered in transit.

## What does TLS do?

There are three main components to what the TLS protocol accomplishes: [Encryption](https://www.cloudflare.com/learning/ssl/what-is-encryption/), Authentication, and Integrity.

- **Encryption:** hides the data being transferred from third parties.
- **Authentication:** ensures that the parties exchanging information are who they claim to be.
- **Integrity:** verifies that the data has not been forged or tampered with.

## What is an SSL certificate?

An SSL certificate is a file installed on a website's [origin server](https://www.cloudflare.com/learning/cdn/glossary/origin-server/). It's simply a data file containing the public key and the identity of the website owner, along with other information. Without an SSL certificate, a website's traffic can't be encrypted with TLS.

Technically, any website owner can create their own SSL certificate, and such certificates are called self-signed certificates. However, browsers do not consider self-signed certificates to be as trustworthy as SSL certificates issued by a certificate authority.

## What are the types of SSL certificates?

There are several different [types of SSL certificates](https://www.cloudflare.com/learning/ssl/types-of-ssl-certificates/). One certificate can apply to a single website or several websites, depending on the type:

- **Single-domain:** A single-domain SSL certificate applies to only one domain (a "domain" is the name of a website, like www.cloudflare.com).
- **Wildcard:** Like a single-domain certificate, a wildcard SSL certificate applies to only one domain. However, it also includes that domain's subdomains. For example, a wildcard certificate could cover www.cloudflare.com, blog.cloudflare.com, and developers.cloudflare.com, while a single-domain certificate could only cover the first.
- **Multi-domain:** As the name indicates, multi-domain SSL certificates can apply to multiple unrelated domains.

SSL certificates also come with different validation levels. A validation level is like a background check, and the level changes depending on the thoroughness of the check.

- **Domain Validation:** This is the least-stringent level of validation, and the cheapest. All a business has to do is prove they control the domain.
- **Organization Validation:** This is a more hands-on process: The CA directly contacts the person or business requesting the certificate. These certificates are more trustworthy for users.
- **Extended Validation:** This requires a full background check of an organization before the SSL certificate can be issued.

## How does a website get an SSL certificate?

Website owners need to obtain an SSL certificate from a certificate authority, and then install it on their web server (often a web host can handle this process). A certificate authority is an outside party who can confirm that the website owner is who they say they are. They keep a copy of the certificates they issue.

## Is it possible to get a free SSL certificate?

Many certificate authorities charge for SSL certificates. To help make the Internet more secure, Cloudflare offers [free SSL certificates](https://www.cloudflare.com/application-services/products/ssl/). Cloudflare was the first Internet security and performance company to do so. Cloudflare also has worked to optimize SSL/TLS performance so that websites moving from HTTP to HTTPS do not have their [performance](https://www.cloudflare.com/learning/performance/why-site-speed-matters/) impacted. For more information about SSL options with Cloudflare, see our [Developer documentation](https://developers.cloudflare.com/ssl/).

## What is the difference between HTTP and HTTPS?

The S in "HTTPS" stands for "secure." HTTPS is just HTTP with SSL/TLS. A website with an HTTPS address has a legitimate SSL certificate issued by a certificate authority, and traffic to and from that website is authenticated and encrypted with the SSL/TLS protocol.

To encourage the Internet as a whole to move to the more secure HTTPS, many web browsers have started to mark HTTP websites as "not secure" or "unsafe." Thus, not only is HTTPS essential for keeping users safe and user data secure, it has also become essential for building trust with users.

## Are SSL and TLS the same thing?

SSL is the direct predecessor of another protocol called TLS (Transport Layer Security). In 1999 the Internet Engineering Task Force (IETF) proposed an update to SSL. Since this update was being developed by the IETF and Netscape was no longer involved, the name was changed to TLS. The differences between the final version of SSL (3.0) and the first version of TLS are not drastic; the name change was applied to signify the change in ownership.

Since they are so closely related, the two terms are often used interchangeably and confused. Some people still use SSL to refer to TLS, others use the term "SSL/TLS encryption" because SSL still has so much name recognition.

## Reference

- [Cloudflare - How does SSL work?](https://www.cloudflare.com/en-gb/learning/ssl/how-does-ssl-work/)
- [Cloudflare - What is SSL?](https://www.cloudflare.com/en-gb/learning/ssl/what-is-ssl/)