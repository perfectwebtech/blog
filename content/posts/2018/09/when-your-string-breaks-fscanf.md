---
title: When Your String Breaks fscanf()
published: 2018-09-18T23:28:00+12:00

tags: [ "dev", "c", "snippet",]
---

Have you ever run into a problem with (f)scanf in C? Well I sure have, and here's a short horror story, and how I went about fixing it.

I was working on a [C project](https://github.com/crookm/zsh-history-summary) that makes use of the ZSH command history file. The problems start when you run-into lines that end with `\\n`, which is perfectly acceptable in the command line, but its not dealt with by ZSH when it is saved.

Here's a few lines as an example:

```
: 1527479270:0;gcc part8.c -o part8.out
: 1527479275:0;./part8.out p8a.obj
: 1527481916:0;git commit -m "part 8"
: 1527482512:0;tar cvzf A3.tar.gz part1.c part2.c part3.c part4.c part5.c part6.c part7.c\
part8.c // ⬅️ here's the problem! 😡
: 1527482556:0;mv A3.tar.gz ~/wowowo.tar.gz
```

Can you see my struggle? Because this case was overlooked by the history plugin, we have to produce a fix.

The best way to do this, is to iterate through a character at a time until you come across a positive pattern. In my example, it's a new line followed by semicolon - uncommon in the command line.

In my implementation, I just throw out the current line - you could just fix it up in a similar way, by removing newline chars and any other whitespace.

Here's some sample code that I use in my fscanf while loop:

```c
if (scanned_line[(strlen(scanned_line) - 1)] == '\\')
{
  // move to the end of this hecked line -
  // you may not need this.
  fscanf(f, "%*[^\n]\n", NULL);

  char c;
  while ((c = fgetc(f)) != EOF) // char by char iteration
  {
    fpos_t pos;
    fgetpos(f, &pos); // bookmark the currpos
    if (c == '\n')
      if (fgetc(f) == ':') // get char after current (we need this for the pattern)
      {
        // a ':' after \n is a good sign we're back on track - rewind
        // and return to normal programming so that fscanf works as
        // desired
        fsetpos(f, &pos);
        break;
      }
  }
}
```
