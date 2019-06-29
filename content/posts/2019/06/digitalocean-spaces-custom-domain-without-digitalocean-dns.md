---
title: DigitalOcean Spaces Custom Domain without DigitalOcean DNS
published: 2019-06-30T10:30:00+12:00

tags: [ "tooling",]
---

I wanted to use a custom domain on a DigitalOcean space, but I didn't want to use their DNS system - I would rather have everything together, and everything is already together with CloudFlare.

Initially, I thought this wasn't gonna be possible without buying my own SSL certificate, since DigitalOcean only allows you to set a custom domain via a certificate.

I gave up for a while, because I didn't want to have to pay for an SSL certificate in the age of Let's Encrypt, but then I finally remembered that CloudFlare offers free origin certificates. You have to route the domain through CloudFlare at all times, but that's okay because of the added benefit that you would be charged less for egress bandwidth by DigitalOcean.

Just generate a new origin certificate under crypto -> origin certificates for your desired domain name, `my-assets.crookm.com` in my case:

![](https://assets.crookm.com/media/2019/digitalocean-spaces-custom-domain-without-digitalocean-dns--a5c4fe24-a850-489c-a2b5-bf7beb65891e.png)

And then you can paste the contents of the certificate and private key into the custom certificate fields under the CDN settings in your DigitalOcean space:

![](https://assets.crookm.com/media/2019/digitalocean-spaces-custom-domain-without-digitalocean-dns--732a2d7f-6121-4de3-a502-f318c0a44c60.png)

Also, like the instructions on DigitalOcean say, you will need to add a CNAME DNS record to your domain. Do this under CloudFlare, and make sure that it's routed via their servers (orange clouded), otherwise the SSL certificate will be invalid - since origin certificates are only valid for CloudFlare.