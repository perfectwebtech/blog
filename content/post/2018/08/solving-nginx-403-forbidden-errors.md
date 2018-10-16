---
title: "Solving NGINX 403 Forbidden Errors"
published: 2018-08-11T19:47:00+12:00

tags: ["tooling", "cloud",]

draft: false
---

If you're getting a little frustrated with forbidden pages on NGINX server, you'll probably be glad you found this page. I know I would.

Instead of going through the stresses of figuring out what to do when your entire site (or part of it) is coming back as forbidden, just check the following things:

### Executable permissions
Your root directory, **as well as every parent folder**, must be set to executable for everyone. Instead of going through and checking every directory with `ls -l`, you can use `namei` like so:

```sh
namei -l /var/www/html/dir/index.html
```

The permissions string for every directory should at least end with 'x'.

![](https://crookm.ams3.cdn.digitaloceanspaces.com/media/2018/solving-nginx-403-forbidden-errors--44c27e27-f8ba-4432-b820-a6cb6f44afc7.png)

### Autoindex
If you're running into a 403 when trying to list a directory, you should know that autoindex is off by default.

Should this functionality be what you're trying to achieve, you can enable it in your enabled-sites config:

```nginx
location / {
  autoindex on;
}
```

### Index
If you haven't enabled the above functionality, but are instead trying to access an index page, chances are your index is not one of the default names. This is common with a php index file, for example.

The fix for this is just to add your index to the list for your site's config in enabled-sites:

```nginx
location / {
  index index.php;
}
```
