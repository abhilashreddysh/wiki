---
title: SED - Stream Editor
description: Stream Editor in Linux
tags: [linux, sed]
---

The `sed` command (short for "**stream editor**") is a powerful text-processing utility in Linux and other Unix-like operating systems. It is used to perform basic and advanced text transformations on input text files or streams.

The basic syntax of the `sed` command is as follows:

```bash
sed [options] 'command' input_file
```

The `command` part of the syntax is a series of editing commands that can be used to modify the input text. Some common `sed` commands are:

- `s/pattern/replacement/`: Substitute the first occurrence of `pattern` with `replacement` in each line of the input text.
- `s/pattern/replacement/g`: Substitute all occurrences of `pattern` with `replacement` in each line of the input text.
- `d`: Delete the entire line from the input text.
- `p`: Print the current line (or a specified range of lines) to the standard output.

The `input_file` parameter is the name of the file that `sed` should process. If no input file is specified, `sed` reads from the standard input.

Some common options of the `sed` command are:

- `-i`: Edit files in place (i.e., modify the input file instead of printing the modified output to the standard output).
- `-e`: Specify multiple editing commands.
- `-n`: Suppress automatic printing of input lines.

??? example

    To replace the word "apple" with "banana" in a file named "fruits.txt", you can use the following command:

    ```bash
    sed 's/apple/banana/g' fruits.txt
    ```

    To edit the file in place, use the `-i` option:

    ```bash
    sed -i 's/apple/banana/g' fruits.txt
    ```
