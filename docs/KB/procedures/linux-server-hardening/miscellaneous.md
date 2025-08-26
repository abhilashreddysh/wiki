# Miscellaneous

Disable IPv6:
```bash
sudo sysctl -w net.ipv6.conf.all.disable_ipv6=1
```
Limit cron/at access.
Check for rootkits:
```bash
sudo apt install rkhunter chkrootkit
sudo rkhunter --check
```