---
title: "Alternative Backup Locations"
published: 2018-04-08T18:02:00+12:00

#image: https://crookm.ams3.cdn.digitaloceanspaces.com/media/2018/alternative-backup-locations--1af25f31-2bab-4d06-b33d-c32281b37bc4.png

tags: [ "security", "linux", "cloud",]

# pulled because i think it's dumb now (2019-06-29)
draft: true
---

I have a few Ubuntu machines here-and-there, and one of my most recent additions is my MacBook Air. I installed Ubuntu 17.10.1 and so far it's okay.

One thing that was causing me some grief, however, was the Deja Dup update. This update to the default backup software interface left me without the option to backup to Google Cloud Platform's blob storage service.

While there was still the possibility that the underlying CLI software (Duplicity) that powers the front-end (Deja Dup) may still have this functionality available, I wasn't about to go down that route.

The solution for me was to provision a networked file drive through Microsoft Azure. This allowed me to mount a drive at login through fstab and set a scheduled backup like I would do normally.

Since most of my files and media exist in the cloud anyway - by way of Google Drive, GitHub, Netflix, and Apple Music - I only needed a small 250GB file drive. This drive can also be shared with other devices, if you like to live on the edge of increased risk of data loss / don't want to set up another drive, like myself.

The pricing [isn't too bad](https://azure.microsoft.com/en-us/pricing/details/storage/files/), especially considering that you only pay for what you use. If you find your bill is getting too high, set the software to delete old backups (avoid deleting files yourself, you might delete something important!).

Of course, you don't have to use Azure. You could use [DigitalOcean](https://m.do.co/c/f8ffd8a5f356), for example, and set up a droplet to host some block storage over a samba share.

### Pro tip

You'd do yourself good by encrypting your backups with a unique password, since this is a network drive, so you should always assume that a hacker (or your cloud provider!) could get access. The encryption feature is available during the first backup.

Also note that an encryption password won't stop some asshole from deleting all of your backups, leaving you in a precarious position. Make sure you have a periodic offline backup of all your important files, even if you have to do it manually.
