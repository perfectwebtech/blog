---
title: Properties Defined Outside NodeJS Modules Shared Between Requires
published: 2018-11-10T20:43:00+12:00

tags: [ "dev",]
---

If you use Node.js modules in any capacity, you may or may not benefit from the knowledge that properties defined outside the module are shared between every `require()` you call.

This is just a quick post, because I couldn't find anything right-away on the internet - so I ended up checking it out for myself.

I wanted to be able to call a module through require, so I could do some cleanup when my service received a `SIGHUP` or `SIGTERM` - and I didn't have to make my code any longer by defining it in a variable. I know, it's lazy and maybe a bad design pattern 😬

![example code that i was testing](https://assets.crookm.com/media/2018/properties-defined-outside-nodejs-modules-shared-between-requires--4c063839-e3c4-42c5-b11b-be3eabbaa917.png)

![the output from the console after running it](https://assets.crookm.com/media/2018/properties-defined-outside-nodejs-modules-shared-between-requires--a741f072-6c70-42e0-ba75-a34e1f371469.png)
