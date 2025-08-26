# Docker How-To

## Install & Verify

- Install from [docker.com](https://docs.docker.com/get-docker/).
- Check version: `docker --version`.

## Working with Images

- Pull image: `docker pull nginx:1.25`
- List images: `docker images`
- Build image: `docker build -t myapp:1.0 .`
- Tag image: `docker tag myapp:1.0 myrepo/myapp:1.0`
- Push image: `docker push myrepo/myapp:1.0`

## Working with Containers

- Run container: `docker run -d --name web -p 8080:80 nginx`
- List running containers: `docker ps`
- Start/stop container: `docker start web` / `docker stop web`
- Exec into container: `docker exec -it web /bin/sh`
- View logs: `docker logs -f web`

## Volumes & Networks

- Create volume: `docker volume create data`
- Run with volume: `docker run -v data:/app/data ...`
- Create network: `docker network create mynet`
- Run with network: `docker run --network=mynet ...`

## Dockerfile Basics

```dockerfile
FROM ubuntu:20.04
RUN apt-get update && apt-get install -y curl
COPY app/ /app
WORKDIR /app
CMD ["./start.sh"]
```
