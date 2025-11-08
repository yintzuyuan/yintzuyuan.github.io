---
layout: default.njk
title: Works
description: Type design and development portfolio of TzuYuan Yin
permalink: /en/works/
---

**Type Design · Latin**

<p class="works-inline">
{%- set comma = joiner(" · ") -%}
{%- for project in projects -%}
{%- if "Latin" in project.categories.en -%}
{{ comma() }}<a href="{{ project.url }}" target="_blank" rel="noopener noreferrer">{{ project.title.en }}</a>
{%- endif -%}
{%- endfor -%}
</p>

---

**Type Design · CJK**

<p class="works-inline">
{%- set comma = joiner(" · ") -%}
{%- for project in projects -%}
{%- if "CJK" in project.categories.en -%}
{{ comma() }}<a href="{{ project.url }}" target="_blank" rel="noopener noreferrer">{{ project.title.en }}</a>
{%- endif -%}
{%- endfor -%}
</p>

---

**Glyphs Plugin Development**

<p class="works-inline">
{%- set comma = joiner(" · ") -%}
{%- for project in projects -%}
{%- if "Glyphs Plugins" in project.categories.en -%}
{{ comma() }}<a href="{{ project.url }}" target="_blank" rel="noopener noreferrer">{{ project.title.en }}</a>
{%- endif -%}
{%- endfor -%}
</p>

---

**Translation Projects**

<p class="works-inline">
{%- set comma = joiner(" · ") -%}
{%- for project in projects -%}
{%- if "Translation" in project.categories.en -%}
{{ comma() }}<a href="{{ project.url }}" target="_blank" rel="noopener noreferrer">{{ project.title.en }}</a>
{%- endif -%}
{%- endfor -%}
</p>

---

**Art Projects**

<p class="works-inline">
{%- set comma = joiner(" · ") -%}
{%- for project in projects -%}
{%- if "Art" in project.categories.en -%}
{{ comma() }}<a href="{{ project.url }}" target="_blank" rel="noopener noreferrer">{{ project.title.en }}</a>
{%- endif -%}
{%- endfor -%}
</p>
