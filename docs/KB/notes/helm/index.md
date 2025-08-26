# Helm Concepts

## What is Helm?

- Package manager for Kubernetes.
- Packages are called **Charts**.
- Each deployed chart is a **Release**.

## Why Helm?

- Simplifies deployments (instead of raw YAML).
- Enables versioning, rollbacks, reusable configs.

## Core Terms

- **Chart:** Directory with templates + metadata.
- **values.yaml:** Default configuration.
- **Release:** Running instance of a chart.
- **Repository:** Storage for charts (public or private).

## Mental Model

Chart (template) + Values (config) → Rendered YAML → Applied as Release.
