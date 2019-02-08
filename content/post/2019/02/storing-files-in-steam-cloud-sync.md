---
title: Storing Files in Steam Cloud Sync
published: 2019-02-09T10:00:00+12:00

tags: [ "cloud",]

image: https://crookm.ams3.cdn.digitaloceanspaces.com/media/2019/storing-files-in-steam-cloud-sync--3c668ad9-a718-4f1d-b310-dbb1813abc50.png
---

Just got to playing around with some Steam games, and the Cloud Sync feature got me thinking, could I store any file in here? It's not going to be the next Google Drive, but I thought it would be fun to explore.

First thing I did was naïvely dump a random file in the saves folder of a game I already had installed - Stellaris. That didn't work of course, but I wasn't going to give up this early.

I remembered that in Stellaris, you can select whether you want to store a save game to the cloud. Since the game stores all save files in the same location, that hinted to me that there was some kind of Steam API in use here. Sure enough, [there is](https://partner.steamgames.com/doc/features/cloud).

![screenshot of stellaris save-game menu](https://crookm.ams3.cdn.digitaloceanspaces.com/media/2019/storing-files-in-steam-cloud-sync--98b90a6b-c0c3-4ffe-851c-e7f4b6534dba.jpg)

After some light reading, I discovered that there are two ways that Cloud Sync can be implemented in a game; through the Steam API, and something called Auto Cloud.

Auto cloud seemed like a better target, because I didn't want to be fiddling around with an API that doesn't want to be fiddled with. So now I'm left looking for a game that implements this method of syncing.

Way back in the day, I remember being able to copy and move-around my save games and have them sync in the original Skyrim, so I gave that a go. I did the same initial dumping of a file and hoped for the best. No dice.

I figured I would do some more reading of the Auto Cloud API to see what's up. Of course, there's a pattern matching stage! This is perfect, all it checks is the filename.

Pop a file in the save game directory, tack-on the save extension of `.ess`, start and close the game, and we're in business!

A super convoluted way of getting a tiny (Skyrim gives you 200MB) amount of free cloud storage!

![screenshot of steam cloud properties](https://crookm.ams3.cdn.digitaloceanspaces.com/media/2019/storing-files-in-steam-cloud-sync--87714ffe-9ef7-480b-827d-01b9b0a067b9.png)

Note that to delete files, you have to delete them in the game. This means that you sometimes get the weirdness of [having a save number](https://crookm.ams3.cdn.digitaloceanspaces.com/media/2019/storing-files-in-steam-cloud-sync--9375307a-6f6f-4fc8-b29e-4ae5a83e612a.jpg) from the unrelated file.

{{< video
title="Steam Cloud Sync Misc Files"
poster="https://crookm.ams3.cdn.digitaloceanspaces.com/media/video/2019/storing-files-in-steam-cloud-sync/thumb.jpg" 
uri_dash="https://crookm.ams3.cdn.digitaloceanspaces.com/media/video/2019/storing-files-in-steam-cloud-sync/dash/manifest.mpd"
uri_hls="https://crookm.ams3.cdn.digitaloceanspaces.com/media/video/2019/storing-files-in-steam-cloud-sync/hls/manifest.m3u8"
uri_webm="https://crookm.ams3.cdn.digitaloceanspaces.com/media/video/2019/storing-files-in-steam-cloud-sync/nostream--854x480-30-1250k.webm"
uri_mp4="https://crookm.ams3.cdn.digitaloceanspaces.com/media/video/2019/storing-files-in-steam-cloud-sync/nostream--854x480-30-1250k.mp4" >}}
