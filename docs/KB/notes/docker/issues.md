# Docker Issues & Fixes

## Container exits immediately

- Symptom: Run container, it stops right away.
- Cause: Main process ended (e.g., CMD script finishes).
- Fix: Use `docker run -it` for interactive, or ensure long-running process is in CMD.

## Port binding not working

- Symptom: Container is running, but service not reachable.
- Causes:

      - Forgot `-p host:container` mapping.
      - Firewall blocking port.

- Fix: Run with `docker run -p 8080:80 ...` and check firewall.

## Image too large

- Symptom: Built image is hundreds of MB.
- Causes:

      - Using heavy base image (e.g., `ubuntu`).
      - Not cleaning up apt cache.

- Fix: Use slim images (`alpine`, `debian-slim`).  
  Example:
  ```dockerfile
  RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
  ```

## Cannot connect to Docker daemon

- Symptom: docker ps gives permission error.
- Causes:

      - Docker daemon not running.
      - User not in docker group.

- Fix:
  ```bash
  sudo systemctl start docker
  sudo usermod -aG docker $USER
  ```

## Volume data missing after restart

- Symptom: Data lost after container removed.
- Cause: Used bind mount incorrectly or forgot named volume.
- Fix: Use -v mydata:/path/in/container.
