# 個人官網極簡化重構企劃

> **專案名稱**：erikyin.net 極簡重構計畫
> **核心理念**：極簡程式碼 × 精緻排版 × 優雅體驗 × 極致效能
> **目標**：用最少的程式碼，呈現最精煉的內容

---

## 一、現狀分析

### 1.1 當前網站複雜度統計

| 項目 | 現狀 | 問題點 |
|------|------|--------|
| **SCSS** | 2000+ 行，15 個檔案 | 過度模組化，大量重複樣式 |
| **JavaScript** | 348 行，2 個檔案 | 功能冗餘，可用 CSS 替代部分 |
| **HTML 組件** | 9 個 includes | 結構過於分散 |
| **外部依賴** | Google Fonts (3個字體) | 載入方式需優化 |
| **可變字體** | Base64 內嵌 (17KB) | 首次載入負擔重 |
| **Jekyll 依賴** | SCSS 編譯、多重模組 | 構建複雜度高 |

### 1.2 核心功能清單

**必須保留**：
- ✅ 可變字重互動效果（核心特色）
- ✅ 深色/淺色主題切換
- ✅ 作品集展示（25 個項目）
- ✅ 時間軸（1988-2025）
- ✅ 響應式設計

**可簡化/移除**：
- ❌ 複雜的漢堡選單動畫
- ❌ 多餘的社交分享按鈕
- ❌ 過度設計的按鈕樣式
- ❌ 表格式導航（改用列表）
- ❌ emoji 圖示（可用 CSS 替代）

---

## 二、極簡化目標

### 2.1 程式碼量目標

| 項目 | 現狀 | 目標 | 減少比例 |
|------|------|------|----------|
| CSS | 2000+ 行 | **300-450 行** | -80% |
| JavaScript | 348 行 | **150-200 行** | -50% |
| HTML 檔案 | 14 個 | **6-8 個** | -40% |
| 總檔案數 | 30+ | **15 以下** | -50% |

*註：JS 行數增加為實現動態字體載入功能（~30 行）*

### 2.2 效能指標

#### **預設載入（系統字體）**
| 指標 | 現狀預估 | 目標 |
|------|----------|------|
| 首次內容繪製 (FCP) | ~1.5s | **< 0.6s** |
| 最大內容繪製 (LCP) | ~2.5s | **< 1.2s** |
| 累積佈局偏移 (CLS) | < 0.1 | **< 0.05** |
| 總頁面大小 | ~150KB | **< 30KB** |
| HTTP 請求數 | 8-10 | **< 5** |
| Lighthouse 效能分數 | ~85 | **98+** |

#### **選擇 Google Fonts 後**
| 指標 | 影響 |
|------|------|
| 首次內容繪製 (FCP) | +0.2-0.4s（字體載入） |
| 總頁面大小 | +60KB（字體） |
| HTTP 請求數 | +2（預連接 + 字體 CSS） |

*註：預設極速載入，用戶可選擇精緻排版（包括統一 emoji 風格）*

### 2.3 設計原則

```
極簡 ≠ 簡陋
極簡 = 每一行程式碼都有存在意義
     = 每一個像素都經過精心考量
     = 零冗餘、高密度、優雅呈現
```

---

## 三、技術方案

### 3.1 核心技術棧

```
❌ 捨棄：Jekyll SCSS 編譯系統
✅ 採用：純 HTML + 原生 CSS + 原生 JavaScript

⚡ 字體策略：預設系統字體，可選 Google Fonts
✅ 優勢：
   - 預設 0KB 極速載入
   - 用戶可選精緻排版（含 Noto Emoji 統一風格）
   - localStorage 記住偏好
   - 不顯眼提示，不干擾閱讀

❌ 捨棄：多重 SCSS 模組
✅ 採用：單一 CSS 檔案，使用 CSS 變數統一管理

❌ 捨棄：複雜的 JS 邏輯
✅ 採用：CSS 優先，JS 僅處理必要互動
   - 主題切換（15 行）
   - 可變字體互動（100 行）
   - 動態字體載入（30 行）
   - 標籤篩選（20 行）
```

