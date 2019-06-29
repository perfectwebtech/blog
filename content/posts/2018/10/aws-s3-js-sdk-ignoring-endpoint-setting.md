---
title: AWS S3 JS SDK Ignoring Endpoint Setting
published: 2018-10-22T12:38:00+13:00

tags: [ "dev",]
---

I was setting up an application that connected to [DigitalOcean Spaces](https://m.do.co/c/f8ffd8a5f356), an S3-compatible object storage service. I was following [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-upload-a-file-to-object-storage-with-node-js) for an intro - because I've never used the AWS SDK before this.

Small issue - when configuring the S3 object and trying to connect, it would totally ignore the endpoint setting when I set it as the tutorial recommended:

```js
// ❌ wrong
const aws = require("aws-sdk");

const spaces_ep = aws.Endpoint("ams3.digitaloceanspaces.com");
const spaces = new aws.S3({
  endpoint: spaces_ep
});
```

Annoyingly, I had to check-in with the AWS Node.js docs, which are impossible to find initially ([for future reference](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html)). Here is how you are supposed to set your endpoint:

```js
// ✅ right
const aws = require("aws-sdk");

const spaces = new aws.S3({
  endpoint: "ams3.digitaloceanspaces.com"
});
```

Annoying, right? It was just a string all along. I think maybe the tutorial needs to be updated.
