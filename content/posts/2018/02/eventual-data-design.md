---
title: "Eventual Data Design"
published: 2018-02-23T11:30:00+13:00

tags: [ "dev", "cloud",]

# pulled because i think it's dumb now (2019-06-29)
draft: true
---

I do a lot of work with web API's, particularly as React web-app back-ends, and an issue I constantly run-into is the speed at which these requests return. These long-running web requests makes pages slow to render, with content having to be hidden behind a loader or other skeleton animation while the user waits.

These React projects, however, are low-traffic and low-value. I don't want to have to pay for servers to continuously pre-cache data that's nice for a user to have and access quickly, but isn't all that critical or value-adding to the system overall.

While thinking about this, I was wondering why I couldn't just do the long-running processing for the data after the request had terminated? I was working in C#, which is well known to separate the actual application from the web server - meaning that you can't control the web server from within your app in a very meaningful way. To me this meant a change in technologies, to something where the web server was actually part of the application - this was a job for Node.js.

In Node.js, you don't have to return a script to terminate the web request. This is perfect for what I had thought about.

## The design outline
1. The user hits the JSON API, and they are either returned initial data displaying default values, or data from the cache.
2. In the JSON object, a field describes the state of the cache - if the data will be renewed after this request, when the data was last cached, etc., so that the client knows how old the data is and can make decisions based on that.
3. After the request is terminated, the timestamp on the cache is evaluated to determine if the data needs to be refreshed (or is ignored if it always needs to be as up-to-date as possible), and then the script continues to do the typical things that you would do to process or otherwise add value to the API data.
4. Transformed data should be added to a fast database, such as MongoDB, Redis, or DocumentDB, so it can be looked up quickly in the first step.
5. Script terminates.

### Pros
- **Data is consistently quickly delivered to the user**. A simple key/value query to a database is much faster than selecting information from a range of data stores, and then processing it. The transformations applied to different sets of data may vary in the amount of time it takes to complete the job, meaning if this job occurs while the client is waiting, they may cancel the request before it is complete.

- **Longer-running data transformations can be employed**. Data is only ever processed when the client isn't waiting for a response, meaning a longer-running query or data transformation process can be applied without slowing down requests. This results in more valuable data being delivered more consistently.

- **Cost of data processing is dramatically reduced**. The data is only processed when the client requests it, rather than having to run a timed or constant job to keep data up-to-date. It is impossible to predict exactly when a client is going to require this data, so it would be wasteful and expensive to continuously update these sets of data when it's only going to be requested a couple of times per day by each client - perhaps not at all. Machine learning could be applied to discover when a client is most likely to make a request, but this is adding more cost in an attempt to lower costs.

### Cons

- **Data is always outdated**. This design shouldn't be applied to critical data sources, as the information being displayed will always be tied to when the job was last performed for this data set. The issues is that it could be at best a few seconds old, or at worst months or even years, depending on the client's activity.

- **Repeat requests defeat the purpose**. Depending on your design, you may run-into issues where the client hits the API multiple times, before the last requests have completed their work. This means that the potentially expensive data transformation may occur multiple times, with only one transformation being value added - a sort of race-condition. This can of course be fixed with ACID transactions, but it's always going to be a possibility while the work dispatcher is controlled by the client (as they initiate API requests), and not an orderly scheduling system.

## Example
If you want to see an example of how I implemented this with Google Cloud Platform's Functions, I have a now-defunct set of scripts located on GitHub: [interflare/archived-functions](https://github.com/interflare/archived-functions).  
  
There are of course many improvements than can be made to prevent repetitive requests, such as a system that marks the job as in-progress in a database, but with the project I was working on, it didn't really matter.

## Conclusion
This design probably isn't new, but I believe it's a great way to think about accessing and processing data that means little to clients and your application, but is nice to have nonetheless. Rather than stripping out everything that isn't going to make you money, this might be a dirt-cheap way of distributing supplementary data that could mean a customer chooses you over every other service.
