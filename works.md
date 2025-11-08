---
layout: default.njk
title: 作品集
description: TzuYuan Yin 的字體設計與程式作品集
lang: zh
locale: zh-TW
---

**字體設計 · 歐文**

<p class="works-inline">
{%- set comma = joiner(" · ") -%}
{%- for project in projects -%}
{%- if "歐文" in project.categories.zh -%}
{{ comma() }}<a href="{{ project.url }}" target="_blank" rel="noopener noreferrer">{{ project.title.zh }}</a>
{%- endif -%}
{%- endfor -%}
</p>

---

**字體設計 · 漢字**

<p class="works-inline">
{%- set comma = joiner(" · ") -%}
{%- for project in projects -%}
{%- if "漢字" in project.categories.zh -%}
{{ comma() }}<a href="{{ project.url }}" target="_blank" rel="noopener noreferrer">{{ project.title.zh }}</a>
{%- endif -%}
{%- endfor -%}
</p>

---

**Glyphs 工具開發**

<p class="works-inline">
{%- set comma = joiner(" · ") -%}
{%- for project in projects -%}
{%- if "Glyphs工具" in project.categories.zh -%}
{{ comma() }}<a href="{{ project.url }}" target="_blank" rel="noopener noreferrer">{{ project.title.zh }}</a>
{%- endif -%}
{%- endfor -%}
</p>

---

**翻譯作品**

<p class="works-inline">
{%- set comma = joiner(" · ") -%}
{%- for project in projects -%}
{%- if "翻譯" in project.categories.zh -%}
{{ comma() }}<a href="{{ project.url }}" target="_blank" rel="noopener noreferrer">{{ project.title.zh }}</a>
{%- endif -%}
{%- endfor -%}
</p>

---

**藝術創作**

<p class="works-inline">
{%- set comma = joiner(" · ") -%}
{%- for project in projects -%}
{%- if "藝術創作" in project.categories.zh -%}
{{ comma() }}<a href="{{ project.url }}" target="_blank" rel="noopener noreferrer">{{ project.title.zh }}</a>
{%- endif -%}
{%- endfor -%}
</p>
