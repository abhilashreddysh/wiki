---
id: linuxpythonmail
title: Linux Python Mail
description: Version - 1.3
sidebar_position: 2
tag: [linux, python, mail, moniter]
last_update:
  date: 05/25/2023 # Should be MM/DD/YYYY
  author: Abhilash Reddy
---

:::info Version - 1.3
[Repository Link](https://github.com/abhilashreddysh/AutomationScripts/tree/main/LinuxPythonMail)
:::

Python Script to get linux services update through mail. Can be automated and scheduled to run in time intervals using crontab.

### Setup

You can use the `generateConfig.py` to generate a config file by providing the required inputs for the first time and later update the generated config file accordingly.

To do it manually create the below file in the project root dir

```config title="config.py -- (Generated from generateconfig.py)"
gmailUser = <Sender Email>
gmailPassword = <Password>
recipient = <Recipients Mail>
services_to_be_monitered = <List of Services to be monitered>
```
