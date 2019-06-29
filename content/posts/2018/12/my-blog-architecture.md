---
title: My Blog Architecture
published: 2018-12-15T20:00:00+12:00

image: https://crookm.ams3.cdn.digitaloceanspaces.com/media/2018/my-blog-architecture--6c564a6e-7d71-4b60-98e9-905b3ca87330.jpg

tags: [ "portfolio",]

# pulled because i think it's dumb now (2019-06-29)
draft: true
---

After many changes over the years, I'm finally happy with where my blog is at, and I wanted to share a bit of it's architecture.

I fully expect to end up overhauling everything by this time next year, but hey, this is what I like to do in my spare time.

## The blog
I use a static generator to put all of my posts into a simple set of files that can be pushed to a host. I just have to make a new markdown file in a folder, and add some basic details like an image link and title.

To generate the site, I use [Hugo](https://gohugo.io/). The reason for this is that it's really fast, and super simple. The themes are pretty extensive, too.

## Blog hosting
Like I said before, my site is static. This gives me some really great advantages with hosting.

[Netlify](https://netlify.com/) is my weapon of choice here, it's fast and free, and that's exactly what I love about it. I just have it hooked up to my GitHub repository, and it re-builds the site whenever I push to it.

## Media hosting
Both Netlify and GitHub have soft limits on repo size, so I'm not going to bother using them to host the media for posts - especially as I plan to move into video.

For this, I like to use [DigitalOcean Spaces](https://m.do.co/c/f8ffd8a5f356). I like it because they offer 250GB of object storage for US$5 /month, and 2c per GB after that. They include a CDN for free, which is why I gave-in.

## Comments
My comments are handled through Twitter. I have a REST endpoint that responds with the ID of a tweet I make for each post, which allows me to embed a button for users to respond.

When somebody does reply, I stream all of my Twitter activity, and replies to any of these tweets are picked up and are added to a collection for the post. This allows me to not have to store any personal data, and respect the user's right to delete their data.

At the end of all this, I can programmatically embed the Twitter collection which displays the comments.

You might be thinking "why not just use Disqus?", but I didn't want to have to be checking for responses. I use Twitter everyday, so it's integrated with my usual daily workflow. Easy breezy.

---

So that's how my blog works! If you have a blog as well, tell me about yours below! Try out the Twitter comments as well, if you want 😉
