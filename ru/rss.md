---
title: RSS
---

RSS-файл собирает обновления с некоторого сайта, так что с RSS reader'ом ты получаешь ленту последних обновлений. Обычно [блоги](/ru/blogs), [газеты](/ru/newspapers) и [журналы](/ru/articles) генерируют RSS-файл.
<br><br>

yet another rss reader - <https://github.com/nkanaev/yarr>

Win+R

shell:startup

Вставь ярлык .exe файла. Теперь yarr будет запускаться при запуске системы.

Можно сделать закладку в браузере для адреса <http://127.0.0.1:7070/>

Чтобы компилировать актуальную версию установи:

Go - <https://go.dev/dl/>

GCC - <https://jmeubank.github.io/tdm-gcc/>

Cygwin - <https://www.cygwin.com/install.html>

Во время установки Cygwin выбери, чтобы установился make.

Далее как описано здесь <https://github.com/nkanaev/yarr/blob/master/doc/build.md>

Запусти терминал Cygwin.

```
git clone https://github.com/nkanaev/yarr.git
cd yarr
make build_windows  # -> _output/windows/yarr.exe
```

Получишь yarr.exe в C:\cygwin64\home\имя пользователя\yarr\_output\windows

Можешь импортировать мои подписки:

<a href="/files/subscriptions.opml" download>subscriptions.opml</a>
<br><br>

Как найти RSS-ленту? Добавь к URL:

/feed/

/rss

/rss.xml

Попробуй загуглить "URL rss".

Если нет результата, используй [Google Новости](https://news.google.com/home?hl=ru&gl=RU&ceid=RU:ru). Сделай такого рода запрос:

when:24h inurl:profile.ru

И добавь к URL rss:

<https://news.google.com/search?q=when%3A24h%20inurl%3Aprofile.ru&hl=ru&gl=RU&ceid=RU%3Aru>

<https://news.google.com/rss/search?q=when%3A24h%20inurl%3Aprofile.ru&hl=ru&gl=RU&ceid=RU%3Aru>

Если сайт не генерирует RSS-ленту, ты можешь сгенерировать его с помощью rss-bridge:

rss-bridge - <https://github.com/RSS-Bridge/rss-bridge>

XPathBridge - <https://rss-bridge.org/bridge01/#bridge-XPathBridge>

Чтобы использовать XPathBridge, тебе нужно найти XPath (путь к элементу в HTML-файле) необходимых элементов RSS-ленты. Нажми правой кнопкой мыши на элемент (заголовок, картинка, время) и выбери Посмотреть код. Нажми правой кнопкой мыши на строку кода и выбери Copy->Copy full XPath.

Пример использования XPathBridge для Frankfurter Allgemeine Zeitung:

```
https://www.faz.net/faz-live

/html/body/div[1]/div[5]/div/div/div/div[@class="ticker-news-item"]

concat(string(.//div[2]/h2/div[1]/text()), "~", string(.//div[2]/h2/div/a/text()))

Item description selector: .//div[1]/a/img

.//div[2]/h2/div/a/@href

substring(string(.//div[2]/time), 0, 18)
```