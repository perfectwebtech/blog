---
title: "One-Page App Routing on Netlify"
published: 2018-02-19T19:52:00+13:00

tags: [ "tooling", "dev", "cloud",]
---

While playing around with react router on a react app I'm building and deploying to Netlify, I noticed that I would get a 404 page not found error if I fully-refreshed the page, or entered from a location other than the index.

Looking deep into the Netlify docs I found out that you have to add a little file to your `/public` directory named `_redirects` with the following content:

```txt
/* /index.html 200
```

All it does is rewrite all requests to any file that doesn't already exist to the index page, where react router can handle it.

Note that navigating to a file that exists from the app will not work without a forced refresh. For example if you were at `/`, and you typed `/file.png`, you would be passing `/file.png` to the router, of which a route (probably) won't exist.

Pretty simple!
