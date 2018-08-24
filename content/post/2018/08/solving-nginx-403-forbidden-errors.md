---
title: "Solving NGINX 403 Forbidden Errors"
published: 2018-08-11T19:47:00+12:00

tags: []

draft: true
---

namei -l /usr/share/nginx/html/dir/t.html  
the whole path must be executable by nginx (d????????x at least)  
  
autoindex is off by default, so directories aren't listed.
