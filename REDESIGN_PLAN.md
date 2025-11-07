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
| **外部依賴** | Google Fonts (3個字體) | 增加載入時間 |
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
| CSS | 2000+ 行 | **300-400 行** | -80% |
| JavaScript | 348 行 | **100-150 行** | -60% |
| HTML 檔案 | 14 個 | **6-8 個** | -40% |
| 總檔案數 | 30+ | **15 以下** | -50% |

### 2.2 效能指標

| 指標 | 現狀預估 | 目標 |
|------|----------|------|
| 首次內容繪製 (FCP) | ~1.5s | **< 0.8s** |
| 最大內容繪製 (LCP) | ~2.5s | **< 1.5s** |
| 累積佈局偏移 (CLS) | < 0.1 | **< 0.05** |
| 總頁面大小 | ~150KB | **< 50KB** |
| HTTP 請求數 | 8-10 | **< 5** |

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

❌ 捨棄：Google Fonts
✅ 採用：系統字體 + 僅保留核心可變字體

❌ 捨棄：多重 SCSS 模組
✅ 採用：單一 CSS 檔案，使用 CSS 變數統一管理

❌ 捨棄：複雜的 JS 邏輯
✅ 採用：CSS 優先，JS 僅處理必要互動
```

### 3.2 現代 CSS 特性運用

#### **CSS 自訂屬性（變數）**
```css
:root {
  --font-base: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: ui-monospace, Menlo, Monaco, monospace;
  --color-bg: #28262c;
  --color-text: #f5f0e5;
  --space-unit: 1.5rem;
  --max-width: 42rem;
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

### 3.4 字體策略

```
現狀：
- Google Fonts: Noto Sans TC + Fira Code + Noto Emoji (3 個請求)
- 可變字體: Base64 內嵌 17KB

新方案：
- 系統字體堆疊（0KB）
- 可變字體僅在標題載入（延遲載入）
- 移除 emoji 字體（使用系統 emoji）
```

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
  <link rel="stylesheet" href="/style.css">
  <meta name="description" content="創意字型設計與作品展示">
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
  <!-- 1. 關鍵 CSS 內聯 -->
  <style>
    /* 首屏必要樣式（50-100 行）內聯 */
  </style>

  <!-- 2. 延遲載入完整樣式 -->
  <link rel="preload" href="/style.css" as="style" onload="this.rel='stylesheet'">

  <!-- 3. 字體延遲載入 -->
  <link rel="preload" href="/fonts/yintzuyuan.woff2" as="font" crossorigin>

  <!-- 4. JS 延遲執行 -->
  <script src="/script.js" defer></script>
</head>
```

### 7.2 資源壓縮

| 資源 | 原始 | 壓縮後 | 工具 |
|------|------|--------|------|
| CSS | ~400 行 | **< 5KB** | cssnano |
| JS | ~150 行 | **< 3KB** | terser |
| HTML | - | **< 2KB/頁** | html-minifier |
| SVG Logo | 714B | **< 500B** | svgo |
| 字體 | 17KB | **< 12KB** | 僅保留必要字符 |

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
| CSS 行數 | 2000+ | **300-400** | ↓ 80% |
| JS 行數 | 348 | **100-150** | ↓ 60% |
| HTML 檔案 | 14 | **6-8** | ↓ 40% |
| 總檔案數 | 30+ | **< 15** | ↓ 50% |
| 外部依賴 | Jekyll + SCSS | **零依賴** | ↓ 100% |

### 9.2 效能提升

| 指標 | 重構前 | 重構後 | 改善 |
|------|--------|--------|------|
| 首次內容繪製 | ~1.5s | **< 0.8s** | ↑ 47% |
| 頁面大小 | ~150KB | **< 50KB** | ↓ 67% |
| HTTP 請求 | 8-10 | **< 5** | ↓ 50% |
| Lighthouse 分數 | ~85 | **95+** | ↑ 12% |

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

- [ ] CSS 程式碼 ≤ 400 行
- [ ] JavaScript 程式碼 ≤ 150 行
- [ ] 總頁面大小 < 50KB
- [ ] Lighthouse Performance ≥ 95
- [ ] 所有核心功能正常運作
- [ ] 支援 Chrome/Firefox/Safari 最新版
- [ ] 移動端體驗流暢
- [ ] 可變字體互動效果完整保留
- [ ] 深色/淺色主題切換正常
- [ ] 無 JavaScript 錯誤
- [ ] 無 CSS 樣式破版

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

極簡不是目的，而是手段——
透過極簡，我們追求**本質**、**優雅**、**永恆**。

---

**企劃撰寫日期**：2025-11-07
**預計開始執行**：待確認
**預計完成時間**：10 天
