// 共用 UI 文案與元件模板
// 所有頁面透過 app.js 載入此檔案注入 header/footer

window.UI_DATA = {
  zh: {
    // Navigation
    'nav.tools': '工具',
    'nav.works': '作品',
    'nav.writing': '隨筆',
    'nav.about': '關於',

    // Footer
    'footer.tools': '工具',
    'footer.works': '作品',
    'footer.more': '更多',
    'footer.about': '關於',
    'footer.writing': '隨筆',
    'footer.privacy': '隱私政策',
    'footer.terms': '服務條款',
    'footer.allTools': '所有工具',
    'footer.typeDesign': '字型設計',

    // About
    'about.name': '殷慈遠',
    'about.subtitle': 'Type Designer & Developer',
    'support.label': 'Support',
    'support.desc': '如果我的作品或工具對你有幫助，歡迎支持我的創作。',
    'support.ecpay': '綠界 ECPay',

    // Tools
    'tools.page.title': '工具',
    'tools.page.desc': '為 Glyphs 字型設計師打造的外掛、腳本與開發資源。',
    'tools.section.featured': 'Featured',
    'tools.section.plugins': 'Plugins',
    'tools.section.scripts': 'Scripts & Resources',
    'tools.nbv.desc': 'Glyphs 字型編輯器的預覽工具。九宮格即時預覽字符在不同上下文中的效果，加速字型設計迭代。',
    'tools.nbv.f1': '即時預覽',
    'tools.nbv.f2': '九宮格佈局',
    'tools.nbv.f3': '自訂上下文',
    'tools.nbv.f4': '深色模式',
    'tools.nbv.cta': '了解更多',
    'tools.nbv.pricing': '依地區自動調整定價',
    'tools.nbv-free.desc': '免費版九宮格預覽外掛，Glyphs 社群最受歡迎的工具之一。',
    'tools.phonetics.title': '顯示漢語發音',
    'tools.phonetics.desc': '在 Glyphs 編輯器中即時顯示漢字的注音或拼音。',
    'tools.zoom.title': '拉至選取範圍',
    'tools.zoom.desc': '快速縮放至選取的節點或錨點，提升編輯效率。',
    'tools.bopo.title': '注音合字架構系統',
    'tools.bopo.desc': 'Glyphs 注音連字（ligature）的標準化製作範本。',
    'tools.scripts.title': 'Glyphs 腳本集',
    'tools.scripts.desc': '實用的 Glyphs 自動化腳本，涵蓋字符管理、路徑處理等。',
    'tools.stubs.title': 'Glyphs 架構字典檔',
    'tools.stubs.desc': 'Python 型別提示檔，為 Glyphs 腳本開發提供 IDE 自動補全。',
    'tools.gpts.title': 'Glyphs 腳本助手 GPTs',
    'tools.gpts.desc': '基於 ChatGPT 的 Glyphs 腳本撰寫助手。',

    // Works
    'works.page.title': '作品集',
    'works.page.desc': '字型設計、翻譯貢獻與視覺藝術。開發工具請見工具頁。',

    // Writing
    'writing.page.title': '隨筆',
    'writing.page.desc': '關於字型設計、工具開發，以及創作過程中的思考。',
    'newsletter.title': '設計筆記',
    'newsletter.desc': '不定期分享字型設計思考、工具開發心得，以及創作過程中的發現。',
    'newsletter.btn': '訂閱',
    'newsletter.privacy': '不會寄垃圾信，隨時可以退訂。',

    // Article
    'article.back': '所有文章',
    'author.name': '殷慈遠',
    'author.desc': '字型設計師、工具開發者。用工程思維做字，用設計思維寫程式。',
    'nav.prev': '上一篇',
    'nav.next': '下一篇',

    // Index hero
    'hero.title': '殷慈遠',
    'hero.subtitle': 'Type Designer & Developer',
  },
  en: {
    'nav.tools': 'Tools',
    'nav.works': 'Works',
    'nav.writing': 'Writing',
    'nav.about': 'About',

    'footer.tools': 'Tools',
    'footer.works': 'Works',
    'footer.more': 'More',
    'footer.about': 'About',
    'footer.writing': 'Writing',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.allTools': 'All Tools',
    'footer.typeDesign': 'Type Design',

    'about.name': 'TzuYuan Yin',
    'about.subtitle': 'Type Designer & Developer',
    'support.label': 'Support',
    'support.desc': 'If my work or tools have been helpful, consider supporting my creative journey.',
    'support.ecpay': 'ECPay',

    'tools.page.title': 'Tools',
    'tools.page.desc': 'Plugins, scripts, and developer resources for Glyphs type designers.',
    'tools.section.featured': 'Featured',
    'tools.section.plugins': 'Plugins',
    'tools.section.scripts': 'Scripts & Resources',
    'tools.nbv.desc': 'A preview tool for Glyphs. Preview glyphs in a 3\u00d73 grid with real-time context, accelerating type design iteration.',
    'tools.nbv.f1': 'Live Preview',
    'tools.nbv.f2': '3\u00d73 Grid',
    'tools.nbv.f3': 'Custom Context',
    'tools.nbv.f4': 'Dark Mode',
    'tools.nbv.cta': 'Learn More',
    'tools.nbv.pricing': 'Regional pricing available',
    'tools.nbv-free.desc': 'Free 3\u00d73 grid preview plugin, one of the most popular tools in the Glyphs community.',
    'tools.phonetics.title': 'ShowChinesePhonetics',
    'tools.phonetics.desc': 'Display Bopomofo or Pinyin for CJK characters in the Glyphs editor.',
    'tools.zoom.title': 'Zoom to Selection',
    'tools.zoom.desc': 'Quickly zoom to selected nodes or anchors for faster editing.',
    'tools.bopo.title': 'Bopomofo Ligature System',
    'tools.bopo.desc': 'Standardized template for Bopomofo ligature production in Glyphs.',
    'tools.scripts.title': 'Glyphs Scripts',
    'tools.scripts.desc': 'Practical automation scripts for glyph management, path processing, and more.',
    'tools.stubs.title': 'Glyphs Type Stubs',
    'tools.stubs.desc': 'Python type stubs for IDE autocomplete in Glyphs script development.',
    'tools.gpts.title': 'Glyphs Script Assistant GPTs',
    'tools.gpts.desc': 'ChatGPT-based assistant for writing Glyphs scripts.',

    'works.page.title': 'Works',
    'works.page.desc': 'Type design, translations, and visual art. For dev tools, see the Tools page.',

    'writing.page.title': 'Writing',
    'writing.page.desc': 'Thoughts on type design, tool development, and the creative process.',
    'newsletter.title': 'Design Notes',
    'newsletter.desc': 'Occasional thoughts on type design, tool development, and the creative process. Newsletter is in Chinese.',
    'newsletter.btn': 'Subscribe',
    'newsletter.privacy': 'No spam, ever. Unsubscribe anytime.',

    'article.back': 'All posts',
    'author.name': 'TzuYuan Yin',
    'author.desc': 'Type designer & tool developer. Engineering thinking for type, design thinking for code.',
    'nav.prev': 'Previous',
    'nav.next': 'Next',

    'hero.title': 'TzuYuan Yin',
    'hero.subtitle': 'Type Designer & Developer',
  }
};

