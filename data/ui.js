// 共用 UI 文案（導覽、頁尾等）
// 編輯此檔案可更新所有頁面的 UI 文案

window.UI_DATA = {
  zh: {
    code: 'zh',
    locale: 'zh-TW',
    name: '繁體中文',
    dir: 'ltr',
    siteDescription: '字型設計師 × 開發者 - TzuYuan Yin 殷慈遠',
    nav: {
      home: '首頁',
      works: '作品集',
      products: '產品',
      about: '關於',
      contact: '聯繫'
    },
    footer: {
      backToTop: '回到頂部',
      privacy: '隱私權政策',
      terms: '服務條款'
    },
    categories: {
      all: '全部',
      '歐文': '歐文',
      '漢字': '漢字',
      '字型設計': '字型設計',
      'Glyphs工具': 'Glyphs工具',
      '工具開發': '工具開發',
      '翻譯': '翻譯',
      '藝術創作': '藝術創作',
      '插畫': '插畫'
    }
  },
  en: {
    code: 'en',
    locale: 'en-US',
    name: 'English',
    dir: 'ltr',
    siteDescription: 'Type Designer × Developer - TzuYuan Yin',
    nav: {
      home: 'Home',
      works: 'Works',
      products: 'Products',
      about: 'About',
      contact: 'Contact'
    },
    footer: {
      backToTop: 'Back to Top',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    },
    categories: {
      all: 'All',
      '歐文': 'Latin',
      '漢字': 'CJK',
      '字型設計': 'Type Design',
      'Glyphs工具': 'Glyphs Plugins',
      '工具開發': 'Development',
      '翻譯': 'Translation',
      '藝術創作': 'Art',
      '插畫': 'Illustration'
    }
  }
};

// 共用元件 HTML 模板
window.UI_COMPONENTS = {
  // 產生 header HTML
  getHeader: function(lang, currentPage, basePath) {
    const ui = window.UI_DATA[lang];
    const otherLang = lang === 'zh' ? 'en' : 'zh';
    const otherLangName = lang === 'zh' ? 'EN' : '中';
    // 中文頁面連到 en/ 子目錄，英文頁面連回上層目錄
    const langSwitchPath = lang === 'zh'
      ? basePath + 'en/' + currentPage
      : basePath + currentPage;

    const navItems = ['home', 'works', 'products', 'about'];
    const navLinks = navItems.map(item => {
      const href = item === 'home' ? './index.html' : './' + item + '.html';
      const isCurrent = (currentPage === 'index.html' && item === 'home') ||
                        currentPage === item + '.html';
      const ariaCurrent = isCurrent ? ' aria-current="page"' : '';
      return `<a href="${href}" data-nav="${item}"${ariaCurrent}>${ui.nav[item]}</a>`;
    }).join('\n        ');

    return `<nav>
      <button class="nav-toggle" aria-label="${lang === 'zh' ? '選單' : 'Menu'}">☰</button>
      <div class="nav-links">
        ${navLinks}
      </div>
      <div style="float:right; display:flex; gap:0.5rem; align-items:center;">
        <a href="${langSwitchPath}" class="lang-switcher" lang="${otherLang}" aria-label="${lang === 'zh' ? '切換語言' : 'Switch Language'}">${otherLangName}</a>
      </div>
    </nav>`;
  },

  // 產生 footer HTML
  getFooter: function(lang) {
    const ui = window.UI_DATA[lang];

    return `<div class="social-links">
      <a href="#" class="email-link" title="Email">
        <i class="ph ph-envelope-simple"></i>
        <i class="ph-bold ph-envelope-simple"></i>
      </a>
      <a href="https://github.com/yintzuyuan" title="GitHub" target="_blank" rel="noopener">
        <i class="ph ph-github-logo"></i>
        <i class="ph-bold ph-github-logo"></i>
      </a>
      <a href="https://www.behance.net/erikyin" title="Behance" target="_blank" rel="noopener">
        <i class="ph ph-behance-logo"></i>
        <i class="ph-bold ph-behance-logo"></i>
      </a>
      <a href="https://www.youtube.com/c/erikin1205_typogame" title="YouTube" target="_blank" rel="noopener">
        <i class="ph ph-youtube-logo"></i>
        <i class="ph-bold ph-youtube-logo"></i>
      </a>
      <a href="https://www.instagram.com/erikyin/" title="Instagram" target="_blank" rel="noopener">
        <i class="ph ph-instagram-logo"></i>
        <i class="ph-bold ph-instagram-logo"></i>
      </a>
    </div>
    <p>© 2025 YTY Digital TypeFoundry · TzuYuan Yin 殷慈遠</p>
    <nav class="legal-links">
      <a href="./privacy.html" data-footer="privacy">${ui.footer.privacy}</a>
      <a href="./terms.html" data-footer="terms">${ui.footer.terms}</a>
    </nav>`;
  },

  // Email 混淆保護初始化
  initEmailProtection: function() {
    document.querySelectorAll('.email-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const user = 'yintzuyuan';
        const domain = 'erikyin.net';
        window.location.href = 'mailto:' + user + '@' + domain;
      });
    });
  }
};
