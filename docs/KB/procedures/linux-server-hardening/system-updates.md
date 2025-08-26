# System Updates & Package Management

Keeping your server updated is the first line of defense.

```bash
# Debian/Ubuntu
sudo apt update && sudo apt upgrade -y
# RHEL/CentOS
sudo yum update -y
# Fedora
sudo dnf update -y
```

Enable automatic security updates:
```bash
sudo apt install unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```
Remove unnecessary packages:
```bash
sudo apt autoremove -y
sudo yum autoremove -y
```