---
title: "No Sleep"
tags: ["v2.3", "python", "tkinter"]
status: old
---
!!! warning "No longer actively maintained"
    This script may still work, but updates are not planned. You can check out [PowerToys Awake](https://learn.microsoft.com/en-us/windows/powertoys/awake) as an alternative.


Keep your computer awake by programmatically pressing the Scroll Lock key every X seconds.

---

## Features

- Runs in **Windows system tray** with a context menu
- Start / Stop / Exit options directly from tray icon
- Displays elapsed time on left-click balloon tip
- Minimal CPU and memory usage
- Powershell `.ps1` script, no external dependencies
- Automatically toggles **Scroll Lock** key every X seconds to prevent sleep

---

## Installation

1. Save the script[^repo] as `NoSleep.ps1`.
2. Ensure PowerShell execution policy allows running scripts:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

3. Double-click `NoSleep.ps1` or run from PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File "C:\Path\To\NoSleep.ps1"
```

---

## Usage

- The tray icon appears after the script runs.
- **Right-click** the tray icon to access context menu: Start / Stop / Exit.
- **Left-click** to show balloon tip with elapsed time.
- The script will automatically toggle Scroll Lock every 2 minutes (default).
- Stop or exit from the context menu to terminate the script safely.

---

## How It Works

- Uses **.NET Windows Forms** for system tray and icon.
- Uses **WScript.Shell** to send `{SCROLLLOCK}` key presses.
- Runs a background job to periodically toggle Scroll Lock.
- Handles Start / Stop / Exit actions through tray menu events.
- Uses a **Stopwatch** to track elapsed time for balloon tip notifications.
- Attempts to hide PowerShell console to run silently in the background.

---

## Notes

- Make sure `Scroll Lock` key is not used by other applications while running.
- Script uses `[System.GC]::Collect()` for minimal memory footprint.
- Tested on Windows 10 and 11.

---

[^repo]: **Repository link** [AutomationScripts](https://raw.githubusercontent.com/abhilashreddysh/AutomationScripts/refs/heads/main/Powershell/peelSoN.ps1)
