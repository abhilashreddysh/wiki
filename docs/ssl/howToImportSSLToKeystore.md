---
title: How to import SSL to keystore
tags:
  - ssl
  - certificate
  - network
---

To import an SSL certificate into a Java keystore (`.jks` file), you can use the `keytool` command, which is included with the Java Development Kit (JDK). Here's a step-by-step guide:

### 1. Obtain the SSL Certificate:
Before importing the SSL certificate, ensure you have obtained it from the appropriate source, such as the Certificate Authority or the server where the SSL certificate is installed. The SSL certificate should be in a PEM or DER format.

### 2. Determine the Keystore Location:
Identify the location of the keystore file where you want to import the SSL certificate. If you don't have a keystore file yet, you can create one using the `keytool` command.

### 3. Import the SSL Certificate:
Use the `keytool -importcert` command to import the SSL certificate into the keystore. The basic syntax is as follows:

```bash
keytool -importcert -alias <alias_name> -file <certificate_file> -keystore <keystore_file>
```

- `<alias_name>`: Choose an alias for the certificate entry in the keystore.
- `<certificate_file>`: Path to the SSL certificate file.
- `<keystore_file>`: Path to the keystore file.

For example:

```bash
keytool -importcert -alias mycert -file mycertificate.crt -keystore keystore.jks
```

### 4. Provide Keystore Password:
During the import process, you may be prompted to provide the keystore password. If you haven't changed it, the default password for a new keystore is usually `changeit`.

### 5. Verify Import:
After importing the SSL certificate, verify that it was successfully added to the keystore by listing its contents:

```bash
keytool -list -v -keystore <keystore_file>
```

Replace `<keystore_file>` with the path to your keystore file.

### Additional Tips:
- If the SSL certificate is in PEM format, you may need to convert it to DER format using the `openssl` command before importing it into the keystore. For example:
  ```bash
  openssl x509 -outform der -in mycertificate.pem -out mycertificate.der
  ```
- Always be cautious when importing SSL certificates, as they establish trust between your system and external entities. Ensure that you trust the source of the SSL certificate before importing it.
- It's a good practice to create a backup of your keystore file before making any changes.