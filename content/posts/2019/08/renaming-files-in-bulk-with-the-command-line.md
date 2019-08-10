---
title: Renaming Files in Bulk with the Command Line
published: 2019-08-11T08:00:00+12:00

toc: true

tags: [ "linux",]
---

Let's say you have a sequence of files that follow a constant pattern - maybe a TV series you've purchased and downloaded - but you want to change that pattern to one that you use everywhere else.

Your first bet would be to either go through and rename everything individually, or find some old dodgy Java app that does it for you. Well I'm not one to go out and download things from strange sites, and as a cardholding HaCkEr I'm not allowed to perform repetitive or automatable tasks like bulk renaming files.

Originally, I would use a small [Python script](https://gist.github.com/crookm/c8cc8fa0a2b303d64f5b23191491bbfc) to rename my files, but that would only work with certain file names, so I ended up changing the search pattern in that to get the season and episode number every time. I may as well use some kind of *nix trickery from the command line instead.

# Using the rename tool
To do this easily, you can use the `rename` tool present on most Linux flavours, if its not already installed, you can get it with `apt install rename` (or your distro's equivalent).

This tool just uses SED syntax to rename files, which is basically just REGEX. It uses the pattern: `s/(search)/(replace)/`.

## File pattern example
The series I'm looking at has the following pattern:

```
Some TV show - Season 01 Episode 01 - The episode title.mkv
Some TV show - Season 01 Episode 02 - The episode title.mkv
Some TV show - Season 01 Episode 03 - The episode title.mkv
```

So the following pattern will select the season and episode number, and cut out everything else:

```
s/.*Season (\d{2}) Episode (\d{2}).*$/S$1E$2\.mkv/
```

In the search section:

* `.*` means match anything
* The brackets `()` indicate a capture group, so we can reference what it captures in the replace section of the pattern
* `\d` means match a digit
* `{2}` means match exactly two of the previous rule (two digits)
* `$` means match until the end of the file name

And in the replce section, we can write our template: `S(season number)E(episode number).mkv`. This will result in files like `S01E01.mkv`, `S01E02.mkv`, etc. Note that the dot `.` in the replace pattern before the file extension has a backslash before it so that it is treated as a literal dot, rather than a REGEX selector.

Because we used capture groups (the brackets) in the search pattern, we can reference what was captured in the replace section. You do this with the dollar sign followed by the index, for example the episode number - which is the second capture group - is accessed with `$2`.

## The complete command
You can take your pattern and marry it with the command like so:

```
rename -n 's/search/replace' *.mkv
```

The `-n` flag means that nothing will be changed, but you'll see what it will do. Remove it **after** you've checked everything looks good.

The `*.mkv` is where you select the files to rename - in this case all MKV files in the current directory. If everything in the current directory is a target to be renamed, you could just select everything with `*`.

Here's an example command with the pattern as well:

```
rename -n 's/.*Season (\d{2}) Episode (\d{2}).*$/S$1E$2\.mkv/' *.mkv
```