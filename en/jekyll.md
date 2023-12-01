---
title: Jekyll
---

Using [Jekyll](https://jekyllrb.com/) (static site generator) and [GitHub Pages](https://pages.github.com/) (hosting), you can create a free static site for your blog or personal site. The limit of the size of the site is 1 GB.
<br><br>

To create a site you need to register on GitHub:

<https://github.com/>
<br><br>

To create a site you need to install:

Git - <https://git-scm.com/download/win>

Jekyll - <https://jekyllrb.com/docs/installation/windows/>
<br><br>

# Creating a site

Create repository with the name username.github.io (instead of username use your GitHub username).

Now go to the command line:

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

# Information on the site

In the _config.yml file fill title, author, email, url, description (you can delete it). In the about.markdown file, write a description of the site.
<br><br>

# Creating a page

Create a .md file in the site folder. For example, page.md . Then a page will appear on your site at https://username.github.io/page. You can put the file in the folder named folder. Then a page will appear on your site at https://username.github.io/folder/page.
<br><br>

# Creating a post

<https://jekyllrb.com/docs/posts/>
<br><br>

# Formatting

```
1) Bold text - **bold text**
2) Italics - *italics*
3) Title (in the beginning of the text):
---
title: Title
---
4) Heading - # heading text
5) Subheading - #### subheading text
6) New paragraph - empty line
7) Highlight a link - <link>
8) Link - [text](link)
9) Link to site page - [text](/folder/page)
10) Link to place in text:
[Place](#place)

<a id="place"></a>
11) Table of Contents:
# Table of Contents
[Introduction](#introduction)

<a id="introduction"></a>
# Introduction
12) Line break - <br>
13) Blank line (double line break) - <br><br>
14) Footnote:
text[^1] text[^2]

[^1]: footnote text

	footnote text

[^2]: footnote text
15) Quote:
> quote
>
> the rest of quote
16) Small text - <sub>text</sub>
```

Code block - <https://docs.github.com/ru/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks>

<https://www.markdownguide.org/basic-syntax/>
<br><br>

# Adding picture

Let's say you put an image.png picture in the folder named images. To display it on the page, write:

```
![Picture description](/images/image.png)
```

To put it in the center, write:

```
{:refdef: style="text-align: center;"}
![Picture description](/images/image.png)
{: refdef}
```

To add a link to the picture, write:

```
{:refdef: style="text-align: center;"}
[![Picture description](/images/image.png)](link)
{: refdef}
```
<br>

# Adding audio

<https://stackoverflow.com/questions/63701944/how-to-embed-audio-into-a-jekyll-blog>
<br><br>

# Adding video

<https://github.com/nathancy/jekyll-embed-video>

<https://stackoverflow.com/questions/48876911/embedded-local-mp4-not-playing-in-chrome-when-running-jekyll-serve-econnreset>
<br><br>

# Adding a site icon

<https://medium.com/@xiang_zhou/how-to-add-a-favicon-to-your-jekyll-site-2ac2179cc2ed>
<br><br>

# Updating the site

Win+R cmd

```
cd username.github.io
git add .
git commit -m "new commit"
git push
```

You can create .bat file and put these commands into it. Then the commit can be done with two clicks. To prevent the command line from closing immediately after executing commands, add pause command.
<br><br>

# Starting site locally

To counter an error,  you need to add webrick to Gemfile:

```
cd username.github.io
bundle add webrick
```

Starting site:

```
cd username.github.io
bundle exec jekyll serve
```

Open given address.
<br><br>

# Navigation area filtration (upper right corner)

Paste in _config.yml:

```
header_pages:
  -about.markdown
```
<br>

# Changing title size

Go to minima folder. On Windows it is located somewhere here:

C:\Ruby32-x64\lib\ruby\gems\3.2.0\gems\minima-2.5.1

Go to _layouts folder. Copy (Ctrl+C) page.html.

Create _layouts folder in username.github.io. Paste (Ctrl+V). Edit page.html with [Notepad++](https://notepad-plus-plus.org/downloads/). Remove

```
 class="post-title"
```