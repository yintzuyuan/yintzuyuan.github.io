---
layout: default
title: 字碼筆記
header_title: 📝
hide_first_title: true
body_class: home-page
---

# 📝

{% for post in site.posts %}
  <article class="blog-post-summary">
    <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
    <time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date: "%Y年%m月%d日" }}</time>
    {{ post.excerpt }}
    <a href="{{ post.url }}" class="read-more">繼續閱讀</a>
  </article>
{% endfor %}

{% if paginator.total_pages > 1 %}
<div class="pagination">
  {% if paginator.previous_page %}
    <a href="{{ paginator.previous_page_path | relative_url }}">&laquo; 上一頁</a>
  {% endif %}

  {% for page in (1..paginator.total_pages) %}
    {% if page == paginator.page %}
      <span class="current-page">{{ page }}</span>
    {% elsif page == 1 %}
      <a href="{{ '/blog/' | relative_url }}">{{ page }}</a>
    {% else %}
      <a href="{{ site.paginate_path | relative_url | replace: ':num', page }}">{{ page }}</a>
    {% endif %}
  {% endfor %}

  {% if paginator.next_page %}
    <a href="{{ paginator.next_page_path | relative_url }}">下一頁 &raquo;</a>
  {% endif %}
</div>
{% endif %}