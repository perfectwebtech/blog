---
title: My Backup System
published: 2018-11-22T09:52:00+12:00

image: https://crookm.ams3.cdn.digitaloceanspaces.com/media/2018/my-backup-system--291fe92b-68db-4206-9c9b-a7e8f7ace74f.jpg

tags: [ "tooling", "linux",]
---

Backups are the most valuable part of your digital life - if your computer or phone died today, how hecked would you be? What would happen if your files were encrypted with ransomware? What if you accidentally permanently deleted your entire photo album?

I thought I would share my current backup system to encourage you to set up your own, as well as check-up on anything you already have running. It's no good having a backup system if you can't restore from it.

## Phone backups
My phone is a pretty shifty android device, that I don't trust having any private data on - because I believe it has spyware installed on it from the manufacturer through their custom OS (in addition to the usual Google spyware).

For this reason, my backup system on here is pretty basic: photos and videos are uploaded to Google Photos automatically, and apps, call history, and device settings are backed up to my personal Google Drive.

There is unfortunately no incremental or encrypted backup system available by default, and I'm not willing to try anything on the Play store.

#### Things to note about this setup:

* **There are no incremental backups** - no previous version may cause issues if you've wiped the content of a file, but this isn't really an issue here because edited images are versioned in Google Photos, and I don't care about my settings or apps or call history.
* **There is no encryption** - access to my google account is access to all my data, two factor authentication is really important here.

![google drive mobile backup screenshot](https://crookm.ams3.cdn.digitaloceanspaces.com/media/2018/my-backup-system--afbbbd11-f2b2-4c8e-9fe8-2408a5a15639.png)

## Laptop backups
I have a Macbook which I trust more than my phone, given Apple's stance on privacy and user control. For this reason, I'm okay with storing private data on it.

Since it's Apple, the only real option for backups is their own service - Time Machine. I have an external drive which I connect to semi-regularly to perform incremental backups. Time Machine is also really great in that you can encrypt your backups, I believe it's through full-disk encryption.

#### Things to note about this setup:

* **The disk is kept offline most of the time** - if it was always connected, there is a higher chance that it could be wiped or encrypted in an attack.
* **The disk is encrypted with a very strong password** - if it were to be stolen, the data remains private, but of course there's no way to find the drive.
* **I have to manage the drive** - unlike cloud storage, I have to make sure the drive is still alive and accessible.
* **There is no further redundancy** - related to above, there is only one copy of this drive, if it dies then so do all file versions.

![time machine screenshot](https://crookm.ams3.cdn.digitaloceanspaces.com/media/2018/my-backup-system--09f3a170-6fde-4159-be8d-790688a4a4ba.png)

## Desktop backups
This is where things get interesting. I have a Linux Mint 19 system as my main driver, and so it's important to me that it remains running well. It stores most of the media I keep off the cloud (mostly becuase of size), so keeping that data around is crucial.

My home folder is backed up using Duplicity, with the storage location set to my university Google Drive account - which is unlimited. I also keep it encrypted with a strong password to prevent Google or my university from scanning my files. This is scheduled to run every day, but if I could be bothered I would probably set it up to run a little more often - I don't really want to use Duplicity outside of the Deja Dup interface. I ignore my trash and my downloads folder to keep things a little lighter on the drive, though this might change.

#### Things to note about this setup:

* **There are incremental backups** - file versions are configured to be safe for at least six months.
* **There is encryption** - should my account be compromised, at least my data will be secure.
* **Managed account security** - the university controls authentication through their own Shibboleth SSO setup which increases attack space, though they have a pretty good record for account security (nowadays, they used to use plaintext passwords I hear).
* **Google account might not be around forever** - my university says that students can keep their Google accounts forever, but I remain unsure and will have to be ready to move everything to my personal account once I leave.

![duplicity screenshot](https://crookm.ams3.cdn.digitaloceanspaces.com/media/2018/my-backup-system--6f9a9f06-1f7f-4063-a0ec-40e114cf49b7.png)

I also have a lot of media stored on a larger internal HDD, of which the priority of backup is lower since it can be re-downloaded at any time - but it would be annoying to download again because of the file sizes.

For this reason, I make use of Resilio Sync. This allows me to sync all of these files with my laptop, connected to the same external hard drive as my Time Machine backup under a seperate encrypted partition. This is probably way unnecessary, because it syncs over the local network - I should just connect the drive to my desktop. However, I don't want to be messing around with cables when I can just sync automatically at the same time as my laptop is backing up via Time Machine.

#### Things to note about this setup:

* **Partially incremental** - the last few file versions and deleted files are kept by Resilio on *other* devices, which can be accessed with the archive link in the application, which just opens a hidden folder.
* **Networked** - syncing happens over the network, which is fine because it's encrypted, but it's significantly slower especially with files in the hundreds of gigabytes.
* **Torrent protocol** - the nature of the torrent protocol means that there are many small non-sequential reads / writes, which could cause the disk to die faster.
* **Shared disk** - even though it is partitioned from the Time Machine section, errors with this backup system will cascade to the other, such as with a drive failure.

![resilio sync screenshot](https://crookm.ams3.cdn.digitaloceanspaces.com/media/2018/my-backup-system--ae729b2f-d943-4a86-9a99-30efd4542567.png)

Finally, I want to have snapshots of the system as a whole, so I can revert to previous system states when I'm installing new programs or updating the kernel. This functionality comes with Linux Mint: TimeShift.

TimeShift uses BTRFS or RSync to take snapshots of your drives. I use RSync because I wanted to backup to another internal HDD. My settings take backups on boot, hourly, daily, weekly, and monthly, plus I usually run a manual backup when I'm updating something finnicky like grub or systemd or the kernel.

I don't believe that TimeShift encrypts the backups, but I save them to an encrypted disk, and the permissions for the directory is root only, which is great if you accidentally try to delete anything.

Also important to note, I don't backup my home directory. This is because it's encrypted, and I don't want to expose it in the backups folder, and it's already backed up by Duplicity.

#### Things to note about this setup:

* **They are incremental** - you can configure the number of versions for each timeframe that you want to keep.
* **They are encrypted** - via the disk encryption.
* **Disk is always mounted** - it could be wiped maliciously or by accident at any time, but this is less of a problem given that the purpose of this backup is for system stability through updates.

![timeshift screenshot](https://crookm.ams3.cdn.digitaloceanspaces.com/media/2018/my-backup-system--0099382c-9f6b-4f36-b5be-b8a44130ea77.png)

## Final thoughts
So my backup system is probably way over the top for most people, or not enough - depending on who you ask - but it's important that you have some way of recovering your irreplaceable data should there be a disaster or accident.

A good mix of cloud and local backups are the best way to keep your data accessible, and adding encryption allows you to keep it from getting into the wrong hands.

Don't make your backup system a chore! Use automated backups where possible, because if you have to orchestrate everything manually, you'll probably get bored and start slacking on your backups. This would be tragic if your device dies, and last backup was three months ago, when you could be bothered.

You should also consider if your backup system is as susceptible to data loss as the thing you are backing up - if you get malware on your desktop, will it have access to your backups? Your cookies from your logged-in Google account?

Leave a comment below with your setup! I'd be very interested to hear how you keep your data safe.

*Header image by* <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@freeche?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Thomas Kvistholt"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-1px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Thomas Kvistholt</span></a>
