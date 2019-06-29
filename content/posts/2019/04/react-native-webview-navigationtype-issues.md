---
title: React Native WebView NavigationType Issues
published: 2019-04-15T20:00:00+12:00

tags: [ "mobile", "dev",]
---

I was having some issues today with the [React Native WebView package](https://github.com/react-native-community/react-native-webview), regarding use of the navigation type in the `onShouldStartLoadWithRequest` event in control logic.

This is how I was using the feature, in an effort to open external links in the safari browser, rather than the webview:

The React Native app I'm working on is for a local news media company, and so have a relatively large archive of content that I need to keep in mind when building it. They produce articles using HTML, which makes things a little harder to work with in native, and it wasn't an option to go back through the archive to convert everything into markdown or something.

The best option was to simply stick everything in a WebView. That's what had already been done in the past for this app - the previous developer had decided to produce a simple, dedicated mobile site to use in their webview. Cool, I didn't have to do anything there.

What I did *want* to do, was open external links in a proper browser. A webview is not a real browser, and I didn't want it to be. When users click on, say, a link to Wikipedia from a news article, it should open in safari where they can bookmark it for later. However, when the user clicks on a link to another story, I want to be able to capture and intercept that, so I can direct them to the native screen for that article.

Below is how I thought it would work:

```js
<WebView
  source={{ uri: "https://example.com/page.html" }}
  onShouldStartLoadWithRequest={request => {
    if (request.navigationType === "click") {
      // open external sites in a real browser
      if (!request.url.startsWith("https://example.com")) {
        Linking.openURL(request.url);
        return false;
      }
    } else {
      return true;
    }
  }}
/>
```

It works fine and dandy on iOS devices, but on Android it simply browses to the external website inside the WebView. Ugh.

As it turns out, the navigation type on Android is always `other` - meaning that by my control logic, the webview is always allowed to load the page and never open the browser. You unfortunately wouldn't know this unless you [checked out the code](https://github.com/react-native-community/react-native-webview/blob/82fe6e2c3d5a600d585f2e27c50d484090308eba/src/WebViewTypes.ts#L613).

As far as I know, there's no way to fix this simply. You will have to know the domains that your page connects to before-hand - a whitelist of sorts. This is because with the navigation type proving to be essentially useless, something as simple as loading a JS file from an external source will try to open it in the browser.

Here's how I thought I would try to solve this:

```js
<WebView
  source={{ uri: "https://example.com/page.html" }}
  onShouldStartLoadWithRequest={request => {
    if (
      !request.url.startsWith("https://example.com") &&
      !request.url.startsWith("https://cdn.jsdelivr.com")
    )
    {
      Linking.openURL(request.url);
      return false;
    }

    return true;
  }}
/>
```

In the above example, my webpage might use resources from my own domain, and maybe a JS script from jsDelivr. Everything else the webview might load should be considered external, and should be opened in an external browser.
