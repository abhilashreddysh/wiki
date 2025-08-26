# User & Account Management

Manage users and permissions.

Remove or lock unused accounts:
```bash
sudo deluser username
sudo passwd -l username
```
Enforce strong passwords via PAM:
```bash
sudo apt install libpam-pwquality
sudo vim /etc/pam.d/common-password
# add: password requisite pam_pwquality.so retry=3 minlen=12 difok=3
```
Account expiration:
```bash
sudo chage -M 90 username
sudo chage -I 30 username
```