# kubectl Concepts

## What is kubectl?

- Command line tool to interact with the Kubernetes API server.
- Think of it as the "remote control" for your cluster.

## Core Objects

- **Pod:** Smallest deployable unit (runs containers).
- **Deployment:** Ensures pods are running and handles updates.
- **Service:** Exposes pods within cluster or externally.
- **ConfigMap / Secret:** Store configuration and sensitive data.
- **Namespace:** Logical separation of resources.
- **Node:** A worker machine.

## Declarative vs Imperative

- Imperative: run direct commands (quick changes).
- Declarative: apply YAML files (repeatable & versioned).

## Mental Model

Cluster → Node → Pod → Container  
Namespace groups → Resources → Controlled via kubectl.
