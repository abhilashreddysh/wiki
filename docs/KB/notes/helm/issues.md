# Helm Issues & Fixes

## Values not applying

- Symptom: App still runs with defaults.
- Cause: Forgot `-f values.yaml`.
- Fix: Use `helm get values myapp` to confirm applied values.

## Upgrade failed

- Symptom: Helm upgrade errors out.
- Fix: Use `helm upgrade --install myapp ./mychart`.

## Stale resources after uninstall

- Symptom: PVCs or CRDs remain after uninstall.
- Cause: Helm doesn’t remove PVCs/CRDs by default.
- Fix: Manually delete leftover PVC/CRD.

## Debugging install

- Use dry-run: `helm install myapp ./mychart --dry-run --debug`.
- Template rendering: `helm template ./mychart`.