### 3.2 現代 CSS 特性運用

#### **CSS 自訂屬性（變數）**
```css
:root {
  /* 預設系統字體堆疊 */
  --font-base: -apple-system, BlinkMacSystemFont, 'Segoe UI',
               'Microsoft JhengHei', 'PingFang TC', sans-serif;
  --font-mono: ui-monospace, Menlo, Monaco, Consolas, monospace;

  /* 顏色系統 */
  --color-bg: #28262c;
  --color-text: #f5f0e5;

  /* 間距系統 */
  --space-unit: 1.5rem;
  --max-width: 42rem;
}

/* Google Fonts 載入後覆蓋 */
body.fonts-loaded {
  --font-base: 'Noto Sans TC', var(--font-base);
  --font-mono: 'Fira Code', var(--font-mono);
}
```

#### **CSS Grid 取代複雜佈局**
```css
/* 作品集網格 - 3行程式碼搞定 */
.works {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-unit);
}
```

#### **CSS `color-scheme` 自動主題**
```css
:root {
  color-scheme: light dark;
}
@media (prefers-color-scheme: dark) {
  /* 自動適配深色模式 */
}
```

#### **CSS `@container` 實現響應式**
```css
/* 取代大量 @media 查詢 */
@container (min-width: 768px) {
  .card { grid-template-columns: 1fr 2fr; }
}
```

### 3.3 JavaScript 策略

**極簡原則**：能用 CSS 就不用 JS

| 功能 | 現狀實現 | 新方案 |
|------|----------|--------|
| 主題切換 | 50 行 JS | **15 行 JS** + `localStorage` |
| 選單開關 | 30 行 JS | **純 CSS** `<details>` 元素 |
| 可變字體互動 | 150 行 JS | **100 行 JS**（保留核心特色） |
| 標籤篩選 | 40 行 JS | **CSS `:target`** 或簡化 JS |
| 外部連結 | 9 行 JS | **移除**（用戶可自行決定） |

### 3.4 字體策略（漸進增強 + 用戶選擇）

```
現狀：
- Google Fonts: Noto Sans TC + Fira Code + Noto Emoji (3 個請求)
- 可變字體: Base64 內嵌 17KB
- 未優化的載入方式
- 強制載入，無法選擇

新方案（效能優先 + 可選精緻排版）：

🎯 核心策略：預設系統字體，可選 Google Fonts

階段 1 - 預設載入（極速）：
✅ 系統字體堆疊（0KB，即時可用）
   - 中文：Microsoft JhengHei, PingFang TC, Noto Sans CJK TC
   - 英文：-apple-system, BlinkMacSystemFont, Segoe UI
   - 等寬：ui-monospace, Menlo, Monaco, Consolas
   - Emoji：系統原生 emoji

階段 2 - 用戶選擇（精緻）：
✅ 不顯眼提示讓用戶選擇載入 Google Fonts
   - 位置：頁面底部或設定區域
   - 文案："載入精緻字體以獲得更好的閱讀體驗"
   - 使用 localStorage 記住選擇

✅ 選擇載入後動態載入：
   - Noto Sans TC (300, 400, 700)
   - Fira Code (400, 700)
   - Noto Emoji（確保 emoji 風格一致性）
   - 使用 font-display: swap
   - 總計約 ~60KB（已優化）

✅ 可變字體優化：
   - 移除 Base64 內嵌，改用 WOFF2 格式
   - 延遲載入（僅首頁標題需要）
   - 精簡字體軸，僅保留必要變化
```

#### **動態字體載入技術詳解**

