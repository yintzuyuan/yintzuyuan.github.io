---
layout: default.njk
title: About
description: TzuYuan Yin - Type Designer, Python Developer, YouTube Creator
permalink: /en/about/
---

I'm TzuYuan Yin, a type designer, Python developer, and YouTube creator.

Currently working at [Arphic Technology](https://www.arphic.com.tw/) designing fonts with [Glyphs](https://glyphsapp.com/), and sharing design knowledge on [YouTube](https://www.youtube.com/@erikin1205_typogame).

---

<dl>
{% for item in timeline %}
  {% if item.year %}
  <dt><strong>{{ item.year }}</strong></dt>
  {% endif %}
  {% for event in item.events %}
  <dd data-icon="{{ event.icon }}">{{ event.text.en | markdownify | safe }}</dd>
  {% endfor %}
{% endfor %}
</dl>
