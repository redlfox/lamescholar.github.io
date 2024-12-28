---
comments: true
title: Jekyll
---

Using [Jekyll](https://jekyllrb.com/) (static site generator) and [GitHub Pages](https://pages.github.com/) (hosting that runs Jekyll), you can create a free static site for your blog or personal site. Size limit is 1 GB.
<br><br>

To create a site you need to register on GitHub:

<https://github.com/>
<br><br>

To create a site you need to install:

Git - <https://git-scm.com/download/win>

Jekyll - <https://jekyllrb.com/docs/installation/windows/>
<br><br>

#### Creating a site

Instead of username use your GitHub username.

Go to the command line:

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

Your site will be located at https://username.github.io/

Source: <https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll>
<br><br>

#### Information on the site

In the _config.yml file fill title, author, email, url, description (you can delete it). In the about.markdown file, write a description of the site.
<br><br>

#### Creating a page

Create a .md file in the site folder. For example, page.md . Then a page will appear on your site at https://username.github.io/page. You can put the file in the folder named folder. Then a page will appear on your site at https://username.github.io/folder/page.
<br><br>

#### Creating a post

<https://jekyllrb.com/docs/posts/>
<br><br>

#### Formatting

```
1) Bold text - **bold text**
2) Italics - *italics*
3) Title (in the beginning of the text):
---
comments: true
title: Title
---
4) Heading - # heading text
5) Subheading - #### subheading text
6) New paragraph - empty line
7) Highlight a link - <link>
8) Link - [text](link)
9) Link to site page - [text](/folder/page)
10) Link back and forth:
text<a href="#note" id="note-back">†</a>

<a href="#note-back" id="note">†</a> text of the note
11) Link to place in text:
[Place](#place)

<a id="place"></a>
12) Table of Contents:
#### Table of Contents
[Introduction](#introduction)

<a id="introduction"></a>
#### Introduction
13) Line break - <br>
14) Blank line (double line break) - <br><br>
15) Note:
text[^1] text[^2]

[^1]: note text

	note text

[^2]: note text
16) Quote:
> quote
>
> the rest of quote
17) Small text - <sub>text</sub>
```

Code block - <https://docs.github.com/ru/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks>

<https://www.markdownguide.org/basic-syntax/>
<br><br>

#### Adding picture

Let's say you put an image.png picture in the folder named images.

Place an image on the page:

```
![Picture description](/images/image.png)
```

In the center:

```
{:refdef: style="text-align: center;"}
![Picture description](/images/image.png)
{: refdef}
```

With a link:

```
{:refdef: style="text-align: center;"}
[![Picture description](/images/image.png)](link)
{: refdef}
```
<br>

#### Adding audio

<https://stackoverflow.com/questions/63701944/how-to-embed-audio-into-a-jekyll-blog>
<br><br>

#### Adding video

<https://github.com/nathancy/jekyll-embed-video>

<https://stackoverflow.com/questions/48876911/embedded-local-mp4-not-playing-in-chrome-when-running-jekyll-serve-econnreset>
<br><br>

#### Adding a site icon

<https://medium.com/@xiang_zhou/how-to-add-a-favicon-to-your-jekyll-site-2ac2179cc2ed>
<br><br>

#### Updating the site

Win+R cmd

```
cd username.github.io
git add .
git commit -m "new commit"
git push
```

You can create .bat file and put these commands into it. Then the commit can be done with two clicks. To prevent the command line from closing immediately after executing commands, add pause command.
<br><br>

#### Starting the site locally

To counter an error,  you need to add webrick to Gemfile:

```
cd username.github.io
bundle add webrick
```

Starting the site:

```
cd username.github.io
bundle exec jekyll serve
```

Open given address.
<br><br>

#### Navigation area filtration (upper right corner)

Paste in _config.yml:

```
header_pages:
  -about.markdown
```
<br>

#### Changing title size

Go to minima folder. On Windows it is located somewhere here:

C:\Ruby32-x64\lib\ruby\gems\3.2.0\gems\minima-2.5.1

Go to _layouts folder. Copy (Ctrl+C) page.html.

Create _layouts folder in username.github.io. Paste (Ctrl+V). Edit page.html with [Notepad++](https://notepad-plus-plus.org/downloads/). Remove

```
 class="post-title"
```
<br>

#### Stating a source in posts

Sometimes I "repost" some texts in my posts. I prefer to state a source of the text in front of the text. Default post layout puts the title at the top, so I copied post.html into _layout folder and removed piece of code that create title.
 
Markdown file of such posts looks like this:

```
---
layout: post
tag: Reposts
comments: true
title: Title of the text
---

Source: [Source title](link to the source)
<br><br>

# Title of the text
```
<br>

#### Comments

<https://help.disqus.com/en/articles/1935528-jekyll-installation-instructions>
<br><br>

#### Annotations

There is a way to emulate notes on the margins - annotations.

Paste _sass folder into site folder. Add to _layout.scss:

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

Add to post.html:

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

Add to post Markdown:

```
<button id="toggle-annotations">Show Annotations</button>
```

Annotating:

```
<span class="annotated-text" data-annotation="Annotation.">Piece of the text.</span>
```