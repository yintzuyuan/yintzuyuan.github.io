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
      availableIn: '此頁面也有其他語言版本：',
      backToTop: '回到頂部',
      privacy: '隱私權政策',
      terms: '服務條款'
    },
    theme: {
      toggle: '切換主題'
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
      availableIn: 'Also available in:',
      backToTop: 'Back to Top',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    },
    theme: {
      toggle: 'Toggle Theme'
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
  // 主題切換圖示
  icons: {
    sun: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
    moon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>'
  },

  // 產生 header HTML
  getHeader: function(lang, currentPage, basePath) {
    const ui = window.UI_DATA[lang];
    const otherLang = lang === 'zh' ? 'en' : 'zh';
    const otherLangName = lang === 'zh' ? 'EN' : '中文';
    // 中文頁面連到 en/ 子目錄，英文頁面連回上層目錄
    const langSwitchPath = lang === 'zh'
      ? basePath + 'en/' + currentPage
      : basePath + currentPage;

    const navItems = ['home', 'works', 'products', 'about', 'contact'];
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
        <button data-theme-toggle aria-label="${ui.theme.toggle}" style="background:none; border:1px solid var(--border); color:var(--text); padding:0.5rem; cursor:pointer; border-radius:4px; line-height:0;">
          ${this.icons.sun}
        </button>
      </div>
    </nav>`;
  },

  // 產生 footer HTML
  getFooter: function(lang, currentPage, basePath) {
    const ui = window.UI_DATA[lang];
    const otherLang = lang === 'zh' ? 'en' : 'zh';
    const otherLangFullName = lang === 'zh' ? 'English' : '繁體中文';
    // 中文頁面連到 en/ 子目錄，英文頁面連回上層目錄
    const langSwitchPath = lang === 'zh'
      ? basePath + 'en/' + currentPage
      : basePath + currentPage;
    const privacyPath = './privacy.html';
    const termsPath = './terms.html';

    return `<p class="lang-info">
      <span data-footer="availableIn">${ui.footer.availableIn}</span>
      <a href="${langSwitchPath}" lang="${otherLang}">${otherLangFullName}</a>
    </p>
    <p>© 2025 YTY Digital TypeFoundry · TzuYuan Yin 殷慈遠</p>
    <nav class="legal-links">
      <a href="${privacyPath}" data-footer="privacy">${ui.footer.privacy}</a>
      <a href="${termsPath}" data-footer="terms">${ui.footer.terms}</a>
    </nav>`;
  }
};
