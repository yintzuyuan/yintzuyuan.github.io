/**
 * 主控制器 — Precision Warmth
 * 職責：主題切換、語言切換、元件注入、fade-in、Markdown 渲染
 * 頁面專屬邏輯（timeline、works、essays）放在各頁面 <script> 中
 */

var currentLang = 'zh';

// ===== Theme =====

function initTheme() {
  var t = localStorage.getItem('theme');
  if (t) {
    document.documentElement.setAttribute('data-theme', t);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    t = 'dark';
  }
  requestAnimationFrame(function() { updateThemeIcon(); });
}

function toggleTheme() {
  var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon();
}

function updateThemeIcon() {
  var cls = document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'ph ph-sun theme-icon'
    : 'ph ph-moon theme-icon';
  document.querySelectorAll('.theme-icon').forEach(function(icon) {
    icon.className = cls;
  });
}

// ===== Language =====

function initLang() {
  var l = localStorage.getItem('lang');
  if (l) {
    currentLang = l;
  } else {
    var langs = navigator.languages || [navigator.language || ''];
    var hasZh = langs.some(function(lang) { return /^zh\b/i.test(lang); });
    currentLang = hasZh ? 'zh' : 'en';
  }
  applyLang(currentLang);
}

function toggleLang() {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  applyLang(currentLang);
  localStorage.setItem('lang', currentLang);
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: currentLang } }));
}

function applyLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-TW' : 'en');

  var label = document.querySelector('.lang-label');
  if (label) {
    label.textContent = lang === 'zh' ? 'EN' : '\u4E2D';
  }

  if (!window.UI_DATA) return;
  var data = window.UI_DATA[lang];
  if (!data) return;

  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    var text = data[key];
    if (text) {
      var icons = el.querySelectorAll('i.ph');
      if (icons.length > 0) {
        var textNodes = [];
        el.childNodes.forEach(function(n) {
          if (n.nodeType === Node.TEXT_NODE) textNodes.push(n);
        });
        for (var t = 0; t < textNodes.length; t++) textNodes[t].remove();
        el.insertBefore(document.createTextNode(text + ' '), el.firstChild);
      } else {
        el.textContent = text;
      }
    }
  });
}

// ===== Component Injection =====

function injectComponents() {
  if (!window.UI_COMPONENTS) return;

  var path = window.location.pathname;
  var page = path.substring(path.lastIndexOf('/') + 1).replace('.html', '') || 'index';

  // 使用 DOMParser 安全解析 HTML 模板（來源為受控的 ui.js 靜態模板）
  var parser = new DOMParser();

  var headerSlot = document.getElementById('site-header');
  if (headerSlot) {
    var headerHTML = window.UI_COMPONENTS.getHeader(page);
    var headerDoc = parser.parseFromString(headerHTML, 'text/html');
    var headerEl = headerDoc.body.firstElementChild;
    if (headerEl) {
      headerSlot.replaceWith(headerEl);
    }
  }

  var footerSlot = document.getElementById('site-footer');
  if (footerSlot) {
    var footerHTML = window.UI_COMPONENTS.getFooter();
    var footerDoc = parser.parseFromString(footerHTML, 'text/html');
    var footerEl = footerDoc.body.firstElementChild;
    if (footerEl) {
      footerSlot.replaceWith(footerEl);
    }
  }
}

// ===== Fade-in Animation =====

var fadeObserver = null;

function initFadeIn() {
  document.documentElement.classList.add('js-fade-ready');

  fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        fadeObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(function(el) {
    fadeObserver.observe(el);
  });
}

function observeNewFadeIns(container) {
  if (!fadeObserver) return;
  container.querySelectorAll('.fade-in:not(.visible)').forEach(function(el) {
    fadeObserver.observe(el);
  });
}

// ===== Mobile Nav =====

function initMobileNav() {
  var nav = document.querySelector('.nav-links');
  if (!nav) return;

  // Close dropdown on link click
  nav.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      nav.classList.remove('show');
    });
  });

  // Inject support + theme toggle into mobile dropdown
  if (window.matchMedia('(max-width: 768px)').matches) {
    var actions = document.createElement('div');
    actions.className = 'mobile-actions';

    var supportLink = document.createElement('a');
    supportLink.href = 'about.html#support';
    supportLink.className = 'header-btn header-btn-support';
    supportLink.setAttribute('aria-label', 'Support');
    supportLink.title = 'Support';
    var heartIcon = document.createElement('i');
    heartIcon.className = 'ph ph-heart';
    supportLink.appendChild(heartIcon);

    var themeBtn = document.createElement('button');
    themeBtn.className = 'header-btn header-btn-theme';
    themeBtn.setAttribute('aria-label', '\u5207\u63DB\u6DF1\u6DFA\u8272\u6A21\u5F0F');
    themeBtn.addEventListener('click', function() { toggleTheme(); });
    var themeIcon = document.createElement('i');
    themeIcon.className = 'ph ph-moon theme-icon';
    themeBtn.appendChild(themeIcon);

    actions.appendChild(supportLink);
    actions.appendChild(themeBtn);
    nav.appendChild(actions);

    // Sync icon state with current theme
    updateThemeIcon();
  }
}