**步驟 1：預設系統字體堆疊（CSS）**
```css
:root {
  /* 預設使用系統字體（0KB） */
  --font-base:
    -apple-system,           /* macOS/iOS 系統字體 */
    BlinkMacSystemFont,      /* macOS Chrome */
    'Segoe UI',              /* Windows */
    'Microsoft JhengHei',    /* Windows 正黑體 */
    'PingFang TC',           /* macOS 蘋方 */
    'Noto Sans CJK TC',      /* Linux/Android */
    sans-serif;

  --font-mono:
    ui-monospace,            /* 系統等寬字體 */
    'Menlo',                 /* macOS */
    'Monaco',                /* macOS */
    'Consolas',              /* Windows */
    'Liberation Mono',       /* Linux */
    monospace;
}

/* 當 Google Fonts 載入後覆蓋 */
body.fonts-loaded {
  --font-base: 'Noto Sans TC', var(--font-base);
  --font-mono: 'Fira Code', var(--font-mono);
}
```

**步驟 2：不顯眼的字體載入提示（HTML）**
```html
<!-- 頁尾提示 -->
<footer>
  <!-- 其他頁尾內容 -->

  <div id="font-notice" class="font-notice" hidden>
    <span>載入精緻字體以獲得更好的閱讀體驗</span>
    <button id="load-fonts">載入</button>
    <button id="dismiss-notice">不用了</button>
  </div>
</footer>
```

**步驟 3：動態載入 JavaScript（~30 行）**
```javascript
// 檢查用戶偏好
const fontPref = localStorage.getItem('font-preference');

if (fontPref === 'google') {
  loadGoogleFonts();
} else if (!fontPref) {
  // 首次訪問，顯示提示
  document.getElementById('font-notice').hidden = false;
}

// 載入 Google Fonts 函數
function loadGoogleFonts() {
  // 預連接
  const preconnect1 = document.createElement('link');
  preconnect1.rel = 'preconnect';
  preconnect1.href = 'https://fonts.googleapis.com';

  const preconnect2 = document.createElement('link');
  preconnect2.rel = 'preconnect';
  preconnect2.href = 'https://fonts.gstatic.com';
  preconnect2.crossOrigin = 'anonymous';

  // 載入字體
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;700&family=Fira+Code:wght@400;700&family=Noto+Emoji&display=swap';

  document.head.appendChild(preconnect1);
  document.head.appendChild(preconnect2);
  document.head.appendChild(fontLink);

  // 字體載入後添加 class
  fontLink.onload = () => {
    document.body.classList.add('fonts-loaded');
  };
}

// 按鈕事件
document.getElementById('load-fonts').onclick = () => {
  loadGoogleFonts();
  localStorage.setItem('font-preference', 'google');
  document.getElementById('font-notice').hidden = true;
};

document.getElementById('dismiss-notice').onclick = () => {
  localStorage.setItem('font-preference', 'system');
  document.getElementById('font-notice').hidden = true;
};
```

**步驟 4：提示樣式（CSS，~15 行）**
```css
.font-notice {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--bg-secondary);
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  font-size: 0.9rem;
  z-index: 100;
  animation: slideIn 0.3s ease;
}

.font-notice button {
  margin-left: 8px;
  padding: 4px 12px;
  background: var(--accent);
  color: var(--bg);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

**效果對比**：

| 場景 | 載入時間 | 字體大小 | 用戶體驗 |
|------|----------|----------|----------|
| **預設（系統字體）** | **0ms** | **0KB** | 極速顯示 |
| 用戶選擇 Google Fonts | ~800ms | ~60KB | 精緻排版 |

**優勢**：
1. ✅ 預設極速載入（系統字體 0KB）
2. ✅ 保留精緻選項（包括統一 emoji）
3. ✅ 尊重用戶選擇（localStorage 記憶）
4. ✅ 不顯眼提示（不干擾閱讀）
5. ✅ 漸進增強（基礎體驗 → 精緻體驗）

---

## 四、網站架構設計

### 4.1 檔案結構

```
yintzuyuan.github.io/
├── index.html           # 首頁（獨立完整的HTML）
├── works.html           # 作品集
├── about.html           # 關於
├── contact.html         # 聯絡
├── style.css            # 唯一的樣式表 (300-400 行)
├── script.js            # 唯一的腳本 (100-150 行)
├── data/
│   ├── projects.json    # 作品資料
│   └── timeline.json    # 時間軸資料
├── fonts/
│   └── yintzuyuan.woff2 # 可變字體（僅必要軸）
└── assets/
    └── logo.svg         # Logo（已有）
