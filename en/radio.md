---
comments: true
title: Radio
---

NPR - <https://www.npr.org/>

BBC Sounds - <https://www.bbc.co.uk/sounds>

Deutschlandfunk Kultur - <https://www.deutschlandfunkkultur.de/>

On BBC Sounds you can find [Reith Lectures](https://en.wikipedia.org/wiki/Reith_Lectures). Here's the interesting series of lectures on consciousness by John Searle:

<https://www.bbc.co.uk/sounds/play/p00h2cmw>

Here you can find the transcripts:

<https://www.bbc.co.uk/radio4/features/the-reith-lectures/transcripts/2011/>
<br><br>

#### How to record radio broadcast

Media->Stream...->Network. Enter broadcast link. Profile->Audio - MP3. Devise destination file. Start.

Links:

WNYC - <https://fm939.wnyc.org/wnycfm-mobile.aac>

BBC Radio 4 - <https://a.files.bbci.co.uk/ms6/live/3441A116-B12E-4D2F-ACA8-C1984642FA4B/audio/simulcast/dash/nonuk/pc_hd_abr_v2/cfs/bbc_radio_fourfm.mpd>

France Culture - <https://stream.radiofrance.fr/franceculture/franceculture_hifi.m3u8>

Deutschlandfunk Kultur - <https://st02.sslstream.dlf.de/dlf/02/128/mp3/stream.mp3>
<br><br>

#### How to make your own online radio

Technically, you could broadcast from your own IP, but it's not safe to disclose your IP. So, buy cheap virtual server.

OK, you have virtual server and you connected to it via [MobaXterm](https://mobaxterm.mobatek.net/download.html). We need to configure virtual server to receive audio broadcast from your computer. We'll be using RTP protocol. First, we need to open the port on virtual server only for your IP:

```
sudo iptables -A INPUT -p udp -s YOUR_IP --dport 5004 -j ACCEPT
```

Now port 5004 is open for your IP. Now we need to set up virtual server to receive and rebroadcast audio coming from your IP. For that we need to install VLC on virtual server:

```
sudo apt update
sudo apt install vlc
```

OK, you have VLC on virtual server. Now we need to create constantly running service that would keep rebroadcasting incoming audio broadcast.

Create service file:

```
sudo nano /etc/systemd/system/vlc-stream.service
```

Paste (Shift+Insert):

```
[Unit]
Description=VLC Stream Service
After=network.target

[Service]
Type=simple
User=YOUR_USERNAME
Group=YOUR_USERNAME
Environment=HOME=/home/YOUR_USERNAME
ExecStart=/usr/bin/cvlc rtp://@:5004 --sout '#standard{access=http,mux=mp3,dst=:8080/radio.mp3}'
Restart=always
RestartSec=30

[Install]
WantedBy=multi-user.target
```

Crtl+O. Enter. Ctrl+X.

Now start the service:

```
sudo systemctl enable vlc-stream
sudo systemctl start vlc-stream
```

OK. We are finished on virtual server end. Virtual server constantly attempting to receive and rebroadcast audio coming from your IP. Now you need to broadcast audio from your computer. Again, we'll be using [VLC](https://www.videolan.org/vlc/). Open VLC. Media->Stream... Here choose File or Capture Device. Stream. New destination->RTP / MPEG Transport System. Add. Fill virtual server IP. Next. Profile->Audio - MP3. Next. Stream. Now you should be able to listen to your broadcast here:

http://VIRTUAL_SERVER_IP:8080/radio.mp3