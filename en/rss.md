---
title: RSS
---

RSS file collects updates on some site, so with RSS reader you get a feed of recent updates. Usually [blogs](/en/blogs), [newspapers](/en/newspapers), and [magazines](/en/articles) generate RSS file.
<br><br>

yet another rss reader - <https://github.com/nkanaev/yarr>

Win+R

shell:startup

Paste shortcut of .exe file. Now yarr will start at system startup.

You can make a bookmark in browser for address <http://127.0.0.1:7070/>

To compile actual version install:

Go - <https://go.dev/dl/>

GCC - <https://jmeubank.github.io/tdm-gcc/>

Cygwin - <https://www.cygwin.com/install.html>

While installing Cygwin select to install make.

Then as described here <https://github.com/nkanaev/yarr/blob/master/doc/build.md>

Start Cygwin terminal.

```
git clone https://github.com/nkanaev/yarr.git
cd yarr
make build_windows  # -> _output/windows/yarr.exe
```

You'll get yarr.exe in C:\cygwin64\home\your username\yarr\_output\windows

You can import my subscriptions:

<a href="/files/subscriptions.opml" download>subscriptions.opml</a>
<br><br>

How to find RSS feed? Add to URL:

/feed/

/rss

/rss.xml

Try to google ""URL rss".

If no result, use [Google News](https://news.google.com/home?hl=en-US&gl=US&ceid=US:en). Make this kind of search:

when:24h inurl:washingtonpost.com

And add rss to URL:

<https://news.google.com/search?q=when%3A24h%20inurl%3Awashingtonpost.com&hl=en-US&gl=US&ceid=US%3Aen>

<https://news.google.com/rss/search?q=when%3A24h%20inurl%3Awashingtonpost.com&hl=en-US&gl=US&ceid=US%3Aen>

If the site doesn't generate RSS feed, you can generate it using rss-bridge:

rss-bridge - <https://github.com/RSS-Bridge/rss-bridge>

XPathBridge - <https://rss-bridge.org/bridge01/#bridge-XPathBridge>

To use XPathBridge, you need to find XPath (path to element in HTML file) of necessary elements of RSS feed. Right click on the element (title, image, time) and select Inspect. Right click the code line and select Copy->Copy full XPath.

Example of XPathBridge use for Frankfurter Allgemeine Zeitung:

```
https://www.faz.net/faz-live

/html/body/div[1]/div[5]/div/div/div/div[@class="ticker-news-item"]

concat(string(.//div[2]/h2/div[1]/text()), "~", string(.//div[2]/h2/div/a/text()))

Item description selector: .//div[1]/a/img

.//div[2]/h2/div/a/@href

substring(string(.//div[2]/time), 0, 18)
```