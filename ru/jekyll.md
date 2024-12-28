---
comments: true
title: Jekyll
---

С помощью [Jekyll](https://jekyllrb.com/) (генератор статических сайтов) и [GitHub Pages](https://pages.github.com/) (хостинг, на котором работает Jekyll) можно создать бесплатный статический сайт для своего блога или личного сайта. Лимит размера - 1 ГБ.
<br><br>

Для создания сайта необходимо зарегистрироваться на GitHub:

<https://github.com/>
<br><br>

Для создания сайта необходимо установить:

Git - <https://git-scm.com/download/win>

Jekyll - <https://jekyllrb.com/docs/installation/windows/>
<br><br>

#### Создание сайта

Вместо username использую твой username на GitHub.

Отправляйся в командную строку:

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

#### Информация на сайте

В файле _config.yml заполняешь title, author, email, url, description (его можно удалить). В файле about.markdown прописываешь описание сайта.
<br><br>

#### Создание страницы

Создай .md файл в папке сайта. Например, page.md. Тогда на твоём сайте появится страничка по адресу https://username.github.io/page. Можешь поместить файл в папку folder.  Тогда на твоём сайте появится страничка по адресу https://username.github.io/folder/page.
<br><br>

#### Создание поста

<https://jekyllrb.com/docs/posts/>
<br><br>

#### Форматирование

```
1) Жирный текст - **жирный текст**
2) Курсив - *курсив*
3) Заглавие (в начале текста):
---
comments: true
title: Заглавие
---
4) Заголовок - # текст заголовка
5) Подзаголовок - #### текст подзаголовка
6) Новый абзац - пустая строка
7) Выделение ссылки - <ссылка>
8) Ссылка - [текст](ссылка)
9) Ссылка на страницу сайта: [текст](/папка/страница)
10) Ссылка туда и обратно:
текст<a href="#note" id="note-back">†</a>

<a href="#note-back" id="note">†</a> текст примечания
11) Ссылка на место в тексте:
[Place](#place)

<a id="place"></a>
12) Содержание:
#### Содержание
[Введение](#introduction)

<a id="introduction"></a>
#### Введение
13) Разрыв строки - <br>
14) Пустая строка (двойной разрыв строки) - <br><br>
15) Примечание:
текст[^1] текст[^2]

[^1]: текст примечания

	текст примечания

[^2]: текст примечания
16) Цитата:
> цитата
>
> продолжение цитаты
17) Маленький текст - <sub>текст</sub>
```

Блок кода - <https://docs.github.com/ru/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks>

<https://www.markdownguide.org/basic-syntax/>
<br><br>

#### Добавление картинки

Допустим, ты положил картинку image.png в папку images.

Разместить картинку на странице:

```
![Описание картинки](/images/image.png)
```

В центре:

```
{:refdef: style="text-align: center;"}
![Описание картинки](/images/image.png)
{: refdef}
```

С ссылкой:

```
{:refdef: style="text-align: center;"}
[![Описание картинки](/images/image.png)](ссылка)
{: refdef}
```
<br>

#### Добавление аудио

<https://stackoverflow.com/questions/63701944/how-to-embed-audio-into-a-jekyll-blog>
<br><br>

#### Добавление видео

<https://github.com/nathancy/jekyll-embed-video>

<https://stackoverflow.com/questions/48876911/embedded-local-mp4-not-playing-in-chrome-when-running-jekyll-serve-econnreset>
<br><br>

#### Добавление иконки сайта

<https://medium.com/@xiang_zhou/how-to-add-a-favicon-to-your-jekyll-site-2ac2179cc2ed>
<br><br>

#### Обновление сайта

Win+R cmd

```
cd username.github.io
git add .
git commit -m "new commit"
git push
```

Можно создать .bat файл и поместить в него эти команды. Тогда коммит можно сделать двумя кликами. Чтобы командная строка не закрывалась сразу после выполнения команд, добавь команду pause.
<br><br>

#### Запуск сайта локально

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

#### Фильтрация зоны навигации (правый верхний угол)

Прописываешь в _config.yml:

```
header_pages:
  -about.markdown
```
<br>

#### Изменение размера заглавия

Заходишь в папку minima. На Windows она находится где-то здесь:

C:\Ruby32-x64\lib\ruby\gems\3.2.0\gems\minima-2.5.1

Заходишь в папку _layouts. Копируешь (Ctrl+C) page.html.

Создаёшь папку _layouts в username.github.io. Вставляешь (Ctrl+V). Редактируешь page.html с помощью [Notepad++](https://notepad-plus-plus.org/downloads/). Удаляешь

```
 class="post-title"
```
<br>

#### Указание источника в постах

Иногда я "репощу" некоторые тексты в моих постах. Я предпочитаю указывать источник текста перед текстом. Дефолтный макет постов помещает заглавие наверху, так что я скопировал post.html в папку _layout и удалил кусок кода, который создаёт заглавие.
 
Markdown файл таких постов выглядит так:

```
---
layout: post
tag: Reposts
comments: true
title: Заглавие текста
---

Источник: [Название источника](ссылка на источник)
<br><br>

# Заглавие текста
```
<br>

#### Комментарии

<https://help.disqus.com/en/articles/1935528-jekyll-installation-instructions>
<br><br>

#### Аннотации

Существует способ эмулировать заметки на полях - аннотации.

Вставь папку _sass в папку сайта. Добавь в _layout.scss:

```
.annotated-text {
    background-color: transparent;
    cursor: default;
    position: relative;
    display: inline;
}

.annotated-text.visible {
    background-color: #ffeeba;
    cursor: pointer;
}

.annotation-bubble {
    display: none;
    position: absolute;
    background: white;
    border: 2px solid #999;
    border-radius: 4px;
    padding: 12px;
    width: 280px;
    box-shadow: 0 3px 8px rgba(0,0,0,0.25);
    z-index: 100;
    left: 50%;
    transform: translateX(-50%);
    top: 100%;
    margin-top: 8px;
    line-height: 1.4;
}

.annotation-bubble::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 10px 10px 10px;
    border-style: solid;
    border-color: transparent transparent #999 transparent;
}

.annotation-bubble::after {
    content: '';
    position: absolute;
    top: -7px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 8px 8px 8px;
    border-style: solid;
    border-color: transparent transparent white transparent;
}

.annotation-bubble.active {
    display: block;
}

#toggle-annotations {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

#toggle-annotations:hover {
    background-color: #0056b3;
}
```

Добавь в post.html:

```
  <script>
  document.addEventListener('DOMContentLoaded', function() {
      let activeAnnotation = null;
      const annotatedTexts = document.querySelectorAll('.annotated-text');
      const toggleButton = document.getElementById('toggle-annotations');
      let annotationsVisible = false;  // Start with annotations hidden
  
      // Create and append bubble element
      function createBubble(text, parent) {
          const bubble = document.createElement('div');
          bubble.className = 'annotation-bubble';
          bubble.textContent = text;
          parent.appendChild(bubble);
          return bubble;
      }
  
      // Handle click on annotated text
      annotatedTexts.forEach(text => {
          const bubble = createBubble(text.dataset.annotation, text);
          
          text.addEventListener('click', (e) => {
              e.stopPropagation();
              if (!annotationsVisible) return;
  
              if (activeAnnotation === bubble) {
                  bubble.classList.remove('active');
                  activeAnnotation = null;
              } else {
                  if (activeAnnotation) {
                      activeAnnotation.classList.remove('active');
                  }
                  bubble.classList.add('active');
                  activeAnnotation = bubble;
              }
          });
      });
  
      // Close annotation when clicking outside
      document.addEventListener('click', () => {
          if (activeAnnotation) {
              activeAnnotation.classList.remove('active');
              activeAnnotation = null;
          }
      });
  
      // Toggle all annotations
      toggleButton.addEventListener('click', () => {
          annotationsVisible = !annotationsVisible;
          
          annotatedTexts.forEach(text => {
              if (annotationsVisible) {
                  text.classList.add('visible');
                  toggleButton.textContent = 'Hide Annotations';
              } else {
                  text.classList.remove('visible');
                  if (activeAnnotation) {
                      activeAnnotation.classList.remove('active');
                      activeAnnotation = null;
                  }
                  toggleButton.textContent = 'Show Annotations';
              }
          });
      });
  });
  </script>
```

Добавь в Markdown поста:

```
<button id="toggle-annotations">Show Annotations</button>
```

Аннотирование:

```
<span class="annotated-text" data-annotation="Annotation.">Piece of the text.</span>
```