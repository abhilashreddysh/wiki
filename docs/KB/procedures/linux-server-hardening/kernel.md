# Kernel & System Hardening

Disable unnecessary kernel modules:
```bash
lsmod
sudo modprobe -r module_name
```
Enable TCP/IP security:
```bash
sudo sysctl -w net.ipv4.conf.all.rp_filter=1
sudo sysctl -w net.ipv4.tcp_syncookies=1
```
Persist in /etc/sysctl.conf.