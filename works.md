---
layout: default.njk
title: 作品集
description: TzuYuan Yin 的字體設計與程式作品集
---

# 🗃️ 作品集

## 🔤 字體設計 · 歐文

<ul>
{% for project in projects %}
  {% if "歐文" in project.categories %}
  <li><a href="{{ project.url }}" target="_blank" rel="noopener noreferrer">{{ project.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

## 🀄 字體設計 · 漢字

<ul>
{% for project in projects %}
  {% if "漢字" in project.categories %}
  <li><a href="{{ project.url }}" target="_blank" rel="noopener noreferrer">{{ project.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>

## 🛠️ Glyphs 工具開發

<ul>
{% for project in projects %}
  {% if "Glyphs工具" in project.categories %}
  <li><a href="{{ project.url }}" target="_blank" rel="noopener noreferrer">{{ project.title }}</a> <small>({{ project.categories | join(' · ') }})</small></li>
  {% endif %}
{% endfor %}
</ul>

## 🌐 翻譯作品

<ul>
{% for project in projects %}
  {% if "翻譯" in project.categories %}
  <li><a href="{{ project.url }}" target="_blank" rel="noopener noreferrer">{{ project.title }}</a> <small>({{ project.categories | join(' · ') }})</small></li>
  {% endif %}
{% endfor %}
</ul>

## 🎨 藝術創作

<ul>
{% for project in projects %}
  {% if "藝術創作" in project.categories %}
  <li><a href="{{ project.url }}" target="_blank" rel="noopener noreferrer">{{ project.title }}</a> <small>({{ project.categories | join(' · ') }})</small></li>
  {% endif %}
{% endfor %}
</ul>