```

**移除**：
- ❌ `_layouts/`
- ❌ `_includes/`
- ❌ `_sass/` (15 個檔案)
- ❌ `_site/`
- ❌ `Gemfile`, `_config.yml`
- ❌ `clean_jekyll_port.py`

### 4.2 HTML 結構模板

#### **極簡語義化結構**
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>殷慈遠</title>

  <!-- 關鍵 CSS 內聯（首屏樣式） -->
  <style>
    /* 首屏必要樣式 50-100 行，預設系統字體 */
  </style>

  <link rel="stylesheet" href="/style.css">
  <meta name="description" content="創意字型設計與作品展示">

  <!-- 注意：Google Fonts 由用戶選擇後動態載入 -->
</head>
<body>
  <header>
    <a href="/" class="logo">殷慈遠</a>
    <nav>
      <a href="/works">作品</a>
      <a href="/about">關於</a>
      <a href="/contact">聯絡</a>
    </nav>
    <button id="theme-toggle" aria-label="切換主題">◐</button>
  </header>

  <main>
    <!-- 頁面內容 -->
  </main>

  <footer>
    <a href="https://youtube.com/@erikin1205">YouTube</a>
    <a href="https://github.com/yintzuyuan">GitHub</a>
    <a href="https://behance.net/erikyin">Behance</a>
  </footer>

  <script src="/script.js"></script>
</body>
</html>
```

**重點**：
- 零冗餘標籤
- 語義化標籤（`<header>`, `<main>`, `<nav>`, `<footer>`）
- 無 wrapper div
- 無 CSS class 濫用

### 4.3 頁面設計

#### **首頁 (index.html)**
```
┌─────────────────────────────────┐
│  [殷慈遠]    作品 關於 聯絡  ◐   │ ← 固定導航
├─────────────────────────────────┤
│                                 │
│          殷 慈 遠               │ ← 可變字重標題
│     [互動式字體效果]             │
│                                 │
│  嗨，你好，這是我的名片            │
│  → 作品集展示我的作品             │
│  → 關於頁了解我是誰              │
│  → 字碼筆記堆砌知識              │
│  → 和我聯繫                     │
│                                 │
└─────────────────────────────────┘
```

#### **作品集 (works.html)**
```
極簡標籤篩選：
[全部] [字體設計] [工具開發] [藝術創作]

網格展示：
┌────────┬────────┬────────┐
│ Prism  │ ERKN   │ Jonah  │
│ 歐文字體 │ 歐文字體 │ 歐文字體 │
└────────┴────────┴────────┘
```

#### **關於 (about.html)**
```
個人介紹 (精簡 2-3 段)
     ↓
垂直時間軸（極簡線條設計）
```

#### **聯絡 (contact.html)**
```
中央對齊：
  Email: erikyin@example.com
  [發送訊息] → mailto 連結
  或使用簡單表單
```

---

## 五、樣式系統設計

### 5.1 CSS 架構（單檔案 300-400 行）

```css
/* ===== 1. CSS 變數 (30 行) ===== */
:root {
  /* 顏色系統 */
  --bg: #28262c;
  --text: #f5f0e5;
  --accent: #fff;

  /* 間距系統 */
  --space-xs: 0.5rem;
  --space-s: 1rem;
  --space-m: 1.5rem;
  --space-l: 3rem;

  /* 字體系統 */
  --font-base: -apple-system, sans-serif;
  --font-title: 'yintzuyuan', var(--font-base);

  /* 佈局 */
  --max-width: 42rem;
}

/* ===== 2. 重置樣式 (20 行) ===== */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
}

/* ===== 3. 基礎排版 (40 行) ===== */
body {
  font-family: var(--font-base);
  line-height: 1.6;
  color: var(--text);
  background: var(--bg);
}

/* ===== 4. 佈局組件 (60 行) ===== */
header { /* 導航列 */ }
main { /* 主內容 */ }
footer { /* 頁尾 */ }

/* ===== 5. 頁面專用樣式 (100 行) ===== */
.variable-title { /* 可變字體效果 */ }
.works-grid { /* 作品網格 */ }
.timeline { /* 時間軸 */ }

/* ===== 6. 互動狀態 (30 行) ===== */
a:hover { }
button:focus { }

/* ===== 7. 響應式 (20 行) ===== */
@media (max-width: 768px) {
  /* 移動端調整 */
}
```

