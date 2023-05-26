---
id: peelson
title: peelSoN
description: Version - 3.0
sidebar_position: 1
tag: [peelson, powershell, windows]
last_update:
  date: 05/24/2023 # Should be MM/DD/YYYY
  author: Abhilash Reddy
---

:::info Version - 3.0
[Repository Link](https://github.com/abhilashreddysh/peelSoN)
:::
:::caution This repository is private
:::

Powershell script to prevent the system from going to sleep.Use this script to keep your computer awake by programmatically pressing the ScrollLock key every X seconds

## FAQ

### How to setup ?

#### _(Using Script)_

Use initsetup.ps1 to setup and Change the task _peelSoN_ trigger from (AtLogon) --> (On Workstation Unlock) in task scheduler to start the script as soon as you login.

OR

#### _(Manual Method)_

Download and save this folder with the name "peelSoN" in C:\temp and run start.vbs script. You can also automate the task by setting up a task in task scheduler to run on every given interval.

### How to stop the running session ?

Every time the task is executed, a bat file is created on the desktop as killpeel.bat
Double click this bat file to kill the session and turn off peelSoN.

### Where are my logs saved ?

Logs are saved at `C:\temp\peelSoN\logs`

### How to change my logout time ?

Edit the launch.bat file at `C:\temp\peelSoN\` and update the `Hour` and `Min` flag according to your needs.

```bat title="C:\temp\peelSoN\launch.bat"
Powershell.exe -File "C:\temp\peelSoN\peelson.ps1" -Hour 18 -Min 00 -sleep 120
```

The above example stops the script at 18:00 (06:00 PM). **You can also update the sleep timer**.

## Changelog (latest **_3.0_**)

### 3.0

- Script will run anonymously and generate a bat file on desktop to kill it.
- Auto install script and setup a task

### 2.4

- Script will now end after the logout time

## Authors

- [@abhilashreddysh](https://www.github.com/abhilashreddysh) ([Linkedin](https://linkedin.com/in/sh-abhilash))
