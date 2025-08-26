# Docker Concepts

## What is Docker?

- Platform for building, shipping, and running applications inside **containers**.
- A container = lightweight runtime environment (like a mini VM but shares the host kernel).

## Core Components

- **Image:** Blueprint for containers (read-only).
- **Container:** Running instance of an image.
- **Dockerfile:** Instructions to build an image.
- **Registry:** Repository to store and share images (Docker Hub, GHCR, private registry).
- **Volumes:** Persistent storage for containers.
- **Networks:** Allow containers to communicate.

## Mental Model

Dockerfile → Build Image → Run Container → Attach Volume/Network → Manage Lifecycle.