### 5.2 主題切換實現

**CSS**：
```css
/* 預設深色 */
:root {
  --bg: #28262c;
  --text: #f5f0e5;
}

/* 淺色主題 */
[data-theme="light"] {
  --bg: #f5f0e5;
  --text: #45424a;
}

/* 平滑過渡 */
body {
  transition: background-color 0.3s, color 0.3s;
}
```

**JS** (15 行)：
```javascript
const toggle = document.getElementById('theme-toggle');
const saved = localStorage.getItem('theme') || 'dark';
document.documentElement.dataset.theme = saved;

toggle.addEventListener('click', () => {
  const current = document.documentElement.dataset.theme;
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
});
```

### 5.3 可變字體互動（核心特色保留）

**簡化策略**：
```javascript
// 現狀：150 行複雜邏輯
// 目標：100 行精簡版

// 保留功能：
// ✅ 滑鼠追蹤控制字體軸
// ✅ 自動動畫（閒置時）
// ❌ 移除：字體隨機選擇（簡化為單一字體）
// ❌ 移除：觸摸設備檢測（統一體驗）
```

---

## 六、內容規劃

### 6.1 保留的核心內容

#### **作品集（25 個項目）**
**資料結構簡化**：
```json
{
  "projects": [
    {
      "title": "Prism",
      "url": "https://behance.net/...",
      "tags": ["歐文", "字體設計"],
      "year": 2013
    }
  ]
}
```

**展示方式**：
- 網格卡片（圖片 + 標題 + 標籤）
- 標籤篩選（簡化為 4-5 個主分類）
- 移除複雜的標籤雲

#### **時間軸（1988-2025）**
**保留**：
- 年份 + 圖示 + 事件描述
- 垂直線條設計

**簡化**：
- 移除過度動畫
- 精簡 CSS（從 timeline.scss 的複雜設計簡化為 20 行）

### 6.2 導航簡化

**現狀**：表格式導航 + emoji
```markdown
| 🙂 | 嗨，你好，這是我的名片 |
| 🗃️ | 這本作品集展示了我的作品 |
```

**新方案**：簡潔列表
```html
<ul>
  <li>嗨，你好，這是我的名片</li>
  <li><a href="/works">作品集</a>展示了我的作品</li>
  <li>從<a href="/about">關於</a>了解我是誰</li>
  <li>透過<a href="https://blog.erikyin.net">字碼筆記</a>堆砌知識</li>
  <li>有任何建議請<a href="/contact">和我聯繫</a></li>
</ul>
```

---

## 七、效能優化策略

### 7.1 關鍵渲染路徑優化

```html
<head>
  <!-- 1. 關鍵 CSS 內聯（最優先，含系統字體） -->
  <style>
    /* 首屏必要樣式（50-100 行）
       - CSS 變數定義
       - 系統字體堆疊
       - 基礎佈局
       - 導航樣式
    */
  </style>

  <!-- 2. 延遲載入完整樣式 -->
  <link rel="preload" href="/style.css" as="style" onload="this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/style.css"></noscript>

  <!-- 3. 可變字體預載入（僅首頁） -->
  <link rel="preload" href="/fonts/yintzuyuan.woff2" as="font" type="font/woff2" crossorigin>

  <!-- 4. JS 延遲執行（含動態字體載入） -->
  <script src="/script.js" defer></script>

  <!-- 注意：Google Fonts 不在初始載入，由用戶選擇後動態載入 -->
</head>
```

**載入順序邏輯**：
```
頁面載入 (0ms)
  ↓
內聯 CSS 生效 (立即，系統字體)
  ↓
頁面可見、可互動 (< 600ms)
  ↓
完整 CSS 載入完成 (< 800ms)
  ↓
顯示字體載入提示 (首次訪問)
  ↓
[用戶選擇] → 動態載入 Google Fonts (可選)
```

