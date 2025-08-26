# Helm How-To

## Install Helm

- Download from [helm.sh](https://helm.sh).
- Verify: `helm version`.

## Manage Repos

- Add repo: `helm repo add bitnami https://charts.bitnami.com/bitnami`
- Update repos: `helm repo update`
- Search: `helm search repo nginx`

## Install / Upgrade / Remove

- Install: `helm install myapp bitnami/nginx`
- Upgrade: `helm upgrade myapp ./mychart -f values.yaml`
- Uninstall: `helm uninstall myapp`

## Inspect Releases

- List releases: `helm list`
- Show values: `helm get values myapp`
- Show resources: `helm status myapp --show-resources`

## Develop Charts

- Create chart: `helm create mychart`
- Lint chart: `helm lint ./mychart`
- Render without deploying: `helm template ./mychart`
