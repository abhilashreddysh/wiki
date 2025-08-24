# SSH Hardening

Secure SSH access.

Change default port in /etc/ssh/sshd_config:
```text
Port 2222
PermitRootLogin no
PasswordAuthentication no
```
Restart SSH:
```bash
sudo systemctl restart sshd
```
Key-based authentication:
```bash
ssh-keygen -t ed25519 -C 'email@example.com'
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server
```