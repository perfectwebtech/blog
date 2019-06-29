---
title: Google Analytics in React
published: 2019-02-23T13:53:46+13:00 

image: https://crookm.ams3.cdn.digitaloceanspaces.com/media/2019/ga-in-react--2af77d3b-b690-426d-9b5a-047a2ab5dbc5.jpg
---

I was polishing one of my old react projects, the [Mass Effect Checklist](https://masseffectlist.com/), and I noticed that I was capturing analytics using Microsoft Application Insights. I don't really use that any more, so I thought I would update it to use Google Analytics.

In my App Insights implementation, I was simply accessing the web script in React by using the window scope. This is dumb and bad.

```js
window.appInsights.trackEvent(
  "someEvent", { someData: "is good" });
```

So when I was setting up Google Analytics to replace it, I came across [ReactGA](https://github.com/react-ga/react-ga), a simple little package that handles everything as a module - it even has a react component that makes tracking outbound links a little easier.

What I do, is I initialise my tracking id in my `App.js`'s `constructor`, and then I have some handler functions that I usually pass downstream as props. I don't imagine that it's necessary to pass down anything like this, but it's what I was doing before.

```js
import React, { Component } from "react";
import ReactGA from "react-ga";

class App extends Component {
  constructor(props) {
    super(props);
    
    this.someTrackingHandler = this.someTrackingHandler.bind(this);
    
    ReactGA.initialize("UA-000000-01");
    ReactGA.pageview(window.location.pathname + window.location.search)
  }
  
  someTrackingHandler() {
    ReactGA.event({
      category: "some category",
      action: "some action"
    });
  }
  
  render() {
    return <button onClick={this.someTrackingHandler}>Trigger</button>;
  }
}

export default App;
```

The above is a (very) condensed version of my live project, check out the diff to the commit I made implementing it [here](https://github.com/crookm/me-checklist/commit/b9af928cfea0e107f19098dc67c8b4161477f13a), if you want to see how it works in an actual project.

---

And just like that, you're well on your way to finding out how your visitors are using your react app!

*Header image:* <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@fancycrave?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Fancycrave"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Fancycrave</span></a>
