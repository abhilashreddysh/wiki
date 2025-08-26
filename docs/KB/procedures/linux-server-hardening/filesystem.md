# File System Security

Secure mount points:
```text
/dev/sda1 / ext4 defaults,noexec,nosuid,nodev 0 1
/dev/sda2 /tmp ext4 defaults,noexec,nosuid,nodev 0 2
```
Limit world-writable files:
```bash
chmod 1777 /tmp
find / -type f -perm /o+w -exec ls -l {} \;
```
Protect critical files:
```bash
sudo chattr +i /etc/passwd
```