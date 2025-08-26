---
title: How Cron Jobs Work
description: Cronjobs are scheduled tasks to run on a specified time
tags: [linux, crontab]
---

```shell
a b c d e /directory/command output
```

So, the parts of a cron command are:

1. The first five fields `a b c d e` specify the `time/date and recurrence` of the job.
2. In the second section, the `/directory/command` specifies the `location and script` you want to run.
3. The final segment `output` is _optional_. It defines how the `system notifies the user` of the job completion.

| Field                  |    Possible Values         |  Syntax      |  Description                                                                            |
| ---------------------- | -------------------------- | ------------ | --------------------------------------------------------------------------------------- |
| [a] -- Minute          | 0 -- 59                    | 7 \* \* \*   | The cron job is initiated every time the system clock shows 7 in the minute's position. |
| [b] -- Hour            | 0 -- 23                    | 0 7 \* \* \* | The cron job runs any time the system clock shows 7am (7pm would be coded as 19).       |
| [c] -- Day             | 0 -- 31                    | 0 0 7 \* \*  | The day of the month is 7 which means that the job runs every 7th day of the month.     |
| [d] -- Month           | 0 = none and 12 = December | 0 0 0 7 \*   | The numerical month is 7 which determines that the job runs only in July.               |
| [e] -- Day of the Week | 0 = Sunday and 7 = Sunday  | 0 0 \* \* 7  | 7 in the current position means that the job would only run on Sundays.                 |

!!! tip

    By default, cron sends an email to the owner of the crontab file when it runs.
    To turn off email output, add the following string, `>/dev/null 2>&1`, after the timing and command fields.

For efficiency, cron syntax also uses operators. Operators are special characters that perform operations on the provided values in the cron field.

- An _asterisk_ (`*`) stands for all values. Use this operator to keep tasks running during all months, or all days of the week.
- A _comma_ (`,`) specifies separate individual values.
- A _dash_ (`-`) indicates a range of values.
- A _forward-slash_ (`/`) is used to divide a value into steps. (\*/2 would be every other value, \*/3 would be every third, \*/10 would be every tenth, etc.)

??? example

    | Cron Job                                 |  Command                       |
    | ---------------------------------------- | ------------------------------ |
    | Run Cron Job Every Minute                | \* \* \* \* \* /root/backup.sh |
    | Run Cron Job Every 30 Minutes            | 30 \* \* \* \* /root/backup.sh |
    | Run Cron Job Every Hour                  | 0 \* \* \* \* /root/backup.sh  |
    | Run Cron Job Every Day at Midnight       | 0 0 \* \* \* /root/backup.sh   |
    | Run Cron Job at 2 am Every Day           | 0 2 \* \* \* /root/backup.sh   |
    | Run Cron Job Every 1st of the Month      | 0 0 1 \* \* /root/backup.sh    |
    | Run Cron Job Every 15th of the Month     | 0 0 15 \* \* /root/backup.sh   |
    | Run Cron Job on December 1st -- Midnight | 0 0 0 12 \* /root/backup.sh    |
    | Run Cron Job on Saturday at Midnight     | 0 0 \* \* 6 /root/backup.sh    |
