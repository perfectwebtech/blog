---
title: Transcoding to DASH and HLS with FFmpeg
published: 2018-11-04T17:26:00+12:00

image: https://crookm.ams3.cdn.digitaloceanspaces.com/media/2018/transcoding-to-dash-and-hls-with-ffmpeg--9b3ab1d4-5fac-4534-aff0-b09e437e58d3.jpg
---

For my [previous post](https://www.crookm.com/journal/2018/running-skyrim-se-on-linux-mint-19/), I wanted to include a short video as a proof of the concept I was discussing. What I thought was going to be a simple foray into the world of DASH and HLS streaming video, quickly turned into a nightmare.

The biggest issue by far was getting the video on the actual web page - the most popular video players didn't end up working the way I expected - always falling back to the static videos rather than using the DASH or HLS stream.

Since that portion of the solution is different for every use case, I've decided to share what I can to help anybody looking to do the same thing as me - which mostly involves the transcoding part.

I use FFmpeg, because it's open source, powerful, and already installed on Linux. If you're on another operating system, [download it here](https://www.ffmpeg.org/).

The commands I use for the encoding process are all jammed together with `&&`, so I'll be splitting it up for you. You'll probably end up jamming them together anyway, so [here's a gist](https://gist.github.com/crookm/ab234655b5b3d2e4ac5f1502ad1b6e5c) if you're that way inclined.

## DASH
The DASH format should be the first format on your mind, since compatibility is much greater than that of HLS.

Note that the original file should be named `original.mkv`. Otherwise, you should find and replace with your video file.

Encode the video files:

```sh
mkdir dash && \
ffmpeg -hide_banner -i original.mkv -c:v libvpx-vp9 -row-mt 1 -keyint_min 150 -g 150 -tile-columns 4 -frame-parallel 1 \
-movflags faststart -f webm -dash 1 -speed 3 -threads 4 -an -vf scale=426:240 -b:v 400k -r 30 -dash 1 dash/426x240-30-400k.webm && \
ffmpeg -hide_banner -i original.mkv -c:v libvpx-vp9 -row-mt 1 -keyint_min 150 -g 150 -tile-columns 4 -frame-parallel 1 \
-movflags faststart -f webm -dash 1 -speed 3 -threads 4 -an -vf scale=426:240 -b:v 600k -r 30 -dash 1 dash/426x240-30-600k.webm && \
ffmpeg -hide_banner -i original.mkv -c:v libvpx-vp9 -row-mt 1 -keyint_min 150 -g 150 -tile-columns 4 -frame-parallel 1 \
-movflags faststart -f webm -dash 1 -speed 3 -threads 4 -an -vf scale=640:360 -b:v 700k -r 30 -dash 1 dash/640x360-30-700k.webm && \
ffmpeg -hide_banner -i original.mkv -c:v libvpx-vp9 -row-mt 1 -keyint_min 150 -g 150 -tile-columns 4 -frame-parallel 1 \
-movflags faststart -f webm -dash 1 -speed 3 -threads 4 -an -vf scale=640:360 -b:v 900k -r 30 -dash 1 dash/640x360-30-900k.webm && \
ffmpeg -hide_banner -i original.mkv -c:v libvpx-vp9 -row-mt 1 -keyint_min 150 -g 150 -tile-columns 4 -frame-parallel 1 \
-movflags faststart -f webm -dash 1 -speed 3 -threads 4 -an -vf scale=854:480 -b:v 1250k -r 30 -dash 1 dash/854x480-30-1250k.webm && \
ffmpeg -hide_banner -i original.mkv -c:v libvpx-vp9 -row-mt 1 -keyint_min 150 -g 150 -tile-columns 4 -frame-parallel 1 \
-movflags faststart -f webm -dash 1 -speed 3 -threads 4 -an -vf scale=854:480 -b:v 1600k -r 30 -dash 1 dash/854x480-30-1600k.webm && \
ffmpeg -hide_banner -i original.mkv -c:v libvpx-vp9 -row-mt 1 -keyint_min 150 -g 150 -tile-columns 4 -frame-parallel 1 \
-movflags faststart -f webm -dash 1 -speed 3 -threads 4 -an -vf scale=1280:720 -b:v 2500k -r 30 -dash 1 dash/1280x720-30-2500k.webm && \
ffmpeg -hide_banner -i original.mkv -c:v libvpx-vp9 -row-mt 1 -keyint_min 150 -g 150 -tile-columns 4 -frame-parallel 1 \
-movflags faststart -f webm -dash 1 -speed 3 -threads 4 -an -vf scale=1280:720 -b:v 3200k -r 30 -dash 1 dash/1280x720-30-3200k.webm && \
ffmpeg -hide_banner -i original.mkv -c:v libvpx-vp9 -row-mt 1 -keyint_min 150 -g 150 -tile-columns 4 -frame-parallel 1 \
-movflags faststart -f webm -dash 1 -speed 3 -threads 4 -an -vf scale=1280:720 -b:v 3500k -r 60 -dash 1 dash/1280x720-60-3500k.webm && \
ffmpeg -hide_banner -i original.mkv -c:v libvpx-vp9 -row-mt 1 -keyint_min 150 -g 150 -tile-columns 4 -frame-parallel 1 \
-movflags faststart -f webm -dash 1 -speed 3 -threads 4 -an -vf scale=1280:720 -b:v 4400k -r 60 -dash 1 dash/1280x720-60-4400k.webm && \
ffmpeg -hide_banner -i original.mkv -c:v libvpx-vp9 -row-mt 1 -keyint_min 150 -g 150 -tile-columns 4 -frame-parallel 1 \
-movflags faststart -f webm -dash 1 -speed 3 -threads 4 -an -vf scale=1920:1080 -b:v 4500k -r 30 -dash 1 dash/1920x1080-30-4500k.webm && \
ffmpeg -hide_banner -i original.mkv -c:v libvpx-vp9 -row-mt 1 -keyint_min 150 -g 150 -tile-columns 4 -frame-parallel 1 \
-movflags faststart -f webm -dash 1 -speed 3 -threads 4 -an -vf scale=1920:1080 -b:v 5300k -r 30 -dash 1 dash/1920x1080-30-5300k.webm && \
ffmpeg -hide_banner -i original.mkv -c:v libvpx-vp9 -row-mt 1 -keyint_min 150 -g 150 -tile-columns 4 -frame-parallel 1 \
-movflags faststart -f webm -dash 1 -speed 3 -threads 4 -an -vf scale=1920:1080 -b:v 5800k -r 60 -dash 1 dash/1920x1080-60-5800k.webm && \
ffmpeg -hide_banner -i original.mkv -c:v libvpx-vp9 -row-mt 1 -keyint_min 150 -g 150 -tile-columns 4 -frame-parallel 1 \
-movflags faststart -f webm -dash 1 -speed 3 -threads 4 -an -vf scale=1920:1080 -b:v 7400k -r 60 -dash 1 dash/1920x1080-60-7400k.webm && \
ffmpeg -hide_banner -i original.mkv -c:a libvorbis -b:a 192k -vn -f webm -dash 1 dash/audio.webm
```

Then create a manifest file:

```sh
ffmpeg \
-f webm_dash_manifest -i dash/426x240-30-400k.webm \
-f webm_dash_manifest -i dash/426x240-30-600k.webm \
-f webm_dash_manifest -i dash/640x360-30-700k.webm \
-f webm_dash_manifest -i dash/640x360-30-900k.webm \
-f webm_dash_manifest -i dash/854x480-30-1250k.webm \
-f webm_dash_manifest -i dash/854x480-30-1600k.webm \
-f webm_dash_manifest -i dash/1280x720-30-2500k.webm \
-f webm_dash_manifest -i dash/1280x720-30-3200k.webm \
-f webm_dash_manifest -i dash/1280x720-60-3500k.webm \
-f webm_dash_manifest -i dash/1280x720-60-4400k.webm \
-f webm_dash_manifest -i dash/1920x1080-30-4500k.webm \
-f webm_dash_manifest -i dash/1920x1080-30-5300k.webm \
-f webm_dash_manifest -i dash/1920x1080-60-5800k.webm \
-f webm_dash_manifest -i dash/1920x1080-60-7400k.webm \
-f webm_dash_manifest -i dash/audio.webm \
-c copy \
-map 0 -map 1 -map 2 -map 3 -map 4 -map 5 -map 6 -map 7 -map 8 -map 9 -map 10 -map 11 -map 12 -map 13 -map 14 \
-f webm_dash_manifest \
-adaptation_sets "id=0,streams=0,1,2,3,4,5,6,7,8,9,10,11,12,13 id=1,streams=14" \
dash/manifest.mpd
```

## HLS
Same deal as before.

Encode the video:

```sh
mkdir hls && mkdir hls/240p30 && mkdir hls/360p30 && mkdir hls/480p30 && mkdir hls/720p30 && mkdir hls/720p60 && mkdir hls/1080p30 && mkdir hls/1080p60 && \
ffmpeg -hide_banner -i original.mkv \
-vf scale=w=426:h=240:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264_nvenc -pixel_format yuv420p \
-profile:v main -crf 20 -flags +cgop -sc_threshold 0 -g 150 -keyint_min 150 -r 30 -hls_time 4 -hls_playlist_type vod \
-b:v 400k -maxrate 600k -bufsize 800k -b:a 64k -hls_segment_filename hls/240p30/240p_%03d.ts hls/240p30/manifest.m3u8 && \
ffmpeg -hide_banner -i original.mkv \
-vf scale=w=640:h=360:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264_nvenc -pixel_format yuv420p \
-profile:v main -crf 20 -flags +cgop -sc_threshold 0 -g 150 -keyint_min 150 -r 30 -hls_time 4 -hls_playlist_type vod \
-b:v 700k -maxrate 900k -bufsize 1400k -b:a 96k -hls_segment_filename hls/360p30/360p_%03d.ts hls/360p30/manifest.m3u8 && \
ffmpeg -hide_banner -i original.mkv \
-vf scale=w=854:h=480:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264_nvenc -pixel_format yuv420p \
-profile:v main -crf 20 -flags +cgop -sc_threshold 0 -g 150 -keyint_min 150 -r 30 -hls_time 4 -hls_playlist_type vod \
-b:v 1250k -maxrate 1600k -bufsize 2500k -b:a 128k -hls_segment_filename hls/480p30/480p_%03d.ts hls/480p30/manifest.m3u8 && \
ffmpeg -hide_banner -i original.mkv \
-vf scale=w=1280:h=720:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264_nvenc -pixel_format yuv420p \
-profile:v main -crf 20 -flags +cgop -sc_threshold 0 -g 150 -keyint_min 150 -r 30 -hls_time 4 -hls_playlist_type vod \
-b:v 2500k -maxrate 3200k -bufsize 7000k -b:a 128k -hls_segment_filename hls/720p30/720p_%03d.ts hls/720p30/manifest.m3u8 && \
ffmpeg -hide_banner -i original.mkv \
-vf scale=w=1280:h=720:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264_nvenc -pixel_format yuv420p \
-profile:v main -crf 20 -flags +cgop -sc_threshold 0 -g 150 -keyint_min 150 -r 60 -hls_time 4 -hls_playlist_type vod \
-b:v 3500k -maxrate 4400k -bufsize 5500k -b:a 128k -hls_segment_filename hls/720p60/720p_%03d.ts hls/720p60/manifest.m3u8 && \
ffmpeg -hide_banner -i original.mkv \
-vf scale=w=1920:h=1080:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264_nvenc -pixel_format yuv420p \
-profile:v main -crf 20 -flags +cgop -sc_threshold 0 -g 150 -keyint_min 150 -r 30 -hls_time 4 -hls_playlist_type vod \
-b:v 4500k -maxrate 5300k -bufsize 8500k -b:a 192k -hls_segment_filename hls/1080p30/1080p_%03d.ts hls/1080p30/manifest.m3u8 && \
ffmpeg -hide_banner -i original.mkv \
-vf scale=w=1920:h=1080:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264_nvenc -pixel_format yuv420p \
-profile:v main -crf 20 -flags +cgop -sc_threshold 0 -g 150 -keyint_min 150 -r 60 -hls_time 4 -hls_playlist_type vod \
-b:v 5800k -maxrate 7400k -bufsize 11600k -b:a 192k -hls_segment_filename hls/1080p60/1080p_%03d.ts hls/1080p60/manifest.m3u8
```

The manifest for HLS doesn't change much, so we just have a static file that we always copy over to the `hls/` folder:

```
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-STREAM-INF:BANDWIDTH=400000,RESOLUTION=426x240
240p30/manifest.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=700000,RESOLUTION=640x360
360p30/manifest.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1250000,RESOLUTION=842x480
480p30/manifest.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2500000,RESOLUTION=1280x720
720p30/manifest.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=3500000,RESOLUTION=1280x720
720p60/manifest.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=4500000,RESOLUTION=1920x1080
1080p30/manifest.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=5800000,RESOLUTION=1920x1080
1080p60/manifest.m3u8
```

## Fallbacks
We need some static files to fall back on if the browser doesn't support DASH or HLS. We'll create a webm and mp4:

```sh
ffmpeg -hide_banner -i original.mkv -c:v libvpx-vp9 -row-mt 1 -keyint_min 150 -g 150 -tile-columns 4 -frame-parallel 1 \
-movflags faststart -f webm -speed 1 -threads 4 -vf scale=854:480 -b:v 1250k -r 30 nostream--854x480-30-1250k.webm && \
ffmpeg -hide_banner -i original.mkv \
-vf scale=854:480 -b:v 1250k -b:a 128k -c:a aac -ar 48000 -c:v h264_nvenc -pixel_format yuv420p \
-movflags faststart -profile:v main -g 150 -keyint_min 150 -r 30 -maxrate 1600k -bufsize 2500k nostream--854x480-30-1250k.mp4
```

## Thumbnail
Lastly, I wanted a thumbnail that I can use a poster. Yes, you can take it manually, but I wanted to take it programmatically:

```sh
ffmpeg -i original.mkv -ss 00:00:25 -vframes 1 -vf scale=1280:720 -q:v 5 thumb.jpg
```

And that should be all of it! Upload it all somewhere that supports partial http requests (byte range), and then you can set up your player! I recommend [DigitalOcean spaces](https://m.do.co/c/f8ffd8a5f356) as a host, and [Shaka](https://github.com/google/shaka-player) as a player.

*Header image by [Wahid Khene](https://unsplash.com/photos/iKdQCIiSMlQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)*
