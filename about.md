---
layout: default.njk
title: 關於我
description: 殷慈遠 - 字體設計師、Python 開發者、YouTube 創作者
---

# 關於我

## 自我介紹

嗨！我是殷慈遠（Erikyin），一位熱愛字體設計、程式開發與創意影音的創作者。我目前居住在台灣，於[文鼎字型](https://www.arphic.com.tw/)擔任字體設計師，在字型設計領域，我主要使用 [Glyphs](https://glyphsapp.com/) 這套軟體來創造出獨特且具有表現力的字體。除此之外，我也正在學習使用 Python 程式語言，透過撰寫腳本和工具，讓我的設計工作更加順利與高效率。

另外，我也是一名 [YouTube 頻道](https://www.youtube.com/@erikin1205_typogame)經營者，在這裡我分享許多新穎實用的字型設計點子，與觀眾們一同探索創作的無限可能。無論是設計、程式還是影音製作，我都致力於將這些熱情帶給世界，並持續探索著各種新的創作可能性。

歡迎來到我的個人網站，讓我們一同探索設計與創意的精彩世界吧！

---

## 時間軸

<dl>
{% for item in timeline %}
  {% if item.year %}
  <dt><strong>{{ item.year }}</strong></dt>
  {% endif %}
  {% if item.event and item.icon %}
  <dd data-icon="{{ item.icon }}">{{ item.event | safe }}</dd>
  {% elif item.event %}
  <dd>{{ item.event | safe }}</dd>
  {% endif %}
{% endfor %}
</dl>
