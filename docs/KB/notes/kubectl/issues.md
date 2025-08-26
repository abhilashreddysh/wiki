# kubectl Issues & Fixes

## Pods in `CrashLoopBackOff`

- Symptom: Pod starts, crashes, restarts.
- Cause: App inside container is failing.
- Fix: `kubectl logs <pod>` → check error → fix image/command.

## Pods in `ImagePullBackOff`

- Symptom: Pod cannot pull image.
- Causes:

      - Wrong image name.
      - Missing registry secret.

- Fix: Check `kubectl describe pod <pod>` → correct image or add secret.

## Pods stuck in `Pending`

- Symptom: Pod never schedules.
- Causes:

      - Not enough CPU/memory.
      - NodeSelector mismatch.

- Fix: `kubectl describe pod <pod>` → reschedule or adjust spec.

## ConfigMap/Secret not updating

- Cause: Pods don’t reload automatically.
- Fix: `kubectl rollout restart deployment <name>`.
