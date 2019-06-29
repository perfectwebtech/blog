---
title: "Invalid Active Developer Path after Updating MacOS"
published: 2017-10-07T15:50:00+13:00

tags: [ "apple", "tooling",]

# pulled because i think it's dumb now (2019-06-29)
draft: true
---

I updated to the latest version of MacOS (High Sierra), which is really great. Nothing I used really changed but eh.

The only thing that did change was my ability to use some command line tools, for instance *gcc* and *make* stopped working. Originally, I thought it was because I uninstalled Xcode, but after re-installing I still didn’t have any luck.

### Solution
A quick search led to me to this [Stack Overflow article](https://apple.stackexchange.com/questions/254380/macos-sierra-invalid-active-developer-path), which simply suggested to run the following command in the terminal:

```sh
xcode-select --install
```

According to the top response, the issue is that you have to explicitly accept the license agreement, for whatever reason it doesn’t ask you to agree when you install Xcode.

Get used to typing this in every time you upgrade your Mac, because it looks like this happens every update.