// ===== Markdown Rendering (privacy/terms) =====
// 內容來源為頁面內嵌的 <script type="text/markdown"> 標籤（受控的靜態內容）

function renderMarkdown() {
  var mdScript = document.querySelector('script[type="text/markdown"]');
  var container = document.querySelector('.article-body');

  if (mdScript && container && window.marked) {
    var htmlString = marked.parse(mdScript.textContent);
    // 使用 DOMParser 安全解析 marked 輸出（來源為內嵌靜態 Markdown）
    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlString, 'text/html');

    container.replaceChildren();
    while (doc.body.firstChild) {
      container.appendChild(doc.body.firstChild);
    }

    // 外部連結開新分頁
    container.querySelectorAll('a[href^="http"]').forEach(function(link) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }
}

// ===== Rich Text Rendering (about bio) =====

function renderRichText(el, segments) {
  el.replaceChildren();
  for (var i = 0; i < segments.length; i++) {
    var seg = segments[i];
    if (typeof seg === 'string') {
      el.appendChild(document.createTextNode(seg));
    } else {
      var a = document.createElement('a');
      a.href = seg.href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = seg.text;
      el.appendChild(a);
    }
  }
}

// ===== Featured Product (隨機輪換) =====
// tools.html 與 index.html 共用 #featured-product 容器。
// 每次載入頁面隨機從 FEATURED_POOL 挑一個產品，langchange 時更新文案但不重挑。

var FEATURED_POOL = ['nineboxview-pro', 'panda-zhuyin'];

function renderFeaturedProduct() {
  var slot = document.getElementById('featured-product');
  if (!slot || !window.TOOLS_DATA) return;

  // 第一次渲染才挑；後續 langchange 重渲時保留同一產品
  if (!slot.dataset.featuredId) {
    slot.dataset.featuredId = FEATURED_POOL[Math.floor(Math.random() * FEATURED_POOL.length)];
  }
  var id = slot.dataset.featuredId;
  var tool = window.TOOLS_DATA[id];
  if (!tool || !tool.featured) return;

  var i18n = (window.UI_DATA && window.UI_DATA[currentLang]) || {};
  var title = typeof tool.title === 'object' ? (tool.title[currentLang] || tool.title.zh) : tool.title;
  var desc = i18n[tool.featured.descKey] || (typeof tool.desc === 'object' ? (tool.desc[currentLang] || tool.desc.zh) : tool.desc);
  var cta = i18n[tool.featured.ctaKey] || '';

  var existing = slot.querySelector('.product-card');
  var wasVisible = existing && existing.classList.contains('visible');

  var card = document.createElement('a');
  card.href = tool.url;
  card.target = '_blank';
  card.rel = 'noopener';
  card.className = 'product-card fade-in' + (wasVisible ? ' visible' : '');

  var info = document.createElement('div');
  info.className = 'product-info';

  var h3 = document.createElement('h3');
  h3.appendChild(document.createTextNode(title + ' '));
  var badge = document.createElement('span');
  badge.className = 'product-badge';
  badge.textContent = tool.tag;
  h3.appendChild(badge);
  info.appendChild(h3);

  var p = document.createElement('p');
  p.className = 'product-description';
  p.textContent = desc;
  info.appendChild(p);

  var ul = document.createElement('ul');
  ul.className = 'product-features';
  for (var i = 0; i < tool.featured.features.length; i++) {
    var feat = tool.featured.features[i];
    var li = document.createElement('li');
    var fIcon = document.createElement('i');
    fIcon.className = 'ph ' + feat.icon;
    li.appendChild(fIcon);
    li.appendChild(document.createTextNode(' '));
    var fSpan = document.createElement('span');
    fSpan.textContent = i18n[feat.i18nKey] || '';
    li.appendChild(fSpan);
    ul.appendChild(li);
  }
  info.appendChild(ul);

  var footer = document.createElement('div');
  footer.className = 'product-footer';
  footer.appendChild(document.createElement('span'));
  var linkSpan = document.createElement('span');
  linkSpan.className = 'product-link';
  linkSpan.appendChild(document.createTextNode(cta + ' '));
  var arrow = document.createElement('i');
  arrow.className = 'ph ph-arrow-right';
  linkSpan.appendChild(arrow);
  footer.appendChild(linkSpan);

  card.appendChild(info);
  card.appendChild(footer);

  slot.replaceChildren(card);

  if (!wasVisible) observeNewFadeIns(slot);
}

// ===== Init =====

(function() {
  initTheme();

  // 同步偵測語言偏好，確保 inline script 使用正確的 currentLang
  var savedLang = localStorage.getItem('lang');
  if (savedLang) {
    currentLang = savedLang;
  } else {
    var langs = navigator.languages || [navigator.language || ''];
    var hasZh = langs.some(function(lang) { return /^zh\b/i.test(lang); });
    currentLang = hasZh ? 'zh' : 'en';
  }

  function onReady() {
    injectComponents();
    initLang();
    initFadeIn();
    initMobileNav();
    renderMarkdown();
    renderFeaturedProduct();
    // FOUC prevention fallback: reveal after inline scripts have run
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        document.documentElement.classList.remove('js-loading');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

  document.addEventListener('langchange', renderFeaturedProduct);
})();
