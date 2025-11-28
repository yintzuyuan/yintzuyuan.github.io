# erikyin.net - 個人作品集網站

TzuYuan Yin（殷慈遠）的個人作品集網站，展示字型設計與程式開發作品。

## 技術架構

- **靜態網站生成器**: [Eleventy (11ty)](https://www.11ty.dev/) v3.1.2
- **模板引擎**: Nunjucks
- **內容格式**: Markdown + YAML Front Matter
- **資料格式**: YAML（`_data/` 目錄）
- **部署**: GitHub Pages
- **域名**: [erikyin.net](https://erikyin.net)

## 專案結構

```
.
├── _data/              # YAML 資料檔案
│   ├── projects.yml    # 作品集資料
│   └── timeline.yml    # 時間軸資料
├── _includes/          # Nunjucks 部分模板
│   └── critical.css    # 關鍵 CSS（內聯）
├── _layouts/           # 頁面佈局模板
│   └── default.njk     # 預設佈局
├── assets/             # 靜態資源
│   ├── style.css       # 主樣式表
│   ├── script.js       # JavaScript
│   └── icons/          # PWA 圖示
├── docs/               # 文檔
│   └── REDESIGN_PLAN.md # 重構計劃
├── fonts/              # 字型檔案
├── *.md                # Markdown 頁面
├── .eleventy.js        # 11ty 配置
├── manifest.json       # PWA manifest
├── robots.txt          # 搜尋引擎指令
└── sitemap.njk         # 網站地圖模板
```

## 本機開發

### 安裝依賴

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

開發伺服器會在 `http://localhost:8081` 啟動，並自動監聽檔案變更。

### 建置生產版本

```bash
npm run build
```

輸出檔案會產生在 `_site/` 目錄。

## 內容編輯

### 頁面內容

頁面使用 Markdown 格式，位於根目錄：
- `index.md` - 首頁
- `works.md` - 作品集
- `about.md` - 關於我
- `contact.md` - 聯繫方式

### 資料檔案

作品和時間軸資料使用 YAML 格式：

**`_data/projects.yml`** - 作品集資料
```yaml
- title: 專案名稱
  description: 專案描述
  url: https://example.com
  categories:
    - 分類1
    - 分類2
```

**`_data/timeline.yml`** - 時間軸資料
```yaml
- year: 2025
  items:
    - emoji: 📅
      content: 事件描述
```

## 效能指標

✅ Lighthouse 效能評分: 95+
✅ First Contentful Paint: < 0.8s
✅ 頁面大小: < 30KB（預設字型）
✅ 建置時間: < 0.5s

## SEO 與 PWA

- ✅ Open Graph meta tags
- ✅ Twitter Card 支援
- ✅ PWA manifest.json
- ✅ robots.txt + sitemap.xml
- ✅ 語義化 HTML
- ✅ WCAG AA 無障礙標準

## 主題切換

網站支援明暗主題自動切換，主題偏好儲存在 localStorage。

## 字型系統

- **系統字型**: 預設使用系統字型確保快速載入
- **精緻字型**: 使用者可選擇載入 Google Fonts（Noto Sans TC）
- **可變字型**: 保留可變字型效果（預設禁用，可快速啟用）

## 授權

© 2025 TzuYuan Yin · 殷慈遠

---

**技術細節**: 完整的重構計劃請參考 [docs/REDESIGN_PLAN.md](docs/REDESIGN_PLAN.md)
