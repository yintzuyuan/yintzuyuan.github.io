---
layout: default.njk
title: 關於我
description: 殷慈遠 - 字型設計師、Python 開發者、YouTube 創作者
lang: zh
locale: zh-TW
---

<div class="about-header">
  <img src="/assets/images/profile.png" alt="殷慈遠的個人照片" class="profile-photo">
  <div class="about-content">
    <p>我是殷慈遠（TzuYuan Yin），字型設計師、Python 開發者、YouTube 創作者。</p>
    <p>目前於 <a href="https://www.arphic.com.tw/">文鼎字型</a> 使用 <a href="https://glyphsapp.com/">Glyphs</a> 設計字型，並在 <a href="https://www.youtube.com/@erikin1205_typogame">YouTube</a> 分享設計知識。</p>
  </div>
</div>

---

<dl>
{% for item in timeline %}
  {% if item.year %}
  <dt><strong>{{ item.year }}</strong></dt>
  {% endif %}
  {% for event in item.events %}
  <dd data-icon="{{ event.icon }}">{{ event.text.zh | markdownify | safe }}</dd>
  {% endfor %}
{% endfor %}
</dl>
