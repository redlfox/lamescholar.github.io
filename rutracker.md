---
title: My RuTracker releases / Мои раздачи на Рутрекере
---

{% assign rutracker = site.data.rutracker.rss.channel.item | sort: 'title' %}
<ul>
    {% for item in rutracker %}
      <li><a href="{{ item.link }}">{{ item.title }}</a></li>
	{% endfor %}
 </ul>