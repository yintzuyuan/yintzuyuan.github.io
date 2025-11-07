---
layout: default.njk
title: 關於我
description: 殷慈遠 - 字體設計師、Python 開發者、YouTube 創作者
---

我是殷慈遠（TzuYuan Yin），字體設計師、Python 開發者、YouTube 創作者。

目前於 [文鼎字型](https://www.arphic.com.tw/) 使用 [Glyphs](https://glyphsapp.com/) 設計字體，並在 [YouTube](https://www.youtube.com/@erikin1205_typogame) 分享設計知識。

---

<dl>
{% for item in timeline %}
  {% if item.year %}
  <dt><strong>{{ item.year }}</strong></dt>
  {% endif %}
  {% if item.event and item.icon %}
  <dd data-icon="{{ item.icon }}">{{ item.event | markdownify | safe }}</dd>
  {% elif item.event %}
  <dd>{{ item.event | markdownify | safe }}</dd>
  {% endif %}
{% endfor %}
</dl>
