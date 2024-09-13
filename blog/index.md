---
layout: default
title: 字碼筆記
permalink: /blog/
header_title: 📝
hide_first_title: true
body_class: home-page
---

# 📝

歡迎來到我的部落格！這裡將分享我的想法和經驗。

{% for post in site.posts %}
  <article>
    <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
    <time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date: "%Y-%m-%d" }}</time>
    {{ post.excerpt }}
  </article>
{% endfor %}