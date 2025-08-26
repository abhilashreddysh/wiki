# Firewall & Network Security

Configure firewall:
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 2222/tcp
sudo ufw enable
```
Disable unused services:
```bash
sudo systemctl disable telnet ftp
sudo systemctl stop telnet ftp
```
Check open ports:
```bash
sudo ss -tuln
sudo netstat -tulpn
```