# Service Hardening

Disable unnecessary services:
```bash
sudo systemctl list-unit-files | grep enabled
sudo systemctl disable service_name
```
Run services with least privileges.