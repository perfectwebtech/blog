---
title: Handling Express.js Body Parser JSON Exceptions
published: 2018-11-10T22:00:00+12:00

tags: [ "dev",]
---

Express.js, an HTTP server for Node.js, has middleware that you have to install to parse and work with the `req` body objects on POST routes - the problem is, it doesn't make it particularly easy to handle errors yourself.

One issue that I ran into specifically was the JSON parser being set to strict by default - meaning that only objects and arrays are accepted. This is okay for what I want to do, but if you try to send something like a plain string, an exception is thrown. By default, this will expose a stack trace to the public site, which you probably don't want to do.

![a json exception being thrown in the console](https://assets.crookm.com/media/2018/handling-express-body-parser-json-exceptions--9d1737cf-7b9e-4563-be1f-c6d76a31050e.png)

You can't catch the exception in your handler for the route, or the route definition for that matter. This dashed my hopes of using the middleware route-specifically.

The solution that I thought was best was posted in [this](https://github.com/expressjs/body-parser/issues/122) github issue for the body-parser repo. It involves adding your own middleware handler after adding body-parser:

```js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.set("env", "production"); // this is how you prevent public stack traces
app.use(require("body-parser").json());

app.use(function(err, req, res, next) {
  // ⚙️ our function to catch errors from body-parser
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    // do your own thing here 👍
    res.status(400).send({ code: 400, message: "bad request" });
  } else next();
});

app.post( "/", require("./something"));

app.listen(port, () => console.info(`[i] listening on port ${port}`));
```
