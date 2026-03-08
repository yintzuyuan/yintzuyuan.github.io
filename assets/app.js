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
  var icon = document.querySelector('.theme-icon');
  if (icon) {
    icon.className = document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'ph ph-sun theme-icon'
      : 'ph ph-moon theme-icon';
  }
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

function initFadeIn() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(function(el) {
    observer.observe(el);
  });
}

// ===== Mobile Nav =====

function initMobileNav() {
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    a.addEventListener('click', function() {
      var nav = document.querySelector('.nav-links');
      if (nav) nav.classList.remove('show');
    });
  });
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
