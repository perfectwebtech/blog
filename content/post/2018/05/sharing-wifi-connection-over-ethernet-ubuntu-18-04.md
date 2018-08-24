---
title: "Sharing WiFi Connection over Ethernet Ubuntu 18.04"
slug: sharing-wifi-connection-over-ethernet
published: 2018-05-10T23:46:00+12:00

image: /assets/image/2018-05-10-sharing-wifi-connection-over-ethernet-ubuntu-18-04--2ccfd293-2211-4163-b960-a1397a90c7ab.png

tags: [ "tooling", "linux", "networking",]
---

I found my Raspberry Pi in a drawer, and decided to get back into developing small IoT applications for it. Most of what I wanted to do required access to the internet, and my USB WiFi adapter is super trash.

The good news is that Pi's have an RJ45/Ethernet port, the (sorta) bad news is that my house is WiFi only.

To address this, I went wanted to share my Ubuntu 18 desktop's WiFi connection over Ethernet - however, some of the software you need is no longer readily available, as it is superseded by the new settings app in Ubuntu 18.

What you're after is available through the terminal, with:

```sh
nm-connection-editor
```

When it opens, select the wired connection item, clicking the edit button (the cog). In that menu, switch to the IPv4 tab, and select the method: 'shared to other computers'.

![Screenshot of the connection editor with settings opened](/assets/image/2018-05-10-sharing-wifi-connection-over-ethernet-ubuntu-18-04--2ccfd293-2211-4163-b960-a1397a90c7ab.png)

After that, save everything and connect your cable if you haven't already, and DHCP should kick-in and set everything up for you!

You could even connect a switch or hub and share the connection further, if you wanted.

Note that if you need to get the IP address of the connection, you can use `ifconfig`. You'll only need this if DHCP doesn't automatically configure everything.