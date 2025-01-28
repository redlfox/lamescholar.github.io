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

#### Underlinings, marginalia, highlightings

There is a way to reproduce underlinings and marginalia as in printed books in posts.


```
<span class="underlining"></span>
<span class="marginalia"></span>
<span class="highlightings" data-text=""></span>
```

Add this script to post.html:

```
  <style>
    .post-content {
      position: relative;
      max-width: 700px;
      margin: 0 auto;
    }
	
    .marginalia {
      position: absolute;
      right: -250px;
      width: 200px;
      padding: 10px;
      background-color: #f8f9fa;
      border-left: 3px solid #dee2e6;
      border-radius: 4px;
      font-size: 0.9em;
      color: #000000;
      opacity: 0;
      transform: translateX(20px);
      transition: all 0.3s ease;
      margin-top: -10px;
    }
	
    .marginalia.visible {
      opacity: 1;
      transform: translateX(0);
    }
	
    .highlighting {
      background-color: transparent;
      transition: background-color 0.3s ease;
      cursor: pointer;
      position: relative;
    }
	
    .highlighting.visible {
      background-color: #ffff00;
    }
	
    .text {
      position: absolute;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      background-color: #495057;
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 0.9em;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      width: max-content;
      max-width: 300px;
      z-index: 1000;
      pointer-events: none;
    }
	
    .text::before {
      content: '';
      position: absolute;
      top: -6px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 0 6px 6px 6px;
      border-style: solid;
      border-color: transparent transparent #495057 transparent;
    }
	
    .text.visible {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0);
    }
	
    .toggle-annotations {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
      z-index: 1000;
    }
	
    .toggle-annotations:hover {
      background-color: #0056b3;
    }
	
    .underlining {
      text-decoration: none;
      transition: text-decoration 0.3s ease;
    }
	
    .underlining.visible {
      text-decoration: underline;
      text-decoration-color: blue;
      text-decoration-thickness: 3px;
    }
	
    @media (max-width: 1200px) {
      .toggle-annotations {
        display: none;
      }
    }
  </style>
  <script>
    window.addEventListener('DOMContentLoaded', function() {
      const marginalia = document.querySelectorAll('.marginalia');
      const highlights = document.querySelectorAll('.highlighting');
      const button = document.getElementById('annotationsButton');
      
      if (marginalia.length > 0 || highlights.length > 0) {
        button.style.display = 'block';
      }

      // Create popup elements for each highlight
      highlights.forEach(highlight => {
        const text = highlight.getAttribute('data-text');
        if (text) {
          const popup = document.createElement('div');
          popup.className = 'text';
          popup.textContent = text;
          highlight.appendChild(popup);
        }
      });

      // Add click handlers for highlights
      highlights.forEach(highlight => {
        highlight.addEventListener('click', function(e) {
          if (!annotationsVisible) return;
          
          // Hide any other visible popups
          document.querySelectorAll('.text.visible').forEach(popup => {
            if (popup !== highlight.querySelector('.text')) {
              popup.classList.remove('visible');
            }
          });
          
          // Toggle this popup
          const popup = this.querySelector('.text');
          if (popup) {
            popup.classList.toggle('visible');
            
            // Prevent popup from going off-screen
            const rect = popup.getBoundingClientRect();
            if (rect.left < 0) {
              popup.style.left = '0';
              popup.style.transform = 'translateY(0)';
            } else if (rect.right > window.innerWidth) {
              popup.style.left = 'auto';
              popup.style.right = '0';
              popup.style.transform = 'translateY(0)';
            }
          }
          
          e.stopPropagation();
        });
      });

      // Click outside to close popups
      document.addEventListener('click', function(e) {
        if (!e.target.closest('.highlighting')) {
          document.querySelectorAll('.text.visible').forEach(popup => {
            popup.classList.remove('visible');
          });
        }
      });
    });

    let annotationsVisible = false;
    function toggleAnnotations() {
      const marginalia = document.querySelectorAll('.marginalia');
      const underlinedText = document.querySelectorAll('.underlining');
      const highlights = document.querySelectorAll('.highlighting');
      const button = document.querySelector('.toggle-annotations');
      
      annotationsVisible = !annotationsVisible;
      
      marginalia.forEach(note => {
        note.classList.toggle('visible', annotationsVisible);
      });
      underlinedText.forEach(text => {
        text.classList.toggle('visible', annotationsVisible);
      });
      highlights.forEach(highlight => {
        highlight.classList.toggle('visible', annotationsVisible);
      });
      
      // Hide all popups when toggling off
      if (!annotationsVisible) {
        document.querySelectorAll('.text.visible').forEach(popup => {
          popup.classList.remove('visible');
        });
      }
      
      button.textContent = annotationsVisible ? 'Hide Annotations' : 'Show Annotations';
    }
  </script>
```