---
title: "Debounce API Requests in a JS Class"
published: 2018-07-06T10:30:00+12:00

tags: [ "dev", "javascript", "snippet",]
---

I have a react application that needs to access an API endpoint on the client side - which is hit when a user clicks on a button, as well as a few other places in the UI. The trouble is, the API endpoint is a cloud function, which is charged on a per-execution basis.

I don't want users to be able to spam-click this button and have to pay for it, but I also don't want to disable the button during the request - which would encourage the user to view the source and spam my API themselves. I want something to work invisibly, so they think that everything is working as they expect - a new request every time they click.

Because of how I crafted the API response, only the last request really matters within a specified amount of time, which means a debounced API request function would be perfect.

Here's an overview of how I implemented it, based off of the [lodash debounce method](https://github.com/lodash/lodash/blob/master/debounce.js):

```js
export default class API {
  constructor() {
    /**
     * This is the function that should be called in the
     * actual application.
     */
    this.apiFunc = this._debounce(this._apiFunc, 1000 * 2);
  }

  /**
   * The debounce function, named as a 'private' method to
   * indicate it shouldn't be executed outside the class.
   *
   * @param func: the function to execute, passed as anonymous
   * @param wait: how long uninterrupted until it should be executed
   * @param immediate: if true, just execute now
   */
  _debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this;
      var args = arguments;

      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  /**
   * Your api function, named as a 'private' method to
   * indicate it shouldn't be executed outside the class.
   */
  _apiFunc(your, params, here) {
    console.log("your debounced api function here!");
  }
}
```