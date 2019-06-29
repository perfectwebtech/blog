---
title: Unreliable LAN Server Connection
published: 2018-12-17T20:00:00+12:00

tags: [ "linux",]
---

I have a web server that I use on the local network for various tasks, and when browsing it from my laptop I would find that it randomly stops responding, the LAN server connection was very unreliable.

![](https://assets.crookm.com/media/2018/unreliable-lan-server-connection--f136679b-c53f-4e15-8fa9-02ca272ba93b.png)

Turning networking off and back on appeared to do something to reset the connection, and the server would respond for a while before cutting again. I do make use of an OS-level VPN, but this didn't appear to affect the LAN connection on either the client or server.

When looking back at my IS322 class notes from a couple of semesters ago gave me the idea to check the ARP cache on my laptop. While the correct hardware address was being shown for the IP in question, clearing the cache seemed to have the same effect as toggling networking off and on, giving me a few more minutes uninterrupted.

At this point I had no idea what could be causing this, and was close to writing a script to just delete the ARP entry whenever I couldn't get a successful ping from the server, but thankfully - I realised I hadn't checked the ARP cache on the server! 🙄

![ARP cache showing incomplete entry](https://assets.crookm.com/media/2018/unreliable-lan-server-connection--51c81dab-aaf5-4c85-ac9a-05cc206a4839.png)

The highlighted row shows an **incomplete** hardware / MAC address for the IP that I'm trying to connect to the server from. My guess is that something is wrong with the broadcast system - maybe my server isn't configured properly, or the laptop is disconnected from the wifi before it response to an ARP request from the server.

As for the effectiveness of the networking toggle and ARP cache clearning on the client, my guess would be that the client can broadcast its hardware address just fine, and the server picks it up then - but then the cache expires, and I can no longer access from the client.

## Solution
Because I only have one or two devices that need to access this server, and the hardware and IP addresses are known, the solution for me was to set the ARP table manually.

I just put in a permanent entry for each device I had with the following command on the server:

```sh
sudo arp -s <client IP> <client MAC>
```

![ARP cache showing correct entry](https://assets.crookm.com/media/2018/unreliable-lan-server-connection--44bb553c-6440-4bf5-aa98-b23d390fa429.png)

And now you can see that the ARP table on the server is set correctly now! This fixed the problem, and I haven't had any issues since implementing this fix.

![firefox showing the NGINX server index page](https://assets.crookm.com/media/2018/unreliable-lan-server-connection--9e5df4e2-0e39-4949-93cc-e420d3e9dbd6.png)
