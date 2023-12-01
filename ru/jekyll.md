---
title: Jekyll
---

С помощью [Jekyll](https://jekyllrb.com/) (генератор статических сайтов) и [GitHub Pages](https://pages.github.com/) (хостинг) можно создать бесплатный статический сайт для своего блога или личного сайта. Лимит размера сайта - 1 ГБ.
<br><br>

Для создания сайта необходимо зарегистрироваться на GitHub:

<https://github.com/>
<br><br>

Для создания сайта необходимо установить:

Git - <https://git-scm.com/download/win>

Jekyll - <https://jekyllrb.com/docs/installation/windows/>
<br><br>

# Создание сайта

Создай репозиторий с названием username.github.io (вместо username использую твой username на GitHub).

Теперь отправляйся в командную строку:

Win+R cmd

```
git init username.github.io
cd username.github.io
git checkout --orphan main
jekyll new --skip-bundle .
bundle install
git add .
git commit -m "first commit"
git remote add origin https://github.com/username/username.github.io.git
git push -u origin main
```

Твой сайт будет расположен по адресу https://username.github.io/

Источник: <https://docs.github.com/ru/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll>
<br><br>

# Информация на сайте

В файле _config.yml заполняешь title, author, email, url, description (его можно удалить). В файле about.markdown прописываешь описание сайта.
<br><br>

# Создание страницы

Создай .md файл в папке сайта. Например, page.md. Тогда на твоём сайте появится страничка по адресу https://username.github.io/page. Можешь поместить файл в папку folder.  Тогда на твоём сайте появится страничка по адресу https://username.github.io/folder/page.
<br><br>

# Создание поста

<https://jekyllrb.com/docs/posts/>
<br><br>

# Форматирование

```
1) Жирный текст - **жирный текст**
2) Курсив - *курсив*
3) Заглавие (в начале текста):
---
title: Заглавие
---
4) Заголовок - # текст заголовка
5) Подзаголовок - #### текст подзаголовка
6) Новый абзац - пустая строка
7) Выделение ссылки - <ссылка>
8) Ссылка - [текст](ссылка)
9) Ссылка на страницу сайта: [текст](/папка/страница)
10) Ссылка на место в тексте:
[Place](#place)

<a id="place"></a>
11) Содержание:
# Содержание
[Введение](#introduction)

<a id="introduction"></a>
# Введение
12) Разрыв строки - <br>
13) Пустая строка (двойной разрыв строки) - <br><br>
14) Сноска:
текст[^1] текст[^2]

[^1]: текст сноски

	текст сноски

[^2]: текст сноски
15) Цитата:
> цитата
>
> продолжение цитаты
16) Маленький текст - <sub>текст</sub>
```

Блок кода - <https://docs.github.com/ru/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks>

<https://www.markdownguide.org/basic-syntax/>
<br><br>

# Добавление картинки

Допустим, ты положил картинку image.png в папку images. Чтобы отобразить её на странице, пропиши:

```
![Описание картинки](/images/image.png)
```

Чтобы поместить её в центре, пропиши:

```
{:refdef: style="text-align: center;"}
![Описание картинки](/images/image.png)
{: refdef}
```

Чтобы добавить ссылку к картинке, пропиши:

```
{:refdef: style="text-align: center;"}
[![Описание картинки](/images/image.png)](ссылка)
{: refdef}
```
<br>

# Добавление аудио

<https://stackoverflow.com/questions/63701944/how-to-embed-audio-into-a-jekyll-blog>
<br><br>

# Добавление видео

<https://github.com/nathancy/jekyll-embed-video>

<https://stackoverflow.com/questions/48876911/embedded-local-mp4-not-playing-in-chrome-when-running-jekyll-serve-econnreset>
<br><br>

# Добавление иконки сайта

<https://medium.com/@xiang_zhou/how-to-add-a-favicon-to-your-jekyll-site-2ac2179cc2ed>
<br><br>

# Обновление сайта

Win+R cmd

```
cd username.github.io
git add .
git commit -m "new commit"
git push
```

Можно создать .bat файл и поместить в него эти команды. Тогда коммит можно сделать двумя кликами. Чтобы командная строка не закрывалась сразу после выполнения команд, добавь команду pause.
<br><br>

# Запуск сайта локально

Во избежание ошибки, необходимо добавить webrick в Gemfile:

```
cd username.github.io
bundle add webrick
```

Запуск сайта:

```
cd username.github.io
bundle exec jekyll serve
```

Проходишь по выданному адресу.
<br><br>

# Фильтрация зоны навигации (правый верхний угол)

Прописываешь в _config.yml:

```
header_pages:
  -about.markdown
```
<br>

# Изменение размера заглавия

Заходишь в папку minima. На Windows она находится где-то здесь:

C:\Ruby32-x64\lib\ruby\gems\3.2.0\gems\minima-2.5.1

Заходишь в папку _layouts. Копируешь (Ctrl+C) page.html.

Создаёшь папку _layouts в username.github.io. Вставляешь (Ctrl+V). Редактируешь page.html с помощью [Notepad++](https://notepad-plus-plus.org/downloads/). Удаляешь

```
 class="post-title"
```