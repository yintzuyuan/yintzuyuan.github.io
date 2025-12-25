/**
 * 純 HTML 網站核心腳本
 * 處理 Markdown 渲染、UI 文案填充、動態內容渲染、共用元件注入
 */

(function() {
  'use strict';

  // 取得當前語言與頁面資訊
  const lang = document.documentElement.dataset.lang || 'zh';
  const ui = window.UI_DATA ? window.UI_DATA[lang] : null;
  const basePath = document.documentElement.dataset.basePath || './';
  const currentPage = document.documentElement.dataset.page || 'index.html';

  /**
   * 初始化
   */
  function init() {
    // 0. 注入共用元件（header/footer）
    injectComponents();

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
    initNavToggle();
    initBackToTop();

    // 5. 初始化 Email 混淆保護
    if (window.UI_COMPONENTS && window.UI_COMPONENTS.initEmailProtection) {
      window.UI_COMPONENTS.initEmailProtection();
    }

    // 6. 顯示頁面（消除 FOUC）
    document.body.classList.add('loaded');
  }

  /**
   * 注入共用元件（header/footer）
   */
  function injectComponents() {
    const components = window.UI_COMPONENTS;
    if (!components) return;

    // 注入 header
    const header = document.getElementById('site-header');
    if (header && !header.innerHTML.trim()) {
      header.innerHTML = components.getHeader(lang, currentPage, basePath);
    }

    // 注入 footer
    const footer = document.getElementById('site-footer');
    if (footer && !footer.innerHTML.trim()) {
      footer.innerHTML = components.getFooter(lang, currentPage, basePath);
    }
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
      { key: 'latin', title: { zh: '字型設計 · 歐文', en: 'Type Design · Latin' } },
      { key: 'cjk', title: { zh: '字型設計 · 漢字', en: 'Type Design · CJK' } },
      { key: 'glyphs', title: { zh: 'Glyphs 工具開發', en: 'Glyphs Plugin Development' } },
      { key: 'translation', title: { zh: '翻譯作品', en: 'Translation Projects' } },
      { key: 'art', title: { zh: '藝術創作', en: 'Art Projects' } }
    ];

    // 先過濾出有作品的分類
    const groupsWithContent = categoryGroups.filter(group =>
      window.PROJECTS_DATA.some(p => p.categories.includes(group.key))
    );

    let html = '';
    groupsWithContent.forEach((group, index) => {
      const filtered = window.PROJECTS_DATA.filter(p =>
        p.categories.includes(group.key)
      );

      const links = filtered.map(p =>
        `<a href="${p.url}" target="_blank" rel="noopener noreferrer">${p.title[lang]}</a>`
      ).join(' · ');

      html += `<p><strong>${group.title[lang]}</strong></p>`;
      html += `<p class="works-inline">${links}</p>`;
      // 最後一個分類不加分隔線
      if (index < groupsWithContent.length - 1) {
        html += '<hr>';
      }
    });

    container.innerHTML = html;
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
