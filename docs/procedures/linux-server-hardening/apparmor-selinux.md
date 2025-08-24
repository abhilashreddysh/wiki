# AppArmor / SELinux

Ubuntu/Debian AppArmor:
```bash
sudo apt install apparmor apparmor-utils
sudo aa-status
sudo aa-enforce /etc/apparmor.d/*
```
RHEL/Fedora: use SELinux.