---
title: "Kali Linux on DigitalOcean"
published: 2018-02-21T21:27:00+13:00

#image: https://crookm.ams3.cdn.digitaloceanspaces.com/media/2018/kali-linux-on-digitalocean--3eb66413-0f33-4801-be73-fc5d4d9c9f0e.png

tags: [ "tooling", "linux",]
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

It's important to note, you can't install the GUI version of Kali Linux through a Docker container like this. If you really want a GUI, you will need to install another OS and setup RDP or VNC - and then add and install the Kali Linux repo and packages. I will detail this in a later post.

And that's it! You can install and update the tools you'll need as you would normally.

## Installing the tools
If you don't know what tools you want - maybe you're just exploring - you can install them as bundles called 'metapackages'. The metapackages are listed [here](https://www.kali.org/news/kali-linux-metapackages/), but I'll list some that you might actually be interested in below:

* `kali-linux-top10`: the most popular security tools on Kali (3.5GB)
* `kali-linux-pwtools`: password cracking utilities (6GB)
* `kali-linux-web`: web application assessments / penetration testing (4.9GB)

Note that RFID and wireless tools are almost definitely useless on a virtual machine in the cloud.
