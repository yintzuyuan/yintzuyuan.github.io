---
layout: default.njk
title: 作品集
description: TzuYuan Yin 的字體設計與程式作品集
---

# 🗃️ 作品集

<div class="tag-cloud">
  <button class="tag active" data-tag="all">全部</button>
  <button class="tag" data-tag="歐文">歐文</button>
  <button class="tag" data-tag="字體設計">字體設計</button>
  <button class="tag" data-tag="中文">中文</button>
  <button class="tag" data-tag="程式開發">程式開發</button>
  <button class="tag" data-tag="工具">工具</button>
</div>

<div class="works-grid">
{% for project in projects %}
  <a href="{{ project.url }}" class="project-card" data-tags="{{ project.categories | join(',') }}" target="_blank" rel="noopener noreferrer">
    <div class="project-content">
      <h3>{{ project.title }}</h3>
      <p class="tags">{{ project.categories | join(' · ') }}</p>
    </div>
  </a>
{% endfor %}
</div>
