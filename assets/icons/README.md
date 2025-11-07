# Favicon 與 PWA Icons

## 需要的檔案

### PWA Icons
- `icon-192.png` - 192x192px (Android)
- `icon-512.png` - 512x512px (Android)
- `apple-touch-icon.png` - 180x180px (iOS)

### 產生方式

可以使用以下工具產生完整 favicon 套件：

1. **線上工具**: https://realfavicongenerator.net/
2. **CLI 工具**: `npm install -g sharp-cli`

```bash
# 使用 sharp-cli 產生不同尺寸
sharp -i logo.svg -o icon-192.png resize 192 192
sharp -i logo.svg -o icon-512.png resize 512 512
sharp -i logo.svg -o apple-touch-icon.png resize 180 180
```

## 目前狀態

- [ ] icon-192.png
- [ ] icon-512.png
- [ ] apple-touch-icon.png

註：需要從現有的 favicon.ico 或設計稿產生這些圖示檔案。