### 7.2 資源壓縮

| 資源 | 原始 | 壓縮後 | 工具/策略 |
|------|------|--------|----------|
| CSS | ~450 行 | **< 6KB** | cssnano（含字體提示樣式） |
| JS | ~200 行 | **< 4KB** | terser（含動態字體載入） |
| HTML | - | **< 2KB/頁** | html-minifier |
| SVG Logo | 714B | **< 500B** | svgo |
| 可變字體 | 17KB | **< 12KB** | 僅保留必要字符/軸 |
| Google Fonts | ~90KB | **0KB（預設）** | 用戶選擇後動態載入 ~60KB |

**首次載入總大小**：
- 預設（系統字體）：**< 25KB**
- 選擇 Google Fonts 後：**< 85KB**

### 7.3 快取策略

```html
<!-- Service Worker 離線快取（選用） -->
<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
</script>
```

---

## 八、實施步驟

### Phase 1：基礎架構（第 1-2 天）
1. ✅ 建立新分支：`redesign-minimal`
2. ✅ 建立基礎檔案結構
3. ✅ 撰寫核心 HTML 模板
4. ✅ 建立 CSS 變數系統

### Phase 2：樣式系統（第 3-4 天）
1. ✅ 實現主題切換（CSS + 15 行 JS）
2. ✅ 建立排版系統（字體、間距、顏色）
3. ✅ 實現響應式佈局
4. ✅ 完成導航與頁尾

### Phase 3：頁面實現（第 5-7 天）
1. ✅ 首頁 + 可變字體互動
2. ✅ 作品集頁 + 標籤篩選
3. ✅ 關於頁 + 時間軸
4. ✅ 聯絡頁

### Phase 4：優化與測試（第 8-9 天）
1. ✅ 效能優化（壓縮、延遲載入）
2. ✅ 跨瀏覽器測試
3. ✅ 無障礙檢查
4. ✅ 移動端體驗優化

### Phase 5：部署上線（第 10 天）
1. ✅ 本地測試完整流程
2. ✅ 提交至 GitHub
3. ✅ GitHub Pages 部署
4. ✅ 驗證線上版本

---

## 九、預期成果

### 9.1 程式碼對比

| 項目 | 重構前 | 重構後 | 改善 |
|------|--------|--------|------|
| CSS 行數 | 2000+ | **300-450** | ↓ 80% |
| JS 行數 | 348 | **150-200** | ↓ 50% |
| HTML 檔案 | 14 | **6-8** | ↓ 40% |
| 總檔案數 | 30+ | **< 15** | ↓ 50% |
| 外部依賴 | Jekyll + SCSS | **零依賴** | ↓ 100% |

### 9.2 效能提升

#### **預設載入（系統字體）**
| 指標 | 重構前 | 重構後 | 改善 |
|------|--------|--------|------|
| 首次內容繪製 | ~1.5s | **< 0.6s** | ↑ 60% |
| 頁面大小 | ~150KB | **< 25KB** | ↓ 83% |
| HTTP 請求 | 8-10 | **< 5** | ↓ 50% |
| Lighthouse 分數 | ~85 | **98+** | ↑ 15% |

#### **選擇 Google Fonts 後**
| 指標 | 數值 | 說明 |
|------|------|------|
| 首次內容繪製 | **< 1.0s** | 動態載入不阻塞渲染 |
| 頁面大小 | **< 85KB** | 仍比原版輕 43% |
| Lighthouse 分數 | **95+** | 優化策略確保高分 |

**優勢總結**：
- ✅ 預設極速體驗（Lighthouse 98+）
- ✅ 保留精緻選項（含統一 emoji 風格）
- ✅ 用戶自主選擇（localStorage 記憶）
- ✅ 兩全其美方案

### 9.3 維護性改善

```
✅ 無需 Jekyll 構建環境
✅ 無需 Ruby/Gem 依賴
✅ 純靜態檔案，任意伺服器可部署
✅ 程式碼可讀性提升
✅ 修改成本降低 80%
```

