---
title: Linux File Permissions
description: File permissions on linux
tags: [linux, file permissions]
---

There are some things that we take for granted when using a computer. We might imagine, for instance, that we have access to every file and folder on our computer and that we are free to edit or remove them as we see fit. However, this is not always the case, particularly when working with operating systems built on the Linux platform. File permissions are very important in Linux because they control who can access, change, or remove a file or folder.

## What are Linux file permissions?

In Linux, every file and folder has a set of permissions that determine who can access, modify, or delete it. These permissions are set using a combination of three letters, which are r (read), w (write), and x (execute). The first set of letters represents the permissions for the owner of the file, the second set represents the permissions for the group, and the third set represents the permissions for everyone else.

Each set of permissions consists of three letters, which are either `r`, `w`, or `x`. If a letter is present, it means that the corresponding permission is granted. If it is absent, it means that the permission is not granted. Here is a table that shows the different permissions:

| Letter | Number | Permission | Meaning                                                  |
| ------ | ------ | ---------- | -------------------------------------------------------- |
| r      | 4      | Read       | Allows the user to read the file or folder               |
| w      | 2      | Write      | Allows the user to modify the file or folder             |
| x      | 1      | Execute    | Allows the user to execute the file or access the folder |
| -      | 0      | -          | no Permission                                            |

## Understanding file ownership in Linux:

Before we can understand how file permissions work, we need to understand how file ownership works in Linux. Every file and folder in Linux is owned by a particular user and group. The user is the person who created the file or folder, while the group is a collection of users who have been given permission to access the file or folder.

### _**chown**_ Command

When a file or folder is created, it is automatically assigned an owner and group. `By default, the owner of a file or folder is the user who created it, and the group is the primary group of that user`. However, you can change the owner and group of a file or folder using the chown command.

```shell
sudo chown NEW_OWNER FILE
```

Here, `NEW_OWNER` can be the name of a user or a group, and `FILE` is the name of the file whose ownership you want to modify.

For example, to change the owner of a file named `myfile.txt` to a user named `user`, you can run the following command:

```bash
sudo chown user myfile.txt
```

Note that you need to have administrative privileges (i.e., be a sudoer) to change the ownership of a file. Also, if you want to change the ownership of a directory and its contents, you can use the `-R` option to make the command recursive:

```bash
sudo chown -R user mydir
```

This will change the ownership of all files and subdirectories in `mydir` to user `user`.

### _**chgrp**_ command

The `chgrp` command is a Linux/Unix command that is used to change the group ownership of a file or directory. The name `chgrp` stands for "change group."

The basic syntax of the `chgrp` command is:

```bash
chgrp [OPTIONS] GROUP FILE
```

Here, `GROUP` is the name of the group to which you want to change the ownership, and `FILE` is the name of the file or directory whose ownership you want to change.

For example, to change the group ownership of a file named `myfile.txt` to a group named `staff`, you can run the following command:

```bash
sudo chgrp staff myfile.txt
```

## Understanding file permissions in Linux:

Now that we understand how file ownership works in Linux, we can look at how file permissions work. As we mentioned earlier, every file and folder in Linux has a set of permissions that determine who can access, modify, or delete it. These permissions are set using a combination of three letters, which are r (read), w (write), and x (execute).

The nine permission characters are grouped into three sets of three characters each. The first set represents the permissions for the owner of the file, the second set represents the permissions for the group, and the third set represents the permissions for others.

Each set of three characters consists of the following:

- The first character represents `read` permission.
- The second character represents `write` permission.
- The third character represents `execute` permission.

!!! tip

    To view the permissions of a file or folder in Linux, you can use the `ls -l` command. For instance, to view the permissions of a file called file.txt, you can use the following command:

    ```shell
    ls -l file.txt
    -rw-r--r-- 1 user1 group1 0 May 14 22:30 file.txt
    ```

    In this output, the **first column** represents the **permissions of the file**, the **second column** represents the **number of hard links** to the file, the **third and fourth columns** represent the **owner and group** of the file, the **fifth column** represents the **size** of the file.

### File Types

The file type is represented by the first character of the permission string.

!!! info "Different File Types"

    | First Character | Type of the File      |
    | --------------- | --------------------- |
    | -               | Regular File          |
    | d               | Directory             |
    | l               | Symbolic Link         |
    | c               | Character Device File |
    | b               | Block Device File     |
    | p               | Named Pipe            |
    | s               | Socket                |

Example, a file permission string starting with "`d`" would indicate a directory, and the permission number would be calculated in the same way as for a regular file.

### The Number Representation

The possible values for each of these characters are:

- "r" for read permission (`4`)
- "w" for write permission (`2`)
- "x" for execute permission (`1`)
- "-" if the permission is not granted (`0`)

Therefore, the number representation for file permissions in Linux can be obtained by assigning a value of _4 to "r"_, a value of _2 to "w"_, and a value of _1 to "x"_. Then, the permission string can be converted into a number by adding up the values for each set of three characters.

For example, if the permission string is `rwxr-xr--`, the permission number would be calculated as follows:

- The first set `rwx` adds up to `4+2+1 = 7` (read, write, and execute permissions for the owner).
- The second set `r-x` adds up to `4+0+1 = 5` (read and execute permissions for the group).
- The third set `r--` adds up to `4+0+0 = 4` (read permission for others).

Therefore, the number representation for this file permission would be `754`.

!!! info "Number Permissions"

    You can use the following numbers to represent permissions:

    - `0` - no permissions
    - `1` - execute only
    - `2` - write only
    - `3` - write and execute
    - `4` - read only
    - `5` - read and execute
    - `6` - read and write
    - `7` - read, write, and execute

## Modifying File Permissions

### _**chmod**_ command

In Linux, you can modify file permissions using the `chmod` command. The `chmod` command stands for _change mode_, and it allows you to change the read, write, and execute permissions for the owner, group, and others of a file.

The basic syntax of the `chmod` command is as follows:

```bash
chmod options permissions filename\
```

Here, `options` refers to any additional options you might want to include, `permissions` refer to the new permissions you want to set, and `filename` refers to the name of the file whose permissions you want to change.

For example, to give the owner of the file `myfile.txt` read and write permissions, you would use the following command:

```bash
chmod 600 myfile.txt
```

Here, `6` represents read and write permissions for the owner, and `0` represents no permissions for the group and others.

To give read and execute permissions to the owner and group, and no permissions to others, you would use the following command:

```bash
chmod 750 myfile.txt
```

Here, `7` represents read, write, and execute permissions for the owner, `5` represents read and execute permissions for the group, and `0` represents no permissions for others.

You can also use the `chmod` command with the `-R` option to modify the permissions of all files and directories within a directory recursively. For example:

```bash
chmod -R 755 mydirectory/
```

This command would give read, write, and execute permissions to the owner and read and execute permissions to the group and others for all files and directories within the `mydirectory` directory.
