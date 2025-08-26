# kubectl How-To

## Connect to a Cluster

- Ensure kubeconfig is set up.
- Switch context: `kubectl config use-context <name>`.

## Inspect Resources

- `kubectl get pods -A`
- `kubectl describe pod <pod>`
- `kubectl logs <pod>`

## Deploy Applications

- Imperative: `kubectl run nginx --image=nginx`
- Declarative: `kubectl apply -f deployment.yaml`

## Manage Configuration

- ConfigMaps: `kubectl create configmap ...`
- Secrets: `kubectl create secret ...`

## Debug Workloads

- View events: `kubectl get events`
- Resource usage: `kubectl top pods`
- Restart deployment: `kubectl rollout restart deployment <name>`
