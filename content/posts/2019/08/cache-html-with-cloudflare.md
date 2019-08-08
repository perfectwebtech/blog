---
title: Cache HTML with CloudFlare
published: 2019-08-08T15:00:00+12:00

tags: [ "tooling",]
---

If you're anything like me and like to look at the response headers of pages in the networking tab of the developer tools of your browser, you might have noticed that pages proxied through CloudFlare are missing the `cf-cache-status: HIT` header like images and scripts have - meaning that they aren't being cached.

Maybe I'm imagining it, but I used to always think that CloudFlare cached HTML - I'm sure I remembered seeing these headers on plain HTML pages. But I guess at some point, this stopped happening automatically.

In the modern age of AnyCast global CDNs used to host static websites, such as Netlify, it's not a massive problem. However, when you're proxying all of your website content through CloudFlare, I don't think its crazy to want to have *everything* cached and served by them.

### Page rules
CloudFlare offers you three page rules for free. These page rules allow you to fine-tune how you want their proxy and cache to work with your content.

We can use page rules to specify that everything being sent through the proxy should be cached, rather than just the [CloudFlare default file types](https://support.cloudflare.com/hc/en-us/articles/200172516-Which-file-extensions-does-Cloudflare-cache-for-static-content).

In the CloudFlare dashboard, go into the page rules tab. Create a new page rule, and specify the URL pattern that the rules should apply to. In my case, I specify all of my posts rather than every single page, resulting in a pattern of: `crookm.com/journal/*`.

You can then specify the rules that you want to apply. You can set anything here, but to cache every single resource including the page itself, we must set: `Cache level: Everything`. I also set the edge cache TTL to something reasonable.

Hit save and deploy, and you should start seeing the pages being served from the CloudFlare edge cache!

![screenshot of cloudflare dashboard featuring the page rule entry modal](https://assets.crookm.com/media/2019/cache-html-with-cloudflare--d2cd3a4f-5c2c-4011-8d4b-13b6dea16469.png)