---
title: "Node.js NGINX SSL Reverse Proxy with Websocket Support"
slug: nodejs-nginx-ssl-reverse-proxy-with
published: 2017-12-19T16:50:00+13:00

tags: [ "linux",]
---

While not a strict requirement of a Node.js web project, good non-thread-blocking reverse proxy software - such as NGINX - can never hurt. One of the reasons I always use one is for much simpler and mature SSL support, as well as being able to run multiple public-facing web apps on the same VPS.

However, I always find it a little tricky to go through all the configuration options - and websocket support is not always clear.

So here I am, sharing a typical configuration setup in `/etc/nginx/sites-available/default` for NGINX 1.10.3 on Debian 9.3:

```txt
server {
    listen 80;

    server_name example.com www.example.com;
    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;

        proxy_pass http://127.0.0.1:<PROJECT PORT>;
        proxy_redirect off;

        # socket.io support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

server {
    listen 443 ssl;

    server_name example.com www.example.com;

    # ssl certs and keys
    ssl_certificate /etc/ssl/certs/<YOUR CERTIFICATE>.crt;
    ssl_certificate_key /etc/ssl/private/<YOUR SECRET KEY>.key;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers 'AES128+EECDH:AES128+EDH';

    ssl_prefer_server_ciphers on;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;

        proxy_pass http://127.0.0.1:<PROJECT PORT>;
        proxy_redirect off;

        # socket.io support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Make sure you give it a test with `sudo nginx -t` and then restart nginx with `sudo systemctl restart nginx`.

The SSL ciphers specified should be more than secure for developers looking at some random webpage for security tips, but you can always change your configuration.

One thing that I still need to figure out is IPv6 support, but that only sometimes works. If you have an IPv6 setup that works with CloudFlare, please send me an email - I'd love to know how you got it working.
