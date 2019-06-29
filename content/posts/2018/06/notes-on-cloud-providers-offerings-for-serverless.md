---
title: "Notes on Cloud Providers Offerings for Serverless"
published: 2018-06-22T12:22:00.001000+12:00

tags: [ "tooling", "dev", "cloud",]

# pulled because i think it's dumb now (2019-06-29)
draft: true
---

I just had some notes I wanted to share regarding using serverless
functions on a couple of different cloud providers.  

## Microsoft Azure
- My go-to provider for functions
- Supports secrets for things like connection strings
- Can be configured to use inputs and outputs from Azure services, already authenticated
- Works best with functions written in C# (non-crx)
- C# script (crx) is not really supported in IDE's, mostly to do with importing libraries
- Node.js and Python are still not quite mature yet
- C# projects have the fastest cold-startup, while Node.js is the slowest
- Python is always slow to run regardless, because it's run through some type of virtualised environment that you have to set up yourself
- Good luck using Python wheels or pip
- Function runtime is based on input and output - if for example you send an output, the function will be terminated soon-after, rather than letting the function terminate in code. This makes [eventual data design](https://www.crookm.com/2018/02/eventual-data-design.html) impossible.

## Google Cloud

- Node.js functions only
- Slightly slower to run overall, but doesn't appear to have a cold-startup that I could see
- Function runtime is NOT based on input and output, functions can terminate programmatically
- Secrets storage, like environment variables, are not supported
- Git integration was impossible for my workflow for the above reason, had to paste into the web editor with my secrets in plaintext.
- Google Cloud libraries are automatically imported, and already authenticated based on the account running the function
