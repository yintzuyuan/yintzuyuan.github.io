// 文章清單資料
// writing.html 載入此檔案渲染文章列表
// writing-post.html 載入此檔案查詢文章 metadata

window.ESSAYS_DATA = [
  {
    slug: 'engineering-thinking',
    date: '2026.03',
    title: {
      zh: '字型設計中的工程思維',
      en: 'Engineering Thinking in Type Design'
    },
    excerpt: {
      zh: '當我們談論「精確」，在字型設計的語境下意味著什麼？從筆畫粗細的一致性到曲線張力的控制，工程思維如何影響我的設計決策。',
      en: 'What does "precision" mean in the context of type design?'
    },
    tags: ['Design', 'Thinking']
  },
  {
    slug: 'code-aided-type-design',
    date: '2026.02',
    title: {
      zh: '為什麼我用程式碼輔助字型設計',
      en: 'Why I Use Code to Aid Type Design'
    },
    excerpt: {
      zh: '從手動調整到腳本自動化，一個字型設計師的工具演進之路。當重複的工作交給程式，設計師就能專注在真正需要判斷力的地方。',
      en: 'From manual adjustments to script automation.'
    },
    tags: ['Python', 'Workflow']
  },
  {
    slug: 'glyphs-plugin-dev',
    date: '2026.01',
    title: {
      zh: 'Glyphs 外掛開發入門',
      en: 'Getting Started with Glyphs Plugin Development'
    },
    excerpt: {
      zh: '分享開發 NineBoxView Pro 過程中的技術選擇與設計考量。從 Python callback 到 Cocoa UI，一個字型設計師如何跨入軟體開發。',
      en: 'Technical choices and design considerations from developing NineBoxView Pro.'
    },
    tags: ['Glyphs', 'Dev']
  },
  {
    slug: 'cjk-math-beauty',
    date: '2025.12',
    title: {
      zh: '漢字結構的數學之美',
      en: 'The Mathematical Beauty of CJK Structure'
    },
    excerpt: {
      zh: '探索筆畫比例、重心平衡與視覺修正背後的幾何邏輯。為什麼「看起來對」的字，往往不是數學上完美對稱的？',
      en: 'Exploring the geometric logic behind stroke proportions and visual corrections.'
    },
    tags: ['CJK', 'Design']
  }
];
