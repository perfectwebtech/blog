---
title: "Linux Mint Development Environment Setup Quirks"
published: 2018-01-01T17:10:00+13:00

#image: https://crookm.ams3.cdn.digitaloceanspaces.com/media/2018/linux-mint-development-environment-setup-quirks--994fe794-b3a8-4031-8a22-a193c50826ee.png

tags: [ "tooling", "linux",]

# pulled because i think it's dumb now (2019-06-29)
draft: true
---

As part of my ‘new year, new me’ campaign for 2018, I decided to switch from Ubuntu 16.04 to Linux Mint 18.

I don’t have that much to set up most of the time, save for some development tools such as VS Code and GitKraken. I otherwise use the default applications for everything.

After admiring the Cinnamon desktop environment for a little while, I went about installing my development tools. I came across a few issues, mostly to do with the different distros shipping with different software.

Here are some of these problems, with solutions.

## Encrypted 7zip files
Since I was moving operating systems, I took some backups of the various folders and other things I wanted to take with me.

I had to put them somewhere other than the drives I was about to wipe, and they were too large for any thumb drive I had lying around, and it would take far too long to upload to Drive. My only option was to put it on a public samba share in my home network, obviously having to encrypt them.

When I got my new install of Linux Mint connected to the network share, I found I couldn't decrypt the 7zip files with the default archive manager.

#### Problem
The issue was that I could not open the files, because the p7zip package does not ship with Linux Mint, whereas it must obviously ship with Ubuntu.

#### Solution
Simply add the package with apt:

```sh
sudo apt install p7zip-full
```

And then try again with the archive manager, should be all good.

## GitKraken not starting
I got into GitKraken because they let you use the pro version for free if you're a student, as part of the GitHub education pack. It's pretty great, and very good looking. If it weren't my daughter I would probably be dating it.

Anyway, it installed on Mint just fine with a deb package, but it failed to open.

#### Problem
It appears that it requires libcurl3 to be installed, and - like last time - doesn’t seem to ship with Linux Mint.

#### Solution
Once again, super easy. Just hit it up with the terminal:

```sh
sudo apt install libcurl3
```

And you should see that ugly squid the next time you try to launch it.
