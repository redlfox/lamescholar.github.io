---
title: VPN
---

1) Your own VPN: Virtual server + WireGuard

Buy a virtual server. Connect to it through MobaXterm:

<https://mobaxterm.mobatek.net/download.html>

Enter in MobaXterm (Shift+Insert):

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

2) Browsec - <https://chrome.google.com/webstore/detail/browsec-vpn-free-vpn-for/omghfjlpggmjjaagoclmmobgdodcjboh/related?hl=en>
<br><br>

3) Tor Browser - <https://www.torproject.org/ru/download/>

If Tor Browser is blocked in your country, use a bridge. Settings->Tor->Bridges->Use a bridge->Request a bridge from torproject.org->Request a New Bridge.