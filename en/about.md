---
layout: default.njk
title: About
description: TzuYuan Yin - Type Designer, Python Developer, YouTube Creator
permalink: /en/about/
---

<div class="about-header">
  <img src="/assets/images/profile.png" alt="Portrait of TzuYuan Yin" class="profile-photo">
  <div class="about-content">
    <p>I'm TzuYuan Yin, a type designer, Python developer, and YouTube creator.</p>
    <p>Currently working at <a href="https://www.arphic.com.tw/">Arphic Types</a>, designing fonts with <a href="https://glyphsapp.com/">Glyphs</a>, and sharing design knowledge on <a href="https://www.youtube.com/@erikin1205_typogame">YouTube</a>.</p>
  </div>
</div>

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
