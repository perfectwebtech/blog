---
title: MacOS Brew Error - Ignoring Bigdecimal
published: 2019-04-20T11:00:00+12:00

tags: [ "tooling", "apple",]
---

For the longest of times, I've been getting an error or warning message from Brew whenever I used any of its commands. It didn't cause any issues with using it, but it was just annoying as hell:

```
Ignoring bigdecimal-1.3.4 because its extensions are not built.  Try: gem pristine bigdecimal --version 1.3.4
```

As you can probably tell from the error message, its not actually anything to do with Brew itself, rather the language its built on: Ruby.

According to [this issue on GitHub](https://github.com/Homebrew/brew/issues/4975), most people started seeing this issue after updating to MacOS Mojave.

The recommended steps to solve, were to make sure you have updated XCode tools with `xcode-select install` (though this should be dealt with through the updater in settings now), and then to just re-install the gem.

The warning message literally tells you how to fix it, but I tried it and it didn't work. This dingus (me) didn't read the error message when it didn't work, which explained that I didn't have permission to edit the ruby gems directory.

I finally clicked and discovered that you had to use sudo. Duh.

```sh
sudo gem pristine bigdecimal --version 1.3.4
```

After that, I didn't have any more issues with Brew.

If your system is anything like mine, you'll probably see a tonne of similar issues with other gems, but I didn't really want to open that Pandora's Box.

![terminal after resetting the bigdecimal to a pristine state](https://crookm.ams3.cdn.digitaloceanspaces.com/media/2019/brew-ignoring-bigdecimal--c87e2876-61fe-4808-9e3c-98330bb2d3ef.png)