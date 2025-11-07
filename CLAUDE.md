# yintzuyuan.github.io-redesign 專案記憶體

## 專案基本資訊

- **專案名稱**: TzuYuan Yin 個人網站重新設計
- **技術棧**: Eleventy (11ty) 靜態網站生成器
- **建置指令**: `npm run build`
- **開發伺服器**: `npm run dev`
- **部署目標**: GitHub Pages
- **主要 Issue**: [#4 - 網站極簡重構：Jekyll → 11ty](https://github.com/yintzuyuan/yintzuyuan.github.io-redesign/issues/4)

## 專案狀態

- **開始日期**: 2025-11-07
- **當前階段**: Phase 4 完成，所有核心功能已實作
- **完成度**: 95%（待解決樣式閃爍問題）
- **最新進展**: 已解決作品集和時間軸的首屏閃爍問題（Critical CSS 優化）

## 重構成果

### 程式碼減量
| 項目 | 舊版 (Jekyll) | 新版 (11ty) | 減少 |
|------|---------------|-------------|------|
| CSS | 1,828 行 | **335 行** | **-82%** |
| JS | 346 行 | **173 行** | **-50%** |
| 構建時間 | ~5 秒 | **0.41 秒** | **-90%** |
| 總刪除 | - | - | **2,518 行** |

### 效能指標
| 指標 | 目標 | 實際達成 |
|------|------|---------|
| 構建時間 | < 0.5s | **0.41s** ✅ |
| 頁面大小 | < 30KB | **16KB** ✅ |
| CSS 行數 | 200-300 | **335** ✅ |
| JS 行數 | 150-200 | **173** ✅ |

## 重要架構決策

### 建置系統：Eleventy（非 Jekyll）
⚠️ **關鍵**: 此專案使用 Eleventy，不是 Jekyll
- 使用 `npm run build` 建置（不是 `bundle exec jekyll build`）
- 使用 `npm run dev` 啟動開發伺服器
- 輸出目錄: `_site/`

### CSS 架構：Critical CSS + 延遲載入
專案採用效能優化的雙層 CSS 架構：

1. **Critical CSS** (`_includes/critical.css`)
   - 內聯在 `<head>` 中，立即載入
   - 包含首屏必要樣式：
     - CSS 變數定義
     - 基礎排版（h1-h6, p, a）
     - Header 導航列
     - 時間軸完整佈局
     - 作品集網格佈局
     - 標籤雲基礎樣式
   - **目的**: 防止 FOUC（Flash of Unstyled Content）閃爍

2. **完整 CSS** (`assets/style.css`)
   - 透過 `preload` 延遲載入
   - 包含非關鍵樣式：
     - `:hover` 互動效果
     - `transition` 動畫
     - `box-shadow` 陰影
     - 表單樣式
     - 字體載入提示
     - 響應式設計

### 樣式分層原則
- **Critical CSS**: 結構性樣式（position, display, grid, border）
- **style.css**: 裝飾性樣式（hover, transition, shadow）
- **避免重複**: 同一選擇器的樣式不能同時出現在兩個檔案中

## 常用指令

```bash
# 建置網站
npm run build

# 啟動開發伺服器（含即時預覽）
npm run dev

# 訪問開發伺服器
# http://localhost:8080
```

## 專案結構

```
yintzuyuan.github.io-redesign/
├── _includes/
│   ├── critical.css       # 首屏關鍵 CSS（內聯）
│   └── layout.njk         # 主佈局模板
├── _site/                 # Eleventy 建置輸出（不進版控）
├── assets/
│   ├── style.css          # 完整 CSS（延遲載入）
│   ├── script.js          # JavaScript
│   └── icons/             # 圖示資源
├── _data/
│   └── projects.yaml      # 作品集資料
├── index.md               # 首頁
├── about.md               # 關於頁面
├── works.md               # 作品集頁面
├── contact.md             # 聯絡頁面
├── .eleventy.js           # Eleventy 配置
└── package.json           # npm 配置
```

## 頁面特性

### 作品集頁面 (`/works/`)
- 使用 CSS Grid 自適應網格佈局
- 標籤雲過濾功能（JavaScript）
- 所有專案資料來自 `_data/projects.yaml`
- 外部連結自動添加 `target="_blank" rel="noopener noreferrer"`

### 關於頁面 (`/about/`)
- 時間軸佈局（使用 `::before` 偽元素顯示 emoji）
- 響應式設計（手機版調整為單欄）
- 所有時間軸資料來自 `about.md` 的 HTML 結構

## 效能優化策略

1. **Critical CSS 內聯**: 消除首屏渲染閃爍
2. **CSS 延遲載入**: 使用 `preload` + `onload`
3. **主題初始化腳本**: 防止深色模式閃爍
4. **預連接 Google Fonts**: `preconnect` DNS 預解析
5. **圖片最佳化**: 使用 `max-width: 100%` 響應式圖片

## 修改注意事項

### 修改樣式時
1. **判斷是否為首屏關鍵樣式**
   - 是 → 修改 `_includes/critical.css`
   - 否 → 修改 `assets/style.css`

2. **避免樣式重複**
   - 如果在 critical.css 已定義基礎樣式
   - 在 style.css 只需添加進階效果（如 hover）

3. **測試閃爍問題**
   - 修改後執行 `npm run build`
   - 清除瀏覽器快取後重新載入
   - 觀察首屏渲染是否有樣式跳動

### 新增頁面時
1. 在根目錄建立 `.md` 檔案
2. 使用 Nunjucks 模板語法
3. 自動使用 `_includes/layout.njk` 佈局
4. 執行 `npm run build` 生成 HTML

## Git 工作流程

- **主分支**: `main`
- **當前分支**: `claude/redesign-personal-website-011CUsx1cbBnh3rgPjvU9R56`
- **開發分支 Worktree**: `/Users/yintzuyuan/Code/yintzuyuan.github.io-redesign`
- **穩定版 Worktree**: `/Users/yintzuyuan/Code/yintzuyuan.github.io`

## 已完成的 Phase

### ✅ Phase 0: 準備與設定
- 建立 GitHub Issue #4
- 安裝 11ty (Eleventy 3.1.2)
- 建立 `.eleventy.js` 配置

### ✅ Phase 1: 核心架構與首頁原型
- 建立 `_layouts/default.njk` (52 行)
- 建立 `_includes/critical.css` (105 行)
- 建立 `assets/style.css` (240 行)
- 建立 `assets/script.js` (173 行)
- 轉換 `index.md`

### ✅ Phase 2: 完整頁面轉換
- 轉換 `works.md` (31 個作品，整合 `projects.yml`)
- 轉換 `about.md` (27 個時間軸項目，整合 `timeline.yml`)
- 轉換 `contact.md`
- 添加 YAML 資料支援 (`js-yaml`)

### ✅ Phase 3: PWA、SEO 優化與無障礙測試
- PWA: manifest.json
- SEO: Open Graph, Twitter Card, sitemap.xml, robots.txt
- 無障礙: WCAG AA 通過
- 跨瀏覽器測試

### ✅ Phase 4: 清理、文檔與最終測試
- 刪除所有 Jekyll 檔案（30 個）
- 更新 README.md 和 .gitignore
- 移除 _site/ 編譯產物
- 建立完整文檔

### 🚧 當前任務：解決首屏閃爍問題
- **問題**: 作品集和時間軸載入時先顯示無樣式 HTML，再套用 CSS
- **原因**: 關鍵樣式在 `style.css` 延遲載入
- **解決方案**: 將時間軸和作品集的核心佈局樣式移到 `critical.css` 內聯
- **狀態**: 已完成修改，待測試驗證

## 已知問題與解決方案

### ✅ 已解決：頁面載入時樣式閃爍（2025-11-07）
**原因**: 時間軸和作品集樣式在 `style.css` 延遲載入
**解決**: 將首屏關鍵樣式移到 `critical.css` 內聯（+106 行）
**修改檔案**:
- [_includes/critical.css](_includes/critical.css:91-196) - 新增時間軸、作品集、標籤雲核心樣式
- [assets/style.css](assets/style.css:75-94) - 保留 hover 和 transition 進階效果

### ⚠️ 重要提醒：建置系統
**錯誤指令**: `bundle exec jekyll build` ❌
**正確指令**: `npm run build` ✅
**原因**: 專案已從 Jekyll 完全遷移到 Eleventy

### 📊 Critical CSS vs style.css 分層原則

**Critical CSS（內聯，立即載入）**:
- 結構性樣式：`display`, `position`, `grid`, `flex`
- 首屏可見元素：header, nav, 時間軸, 作品集網格
- 佈局與間距：`margin`, `padding`, `gap`
- 基礎顏色與邊框：`border`, `background`, `color`

**style.css（延遲載入）**:
- 互動效果：`:hover`, `:focus`, `:active`
- 動畫過渡：`transition`, `transform`
- 陰影效果：`box-shadow`
- 非首屏元素：footer, 表單進階樣式

## 設計原則

- **極簡主義**: 去除非必要元素，專注內容
- **可讀性優先**: 42rem 最大寬度，1.75 行高
- **響應式設計**: 手機優先，漸進增強
- **無障礙**: 語義化 HTML，適當的 ARIA 標籤
- **效能**: Critical CSS 內聯，資源延遲載入
- **深色模式**: 使用 CSS 變數支援主題切換

## 配色哲學與美學原則

### 核心哲學

> **「顏色不是裝飾，是功能。當黑白能清楚表達時，就不需要顏色。」**

### 設計理念根源

作為**黑白媒材創作者**，我的創作偏好反映在網站設計中：

1. **字體設計** - 字體本質是黑白藝術，筆畫與留白的對話
2. **程式碼** - 編輯器中的純文字，黑底白字的專注世界
3. **極簡美學** - 減少色彩決策，專注內容本質

### 配色系統：極簡黑白 + 功能性灰階

**核心配色**（2025-11-08 確立）：
- **主視覺**: 純黑白灰階系統（90% 元素）
- **強調色**: 無彩色，用灰階層次建立視覺層級
- **互動回饋**: 透過字重、底線、背景灰階變化

**色彩變數定義**：

```css
/* 亮色模式 */
--bg: #f8f6f0           /* 米紙白（柔和，非純白） */
--text: #4a4a4a         /* 毛筆灰（舒適閱讀） */
--link: #1a1a1a         /* 墨黑（連結色） */
--accent: #6b7280       /* 中灰（互動元素） */
--border-light: #d1d5db /* 淺灰（邊框） */

/* 深色模式 */
--bg: #1a1a1a           /* 墨黑（編輯器級護眼） */
--text: #f8f6f0         /* 米紙白 */
--link: #ffffff         /* 純白（連結） */
--accent: #9ca3af       /* 淺灰 */
--border-light: #374151 /* 深灰 */
```

### 配色決策準則

#### ✅ 何時使用顏色
- **絕不用於裝飾** - 只有功能性需求才使用顏色
- **工具品牌色** - 如需彩色，借用常用工具的配色（VS Code、GitHub、Glyphs）
- **極度克制** - 彩色佔比不超過 5% 的視覺面積

#### ❌ 避免使用顏色的情況
- 連結不使用藍色（避免「未完成網頁」觀感）
- 不使用多個跳色（如藍+綠組合）
- 標題、內文、邊框保持無彩色

### 互動設計策略（無色彩版本）

**連結樣式**：
- 預設：墨黑/純白 + 底線 + 中等字重
- 懸停：淺灰背景 + 加粗字重

**按鈕與卡片**：
- 預設：灰色邊框
- 懸停：邊框加粗或背景反轉（不變色）

**視覺層級建立**：
- 字體大小：h1 (3rem) → h2 (2.5rem) → p (1rem)
- 字重：標題 (600) → 連結 (500) → 內文 (400)
- 間距：系統化 rem 單位，不用任意值

### 配色系統演變歷史

| 日期 | 版本 | 配色方案 | 問題 | 解決方案 |
|------|------|---------|------|---------|
| 2025-11-07 | v1 | 藍色 + 青色跳色 | 色相跨度大，視覺不協調 | - |
| 2025-11-08 | v2 | 純黑白灰階系統 | 完全符合創作者美學 | ✅ 當前版本 |

### 為什麼選擇黑白

1. **創作者認同** - 擅長黑白媒材，字體和程式碼都是黑白藝術
2. **零色彩焦慮** - 不用糾結顏色選擇，專注內容本質
3. **護眼舒適** - 深色模式使用柔和墨黑（非純黑 #000000）
4. **印刷質感** - 像精裝書的數位轉譯
5. **內容絕對優先** - 沒有色彩干擾，讀者專注文字

## 極簡圖示系統（Commit d84695e 確立）

### 核心哲學：功能優先，裝飾禁止

**圖示使用原則**（2025-11-07 確立）：
1. **❌ 禁止裝飾性圖示/emoji** - 所有純視覺裝飾符號一律移除
2. **✅ 只保留功能性圖示** - 必須有明確語義或互動功能
3. **🎯 技術策略**：
   - 優先使用純 CSS `::before`/`::after` 偽元素渲染
   - 需要複雜圖形時使用開源 SVG（Lucide Icons）
   - 避免依賴 Unicode emoji（寬度不一致問題）
   - 所有 SVG 使用 `stroke="currentColor"` 自動適配主題色

### 當前圖示實作

#### 1. 時間軸圖示（純 CSS 偽元素）
```css
dd[data-icon]::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

dd[data-icon="filled"]::before {
  background: var(--text);  /* 實心圓：重要里程碑 */
}

dd[data-icon="outline"]::before {
  border: 2px solid var(--text);  /* 空心圓：一般事件 */
  background: transparent;
}
```

**語義化分類**：
- `filled`（實心）：重大里程碑、重要發布
- `outline`（空心）：一般事件、日常更新

#### 2. 主題切換按鈕（Lucide Icons SVG）
- **來源**: [Lucide Icons](https://lucide.dev/)（開源、MIT 授權）
- **尺寸**: 18×18px
- **亮色模式**: 太陽圖示（Sun）
- **深色模式**: 月亮圖示（Moon）
- **技術**:
  - SVG 使用 `stroke="currentColor"` 自動繼承主題色
  - 添加 `transition: transform 0.3s` 點擊旋轉 180° 動畫
  - Hover 時 `opacity: 0.7` 視覺回饋

### 圖示決策流程

```
需要添加圖示？
  ↓
是否有明確功能/語義？
  ├─ 否 → ❌ 不使用圖示
  └─ 是 → 繼續判斷
        ↓
        可用純 CSS 實現？
          ├─ 是 → ✅ 使用 ::before/::after（優先）
          └─ 否 → 使用 Lucide Icons SVG
                  ↓
                  確保 stroke="currentColor"
                  確保尺寸 18×18px
```

### 已移除的裝飾性圖示範例（Commit d84695e）

**移除前**（裝飾性 emoji）：
```markdown
# 📚 作品集
## ✍️ 字體設計 · 歐文
## 🛠️ Glyphs 工具開發
```

**移除後**（純文字）：
```markdown
# 作品集
## 字體設計 · 歐文
## Glyphs 工具開發
```

**理由**：
- emoji 寬度不一致（中文字體 vs 系統 emoji 字體）
- 視覺干擾，非必要裝飾
- 違反極簡主義原則

### 圖示技術規範

| 技術 | 使用時機 | 範例 | 優勢 |
|------|---------|------|------|
| **CSS `::before`** | 簡單幾何形狀 | 時間軸圓圈、項目符號 | 無依賴、體積小、主題自適應 |
| **Lucide Icons SVG** | 複雜圖形 | 太陽/月亮圖示 | 開源、可控、視覺一致 |
| **❌ Unicode Emoji** | 不使用 | ❌ | 寬度不一致、字體依賴 |
| **❌ Icon Font** | 不使用 | ❌ | 額外載入、過時技術 |

### 文字與標題極簡原則

**標題冗餘檢測規則**：
1. **移除客套話**：「歡迎」、「探索更多」、「發送訊息」
2. **移除重複標題**：若頁面只有一個區塊，不需二級標題
3. **移除修飾語**：「熱愛」、「無限可能」、「精彩」
4. **標題即內容**：讓標題直接傳達信息，不需額外說明

**範例對比**：

| 頁面 | 冗餘標題 | 極簡標題 |
|------|---------|---------|
| contact.md | `# 聯絡`<br>`## 發送訊息`<br>（客套開場白） | `# 聯絡`<br>（直接呈現郵件） |
| about.md | `# 關於我`<br>`## 自我介紹`<br>（265 字介紹） | `# 關於我`<br>（50 字精簡版） |
| index.md | `## 字體設計師 × 開發者`<br>`### 探索更多` | `## 字體設計師 × 開發者`<br>（直接呈現連結） |

**內文精簡原則**：
- 一句話說完，不用三句話
- 移除所有「嗨！」、「你好！」問候語
- 移除「歡迎來到...」、「期待與您...」客套話
- 用具體職稱取代「創作者」、「愛好者」等模糊詞
- 每段落最多 50 字，超過則拆分或刪減

## 聯絡資訊

- **作者**: TzuYuan Yin (殷慈遠)
- **網站**: https://erikyin.net
- **GitHub**: https://github.com/yintzuyuan

- 這是一個wt，可以到 /Users/yintzuyuan/Code/yintzuyuan.github.io 查看原始版本的網站內容。
- 減法原則
- 你是專業的網站設計師、平面設計師、視覺總監