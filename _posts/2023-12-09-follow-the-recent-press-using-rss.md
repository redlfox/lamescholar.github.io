---
layout: post
tag: Posts
title: How to follow the recent press using RSS?
---

# How to follow the recent press using RSS?

Author: lamescholar - 2023-12-09
<br><br>

**3 things are needed:**

1) VPN in case there is a strong censorship in your country

2) Bypass Paywalls Clean extension to bypass paywall

3) List of RSS feeds + RSS reader to collect news from news sites
<br><br>

**1) VPN. Virtual server + WireGuard.**

Buy a virtual server. Connect to it through MobaXterm:

<https://mobaxterm.mobatek.net/download.html>

Enter commands (Shift+Insert):

```
apt update
apt install docker.io
```

To install WireGuard on your server, install this container:

<https://hub.docker.com/r/weejewel/wg-easy>

Enter in MobaXterm (write in your server ip and some password):

```
docker run -d \
  --name=wg-easy \
  -e WG_HOST=🚨YOUR_SERVER_IP \
  -e PASSWORD=🚨YOUR_ADMIN_PASSWORD \
  -v ~/.wg-easy:/etc/wireguard \
  -p 51820:51820/udp \
  -p 51821:51821/tcp \
  --cap-add=NET_ADMIN \
  --cap-add=SYS_MODULE \
  --sysctl="net.ipv4.conf.all.src_valid_mark=1" \
  --sysctl="net.ipv4.ip_forward=1" \
  --restart unless-stopped \
  weejewel/wg-easy
  ```
  
Install WireGuard client on your computer:

<https://www.wireguard.com/install/>

Import config file. Get it from this address:

<http://5.104.75.85:51821/>

To login use password you came up with installing WireGuard on your server.
<br><br>

**2) Bypass Paywalls Clean is an extension that opens articles accessible only to subscribers of newspapers and magazines.**

<https://gitlab.com/magnolia1234/bypass-paywalls-chrome-clean>

For Chrome you need to download an archive.

<https://gitlab.com/magnolia1234/bypass-paywalls-chrome-clean/-/archive/master/bypass-paywalls-chrome-clean-master.zip>

Unzip. In Chrome open the extensions settings. Turn on Developer mode. Load unpacked extension - folder.

Done.

With Bypass Paywalls Clean it's good to have adblock. uBlock Origin.

<https://chromewebstore.google.com/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm>
<br><br>

**3) To use RSS you need to have a collection of RSS feeds themselves and RSS reader.**

The best (in my opinion) RSS reader is yarr (yet another rss reader).

Here's the page on GitHub.

<https://github.com/nkanaev/yarr>

Since the last release there was a significant change. So it's better to use recently compiled exe. Here's the one compiled by me:

<https://lamescholar.github.io/files/yarr.exe>

My collection of RSS feeds:

<a href="/files/subscriptions.opml" download>subscriptions.opml</a>

Guide on RSS in general:

<https://lamescholar.github.io/ru/rss>
<br><br>

As a result we got free access to recent publications from hundreds of sources.