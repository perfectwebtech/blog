---
title: Running Skyrim SE on Linux Mint 19
published: 2018-11-03T14:08:00+12:00

image: https://crookm.ams3.cdn.digitaloceanspaces.com/media/2018/running-skyrim-se-linux-mint-19--8a23a7fd-e4a6-4574-87c6-7549fba20711.png
---

Skyrim: Special Edition works right out of the box with Steam Play, but takes some configuration to work excellently. Here's a short guide of how I got everything working on Linux Mint 19, with an NVidia GPU.

The first thing you need to do is enable Steam Play on all games, so just open Steam for Linux, and head over to settings. Under Steam Play, check the respective checkbox.

![steam settings for steam play](https://crookm.ams3.cdn.digitaloceanspaces.com/media/2018/running-skyrim-se-linux-mint-19--85ce8de9-4e9d-4aa1-8eb3-2a655d3fbaaa.png)

If you launch Skyrim SE now, you'll find that it works. There are a few issues, however - involving sound and some graphics/shading issues.

## Getting sound working
Various sound effects will work, but you might find that dialogue and some music will not play. This is an issue with the XACT audio lib, which is not bundled by default because it does not work universally.

I found no issues with my installation, so feel free to add it with winecfg:

```sh
WINEPREFIX=/path/to/your/SteamLibrary/steamapps/compatdata/489830/pfx winecfg
```

The command above will open the wine config for the game. Navigate to and add the following audio libraries - from the `New override for library` dropdown:

* devenum
* xaudio2_6
* xaudio2_7

![wine configuration dialog displaying libraries tab](https://crookm.ams3.cdn.digitaloceanspaces.com/media/2018/running-skyrim-se-linux-mint-19--6d1a7b9c-df90-4f1a-a86f-41ffb634d3f3.png)

## Jittery or unstable graphics
In the same wine configuration dialog, add these libraries:

* d3dx9_39
* gdiplus
* quartz

## Fixing shadows and other graphics peculiarities
You'll notice some weird clipping of shadows and some other weirdness that is not able to be corrected with adding additional wine libraries.

As it turns out, Steam Play requires NVidia drivers >= version 396. Linux Mint 19 ships with version 390. The latest NVidia drivers fixes many of these weird bugs by providing better support for the Vulkan libraries - which Proton translates instructions to.

This is no small fix. Before proceeding, I recommend you take a full snapshot with Timeshift.

After that, start by changing your graphics driver to the Nouveua display driver in the driver manager and restart.

When you're back, purge your NVidia packages:

```sh
sudo apt purge 'nvidia.*'
```

Then you can add the repository for the graphics drivers with:

```sh
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt update
```

What's left to do now is simply install the drivers. You can do this with the driver manager again, but you may run into issues with dependancies - which is why I reccommend you use the terminal again here:

```sh
sudo apt install nvidia-kernel-source-396 libnvidia-compute-396 libnvidia-decode-396 libnvidia-encode-396 nvidia-driver-396
```

Finally, install the configuration tools and support for the Steam client itself:

```sh
sudo apt install nvidia-xconfig nvidia-prime libnvidia-gl-396:i386
```

And open the NVidia x server settings from the start menu, browse to the x server display configuration, and save to the x configuration file to initialise it.

![nvidia x server settings](https://crookm.ams3.cdn.digitaloceanspaces.com/media/2018/running-skyrim-se-linux-mint-19--05426d89-8f73-4a9c-b4f6-96ed5d2a57f5.png)


## Conclusion
Most of these fixes and configurations will help you run most of the games available on Steam through Steam Play.

But in the mean time, enjoy running Skyrim: Special Edition on Linux Mint!

{{< video
poster="https://crookm.ams3.cdn.digitaloceanspaces.com/media/video/running-skyrim-se-linux-mint-19/thumb.jpg" 
uri_dash="https://crookm.ams3.cdn.digitaloceanspaces.com/media/video/running-skyrim-se-linux-mint-19/dash/manifest.mpd"
uri_hls="https://crookm.ams3.cdn.digitaloceanspaces.com/media/video/running-skyrim-se-linux-mint-19/hls/manifest.m3u8"
uri_webm="https://crookm.ams3.cdn.digitaloceanspaces.com/media/video/running-skyrim-se-linux-mint-19/nostream--854x480-30-1250k.webm"
uri_mp4="https://crookm.ams3.cdn.digitaloceanspaces.com/media/video/running-skyrim-se-linux-mint-19/nostream--854x480-30-1250k.mp4" >}}