---

## 十、風險評估與備案

### 10.1 可能風險

| 風險 | 影響 | 應對方案 |
|------|------|----------|
| 可變字體不支援舊瀏覽器 | 中 | 提供系統字體降級方案 |
| 移除 Jekyll 後部署問題 | 低 | GitHub Pages 支援純靜態 |
| 內容遷移資料遺失 | 中 | 保留完整備份分支 |
| 極簡設計用戶不適應 | 低 | 保留核心功能與體驗 |

### 10.2 回退策略

```bash
# 保留原始分支
git branch backup/original-design

# 新分支開發
git checkout -b redesign-minimal

# 如需回退
git checkout backup/original-design
```

---

## 十一、成功標準

### 完成條件（必須全部達成）

#### **程式碼品質**
- [ ] CSS 程式碼 ≤ 450 行
- [ ] JavaScript 程式碼 ≤ 200 行
- [ ] 程式碼可讀性高，註解清楚

#### **效能指標**
- [ ] 預設載入（系統字體）總頁面大小 < 30KB
- [ ] Lighthouse Performance ≥ 98（預設）/ ≥ 95（Google Fonts）
- [ ] 首次內容繪製 < 0.6s（預設）/ < 1.0s（Google Fonts）

#### **功能完整性**
- [ ] 所有核心功能正常運作
- [ ] 可變字體互動效果完整保留
- [ ] 深色/淺色主題切換正常
- [ ] 動態字體載入功能正常
- [ ] 字體選擇偏好正確記憶
- [ ] 字體載入提示顯示/隱藏正常

#### **瀏覽器相容性**
- [ ] 支援 Chrome/Firefox/Safari 最新版
- [ ] 移動端體驗流暢
- [ ] 無 JavaScript 錯誤
- [ ] 無 CSS 樣式破版

#### **用戶體驗**
- [ ] 字體載入提示不顯眼、不干擾
- [ ] 系統字體 → Google Fonts 切換平滑
- [ ] emoji 風格統一（選擇 Google Fonts 後）
- [ ] 所有頁面載入速度快

---

## 十二、附錄

### A. CSS 命名規範

```css
/* BEM 精簡版（僅必要時使用） */
.block { }
.block__element { }
.block--modifier { }

/* 優先使用語義化標籤 */
header, nav, main, article, footer
```

### B. Git Commit 規範

```
feat: 新增首頁可變字體互動
refactor: 簡化 CSS 變數系統
perf: 優化字體載入策略
fix: 修正移動端選單問題
docs: 更新重構企劃文件
```

### C. 瀏覽器支援清單

| 瀏覽器 | 最低版本 | 備註 |
|--------|----------|------|
| Chrome | 90+ | 完整支援 |
| Firefox | 88+ | 完整支援 |
| Safari | 14+ | 完整支援 |
| Edge | 90+ | 完整支援 |
| 移動端 | iOS 14+, Android 90+ | 完整支援 |

---

## 結語

這不是一次簡單的改版，而是一次**重新思考**：

> 什麼是真正重要的？
> 什麼是可以捨棄的？
> 如何用最少的程式碼，創造最大的價值？
> 如何在效能與美感之間取得平衡？
> 如何尊重用戶的選擇權？

極簡不是目的，而是手段——
透過極簡，我們追求**本質**、**優雅**、**永恆**。

**本次重構的核心理念**：

1. **效能優先**：預設極速載入（< 0.6s，25KB）
2. **漸進增強**：基礎體驗完整，精緻選項可選
3. **尊重用戶**：字體選擇權交給用戶，偏好記憶
4. **美感不妥協**：提供 Google Fonts 選項（含統一 emoji）
5. **極簡精神**：每一行程式碼都有明確目的

這是一個**兩全其美**的方案：
- 追求效能的用戶：享受極速體驗
- 追求美感的用戶：享受精緻排版
- 所有用戶：都能自主選擇，都受到尊重

---

**企劃撰寫日期**：2025-11-07
**預計開始執行**：待確認
**預計完成時間**：10 天
