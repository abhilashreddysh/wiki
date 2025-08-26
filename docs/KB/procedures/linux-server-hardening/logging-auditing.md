# Logging & Auditing

Enable auditing:
```bash
sudo apt install auditd
sudo systemctl enable auditd
sudo auditctl -w /etc/passwd -p wa -k passwd_changes
```
Use logrotate for logs.
Centralize logs using rsyslog or ELK.