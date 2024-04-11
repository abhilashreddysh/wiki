---
title: Github SSH key setup
description: Setting up ssh keys github access
tags: [ssh, github, git]
---

##Generating a new SSH key

You can generate a new SSH key on your local machine. After you generate the key, you can add the public key to your account on GitHub.com to enable authentication for Git operations over SSH.

!!! note GitHub improved security by dropping older, insecure key types on March 15, 2022.
    As of that date, DSA keys (ssh-dss) are no longer supported. You cannot add new DSA keys to your personal account on GitHub.com.

    RSA keys (ssh-rsa) with a valid_after before November 2, 2021 may continue to use any signature algorithm. RSA keys generated after that date must use a SHA-2 signature algorithm. Some older clients may need to be upgraded in order to use SHA-2 signatures.

- Open Terminal.
- Paste the text below, replacing the email used in the example with your GitHub email address.
    ```
    ssh-keygen -t ed25519 -C "your_email@example.com"
    ```

!!! note If you are using a legacy system that doesn't support the Ed25519 algorithm, use:
    ```
    ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
    ```

This creates a new SSH key, using the provided email as a label.

    > Generating public/private ALGORITHM key pair.

When you're prompted to "Enter a file in which to save the key", you can press Enter to accept the default file location. Please note that if you created SSH keys previously, ssh-keygen may ask you to rewrite another key, in which case we recommend creating a custom-named SSH key. To do so, type the default file location and replace `id_ALGORITHM` with your custom key name.

    > Enter a file in which to save the key (/home/YOU/.ssh/id_ALGORITHM):[Press enter]

- At the prompt, type a secure passphrase. For more information, see "Working with SSH key passphrases."

    >Enter passphrase (empty for no passphrase): [Type a passphrase]
    
    >Enter same passphrase again: [Type passphrase again]

## Adding your SSH key to the ssh-agent

Before adding a new SSH key to the ssh-agent to manage your keys, you should have checked for existing SSH keys and generated a new SSH key.

- Start the ssh-agent in the background.

    ```
    $ eval "$(ssh-agent -s)"
    > Agent pid 59566
    ```

    Depending on your environment, you may need to use a different command. For example, you may need to use root access by running `sudo -s -H` before starting the ssh-agent, or you may need to use `exec ssh-agent bash` or `exec ssh-agent zsh` to run the ssh-agent.

- Add your SSH private key to the ssh-agent.

    If you created your key with a different name, or if you are adding an existing key that has a different name, replace id_ed25519 in the command with the name of your private key file.

    ```
    ssh-add ~/.ssh/id_ed25519
    ```

    Add the SSH public key to your account on GitHub.

## Reference
- [Github - Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)