// 共用元件 HTML 模板
window.UI_COMPONENTS = {
  getHeader: function(currentPage) {
    var navItems = [
      { key: 'tools', href: 'tools.html' },
      { key: 'works', href: 'works.html' },
      { key: 'writing', href: 'writing.html' },
      { key: 'about', href: 'about.html' }
    ];

    var navLinksHTML = navItems.map(function(item) {
      var activeClass = currentPage === item.key ? ' class="active"' : '';
      return '<a href="' + item.href + '"' + activeClass + ' data-i18n="nav.' + item.key + '">' + (window.UI_DATA.zh['nav.' + item.key]) + '</a>';
    }).join('');

    return '<header class="site-header">' +
      '<div class="header-inner">' +
        '<a href="index.html" class="site-logo">\u6BB7\u6148\u9060</a>' +
        '<button class="nav-toggle" aria-label="\u958B\u555F\u9078\u55AE" onclick="document.querySelector(\'.nav-links\').classList.toggle(\'show\')"><i class="ph ph-list"></i></button>' +
        '<nav class="nav-links">' + navLinksHTML + '</nav>' +
        '<div class="header-actions">' +
          '<a href="about.html#support" class="header-btn header-btn-support" aria-label="Support" title="Support"><i class="ph ph-heart"></i></a>' +
          '<button class="header-btn lang-btn" onclick="toggleLang()" aria-label="\u5207\u63DB\u8A9E\u8A00"><span class="lang-label">EN</span></button>' +
          '<button class="header-btn" onclick="toggleTheme()" aria-label="\u5207\u63DB\u6DF1\u6DFA\u8272\u6A21\u5F0F"><i class="ph ph-moon theme-icon"></i></button>' +
        '</div>' +
      '</div>' +
    '</header>';
  },

  getFooter: function() {
    return '<footer class="site-footer">' +
      '<div class="footer-inner">' +
        '<div>' +
          '<div class="footer-brand">\u6BB7\u6148\u9060</div>' +
          '<div class="footer-tagline">Type Designer & Developer</div>' +
        '</div>' +
        '<div class="footer-links">' +
          '<div class="footer-col"><h4 data-i18n="footer.tools">\u5DE5\u5177</h4><a href="tools.html">NineBoxView Pro</a><a href="tools.html" data-i18n="footer.allTools">\u6240\u6709\u5DE5\u5177</a></div>' +
          '<div class="footer-col"><h4 data-i18n="footer.works">\u4F5C\u54C1</h4><a href="works.html" data-i18n="footer.typeDesign">\u5B57\u578B\u8A2D\u8A08</a></div>' +
          '<div class="footer-col"><h4 data-i18n="footer.more">\u66F4\u591A</h4><a href="about.html" data-i18n="footer.about">\u95DC\u65BC</a><a href="writing.html" data-i18n="footer.writing">\u96A8\u7B46</a><a href="privacy.html" data-i18n="footer.privacy">\u96B1\u79C1\u653F\u7B56</a><a href="terms.html" data-i18n="footer.terms">\u670D\u52D9\u689D\u6B3E</a></div>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span class="footer-copyright">&copy; 2026 TzuYuan Yin. All rights reserved.</span>' +
        '<div class="footer-social">' +
          '<a href="https://www.youtube.com/c/erikin1205_typogame" aria-label="YouTube" title="YouTube" target="_blank" rel="noopener"><i class="ph ph-youtube-logo"></i></a>' +
          '<a href="https://www.instagram.com/erikyin/" aria-label="Instagram" title="Instagram" target="_blank" rel="noopener"><i class="ph ph-instagram-logo"></i></a>' +
          '<a href="https://www.facebook.com/erikyin" aria-label="Facebook" title="Facebook" target="_blank" rel="noopener"><i class="ph ph-facebook-logo"></i></a>' +
          '<a href="https://github.com/yintzuyuan" aria-label="GitHub" title="GitHub" target="_blank" rel="noopener"><i class="ph ph-github-logo"></i></a>' +
        '</div>' +
      '</div>' +
    '</footer>';
  }
};
