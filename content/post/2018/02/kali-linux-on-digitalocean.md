---
title: "Kali Linux on DigitalOcean"
published: 2018-02-21T21:27:00+13:00

image: https://crookm.ams3.cdn.digitaloceanspaces.com/media/2018/kali-linux-on-digitalocean--3eb66413-0f33-4801-be73-fc5d4d9c9f0e.png

tags: [ "tooling", "linux", "cloud",]
---

Kali Linux is a distribution of Linux that is used for penetration testing. While normally distributed in a typical ISO file for install on hardware, it has also been wrapped into a [Docker image](https://www.kali.org/news/official-kali-linux-docker-images/) to run it on basically any OS with Docker installed.

On [DigitalOcean](https://m.do.co/c/f8ffd8a5f356), you can't install an ISO file. This is where the Docker image comes into play. On DigitalOcean you can set up a container distribution to use Kali. I like to use CoreOS.

![](https://crookm.ams3.cdn.digitaloceanspaces.com/media/2018/kali-linux-on-digitalocean--19e131a2-72a3-490b-8a15-c95933d53029.png)

Once you've set up your container distribution, go ahead and login with your SSH key, using the 'core' user. That was one thing that was not immediately obvious, because I would typically SSH into virtual machines with 'root'.

As the Kali Docker documentation explains, you can pull the OS like so:

```sh
docker pull kalilinux/kali-linux-docker
docker run -t -i kalilinux/kali-linux-docker /bin/bash
```

And that's it! You can install and update the tools you'll need as you would normally.

It's important to note, you can't install the GUI version of Kali Linux like this. If you wish to do that, you will need to set it up as a guest in something like OpenVZ or Xen, and then connect to it through VNC or RDP.
