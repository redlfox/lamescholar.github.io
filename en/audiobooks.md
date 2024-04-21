---
title: Audiobooks
---

#### Sources:

AudioBook Bay - <https://audiobookbay.is/member/advanced_search>

My Anonymouse - <https://www.myanonamouse.net/index.php>

Application:

<https://www.myanonamouse.net/inviteapp.php>

IRC client:

mIRC - <https://rutracker.org/forum/viewtopic.php?t=2901572>

AppData\Roaming\mIRC\scripts

HexChat - <https://hexchat.github.io/downloads.html>
<br><br>

#### Programs:

Winamp - <https://www.winamp.com/downloads/>
<br><br>

#### Audiobook with subtitles

Suppose you found audiobook in German. It can be translated into English.

You have mp3 and cover of audiobook.

1. Make subtitles (1.srt) out of mp3 with [subsai](/en/whisper).

2. Translate subtitles (1.srt) from German to English with [wmt19-de-en](/en/translation) model from Hugging Face (2.srt).

3.  [Edit](https://notepad-plus-plus.org/downloads/) translated subtitles (2.srt)

4. Make video out of mp3 and cover with ffmpeg.

	ffmpeg installation:

	Chocolatey - <https://chocolatey.org/install>

	Open a command prompt with administrator rights. Right-click on the Start button. Terminal (Administrator).

	choco install ffmpeg

	Commands:

	Win+R

	```
	cd path to folder with mp3 and cover
	ffmpeg -loop 1 -i cover.jpg -i "audiobook in german.mp3" -shortest out.mp4
	```

5. Embed subtitles (2.srt) into video:

	Win+R

	```
	cd path to folder with mp3 and cover
	ffmpeg -i out.mp4 -vf "subtitles=2.srt:force_style='OutlineColour=&H80000000,BorderStyle=4,BackColour=&000000000,Outline=2,Shadow=0,MarginV=25,Fontname=Arial,Fontsize=16,Alignment=2'" -c:a copy out2.mp4
	```

It turns out to be something like a movie with subtitles. Audiobook with subtitles.

You can do without translation. For example, you want to listen to an audiobook in English, but you don't recognize all the words. You're doing subtitles. You're making a video. You embed subtitles into the video. You get an audiobook with subtitles.