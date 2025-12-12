/**
 * 純 HTML 網站核心腳本
 * 處理 Markdown 渲染、UI 文案填充、動態內容渲染
 */

(function() {
  'use strict';

  // 取得當前語言
  const lang = document.documentElement.dataset.lang || 'zh';
  const ui = window.UI_DATA ? window.UI_DATA[lang] : null;

  /**
   * 初始化
   */
  function init() {
    // 1. 渲染 Markdown 內容
    renderMarkdown();

    // 2. 填充 UI 文案
    if (ui) {
      fillUIText();
    }

    // 3. 渲染動態內容
    renderTimeline();
    renderWorks();

    // 4. 初始化互動功能
    initThemeToggle();
    initNavToggle();
    initBackToTop();
  }

  /**
   * 渲染 Markdown 內容
   */
  function renderMarkdown() {
    const mdScript = document.getElementById('page-content');
    const container = document.getElementById('main-content');

    if (mdScript && container && window.marked) {
      const md = mdScript.textContent;
      container.innerHTML = marked.parse(md);

      // 為所有外部連結添加 target="_blank"
      container.querySelectorAll('a[href^="http"]').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });
    }
  }

  /**
   * 填充 UI 文案
   */
  function fillUIText() {
    // 導覽列
    document.querySelectorAll('[data-nav]').forEach(el => {
      const key = el.dataset.nav;
      if (ui.nav && ui.nav[key]) {
        el.textContent = ui.nav[key];
      }
    });

    // 頁尾
    document.querySelectorAll('[data-footer]').forEach(el => {
      const key = el.dataset.footer;
      if (ui.footer && ui.footer[key]) {
        el.textContent = ui.footer[key];
      }
    });

    // 通用 i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const path = el.dataset.i18n.split('.');
      let value = ui;
      for (const key of path) {
        value = value ? value[key] : null;
      }
      if (value) {
        el.textContent = value;
      }
    });
  }

  /**
   * 渲染時間軸（關於頁面）
   */
  function renderTimeline() {
    const container = document.getElementById('timeline-content');
    if (!container || !window.TIMELINE_DATA) return;

    let html = '<dl>';
    for (const item of window.TIMELINE_DATA) {
      if (item.year) {
        html += `<dt><strong>${item.year}</strong></dt>`;
      }
      for (const event of item.events) {
        const text = event.text[lang];
        // 使用 marked.parseInline 處理行內 Markdown（如連結）
        const parsed = window.marked ? marked.parseInline(text) : text;
        html += `<dd data-icon="${event.icon}">${parsed}</dd>`;
      }
    }
    html += '</dl>';
    container.innerHTML = html;
  }

  /**
   * 渲染作品列表（作品集頁面）
   */
  function renderWorks() {
    const container = document.getElementById('works-content');
    if (!container || !window.PROJECTS_DATA) return;

    const categoryGroups = [
      { key: '歐文', title: { zh: '字型設計 · 歐文', en: 'Type Design · Latin' } },
      { key: '漢字', title: { zh: '字型設計 · 漢字', en: 'Type Design · CJK' } },
      { key: 'Glyphs工具', title: { zh: 'Glyphs 工具開發', en: 'Glyphs Plugin Development' } },
      { key: '翻譯', title: { zh: '翻譯作品', en: 'Translation Projects' } },
      { key: '藝術創作', title: { zh: '藝術創作', en: 'Art Projects' } }
    ];

    let html = '';
    for (const group of categoryGroups) {
      const filtered = window.PROJECTS_DATA.filter(p =>
        p.categories[lang].includes(group.key) ||
        p.categories.zh.includes(group.key)
      );

      if (filtered.length === 0) continue;

      const links = filtered.map(p =>
        `<a href="${p.url}" target="_blank" rel="noopener noreferrer">${p.title[lang]}</a>`
      ).join(' · ');

      html += `<p><strong>${group.title[lang]}</strong></p>`;
      html += `<p class="works-inline">${links}</p>`;
      html += '<hr>';
    }

    container.innerHTML = html;
  }

  /**
   * 主題切換
   */
  function initThemeToggle() {
    const btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;

    const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
    const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>';

    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      btn.innerHTML = next === 'dark' ? moonIcon : sunIcon;
    });

    // 初始化按鈕圖示
    btn.innerHTML = localStorage.getItem('theme') === 'dark' ? moonIcon : sunIcon;
  }

  /**
   * 導覽列收合（行動裝置）
   */
  function initNavToggle() {
    const toggle = document.querySelector('.nav-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function() {
      const navLinks = this.nextElementSibling;
      if (navLinks) {
        navLinks.classList.toggle('show');
      }
    });
  }

  /**
   * 回到頂部按鈕
   */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > window.innerHeight) {
        btn.style.opacity = '1';
        btn.style.visibility = 'visible';
      } else {
        btn.style.opacity = '0';
        btn.style.visibility = 'hidden';
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // DOM 載入完成後初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
