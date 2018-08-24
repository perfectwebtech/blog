---
title: "Distribution of Circular Queued Work in Node.js"
published: 2018-01-17T17:21:00+13:00

tags: [ "dev", "javascript",]
---

I was building an application that worked with Twitter for a friend, but it unfortunately got killed by Twitter for violating their terms of service - oops. However, that application, while it was running, needed to be able to work with a lot of inputs at critical times. There was no way that a single operator on a circular queue, slowly working its way through linearly, was going to cut it - more and more items would expire before it can get back to the beginning.

Instead, what I decided was best was to simply add all of these work items into a database, and execute some interesting queries on childcprocesses - ‘workers’.

If you don’t want an explanation, I put together something of an example on GitHub, [right here](https://github.com/crookm/work-distribution).

## The workers
I didn’t bother with anything too fancy - even though I definitely did over-engineer this example. It’s just a forked script with IPC for communication, sending each other information via objects.

#### index.js
```js
const { fork } = require('child_process');

let awaiting = {}; // array of payload ids awaiting responses from workers
let awaiting_lastid = 1; // incrementing payload ids
let worker_pool = [];

function sendPayload(id, payload) {
  payload.id = awaiting_lastid++; // set and add id
  awaiting[payload.id] = { worker: id, date: Date.now() }

  worker_pool[id].send(payload);
}

function receivePayload(id, payload) {
  switch (payload.type) {
    case 'meta.acknowledged':
      // the worker responded to our request
      delete awaiting[payload.obj.id];
      break;
    case 'error':
      // worker sent an error
      console.warn(`${id} error (${payload.obj.errcode}):`);
      console.warn(payload.obj.errmsg);
      console.warn('');
      break;
    default:
      console.warn(`${id} sent unknown payload type`);
      break;
  }
}

function setupWorkerPool(count = 4) {
  for (let i = 0; i < count; i++) {
    let worker = fork('./worker.js');
    worker.on('message', payload => receivePayload(i, payload));
    worker_pool.push(worker);

    sendPayload(i, { type: 'id.set', obj: { id: `${process.pid}__${i}` } });
  }
}

setupWorkerPool();

// Keep the program running forever (ctrl+c to exit)
setInterval(() => {}, Number.POSITIVE_INFINITY);
```

The index.js file is our root script - the parent. It creates worker processes and adds it to an array, that allows us to interact with it from the parent.

Node.js sets up IPC (inter-process communication) automatically, and we send the worker its ID. I chose to set an ID myself in the parent, but you could just as easily use the workers process id, as it would be better scoped to the server.

I also set up an ‘awaiting payload’ system, so that we could setup health checks and dynamically drop and spawn new processes. I haven’t actually developed this yet, but maybe later.

The `setInterval` at the bottom of this script it to keep the script running forever - otherwise it would terminate as soon as it reached the bottom of the script, and kill the forked processes before they can even do anything. If you were using this script in a framework such as express or sails, this is unnecessary as they keep the script running anyway.

**Fun fact!** - A javascript interval is never scheduled when it is set to infinity, even though the script expects it to do so, meaning the script never terminates.

#### worker.js
```js
const self = { id: 0 };

let work_loop = () => {
  // some work here! :D
};

function sendPayload(payload) {
  process.send(payload);
}

function sendError(err) {
  sendPayload({
    type: 'error',
    obj: {
      errcode: -1,
      errmsg: err
    }
  });
}

function acknowledgePayload(payload) {
  sendPayload({ type: 'meta.acknowledged', obj: { id: payload.id } });
}

function receivePayload(payload) {
  switch (payload.type) {
    case 'id.set':
      self.id = payload.obj.id;
      var work_loop_interval = setInterval(work_loop, 1000);
      break;
  }
  acknowledgePayload(payload);
}

process.on('message', receivePayload);
```

Pretty basic! All it does at this point is receive some info from the parent, and schedule a work loop to run every second.

This requires the worker loop to get the data itself, rather than relying on the parent to send it data to work on.

The thinking behind this type of design is that the worker can get the data to work on as it is required. There’s never a moment when it has nothing to work on, or where it has too much to work on.

This design, however, requires some slightly fancy queries to select data from a database (mysql in this case) in a way that prevents race conditions and over-working on the same work item.

## The SQL queries
All of the following queries would be placed into the `work_loop` function in `worker.js`, using your favourite MySQL connector or equivalent. You can see this in action in the [GitHub example](https://github.com/crookm/work-distribution) I’ve set-up.

In any other project, you would probably begin by SELECT-ing work items that haven’t been worked on, then UPDATE-ing to claim a few items as being worked on by a particular worker process. This won’t work, they will no doubt select the same rows. You might also think to use a transaction, but this probably won’t cut it either.

What we need is something atomic - completing in a single query. The simplest way to do this is to flip our queries around. `UPDATE` first, `SELECT` second. How trivial!

```sql
UPDATE work
SET
  `worker_id` = ?,
  `worker_claimedAt` = NOW()
WHERE
  (`worker_id` IS NULL
    OR `worker_claimedAt` < DATE_SUB(NOW(), INTERVAL 30 SECOND))
  AND `active` = 1
ORDER BY `worker_lastWork` DESC
LIMIT 1;
```

With the first `?` param being the ID of the worker.

As you can see, this selects the work item that is the oldest, and either unclaimed, or where the claim is old enough that it was likely to have stalled or failed.

You can then easily select the work based on the worker’s ID, perform the work, and then unclaim the work! Easy as!
