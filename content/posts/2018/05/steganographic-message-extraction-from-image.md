---
title: "Steganographic Message Extraction from Image"
published: 2018-05-23T18:58:00+12:00

tags: [ "snippet", "security", "python", ]
---

Steganography is the practice of hiding data in plain sight, such as within the pixel data in an image, video, or audio file. There are infinitely many ways of doing this, by changing the order or distance that the message bits are stored from each other - but it is most important that it remains constant, and that the person you're sending the message to knows how to decode it!

I have a snippet for you to do the decoding. This snippet assumes you
have an image where a pascal-type string message has been stored in
row-major, least-significant-bit fashion.

```py
from PIL import Image

stream = []
with open('image.png', 'rb') as img_file:
  im = Image.open(img_file)
  px = im.load()
  
  x = 0
  y = 0
  end = False
  while not end:
    for pixel in px[x,y]:
      stream.append(pixel)
    if x+1 == im.width-1:
      if y+1 == im.height-1: end = True
      else: y += 1
      x = 0
    else: x += 1

length = int(''.join([str(bit % 2) for bit in stream[0:31][::-1]]), 2)

chars = [str(bit % 2) for bit in stream[32:32+(length*8)]] # slice of the stream
chars = [int(''.join(chars[i:i + 8][::-1]), 2) for i in range(0, len(chars), 8)] # grouped into characters

print(chars)
print(''.join(chr(char) for char in chars))
```

This snippet requires PIL, or its modern fork - Pillow (`pip install Pillow`).
