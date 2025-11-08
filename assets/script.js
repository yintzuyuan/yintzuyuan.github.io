// ===== 完整腳本 =====
// 注意：主題切換邏輯已在 default.njk 中實作，避免重複
// 字體已在 HTML <head> 直接載入，無需 JavaScript 處理

// ===== 1. 可變字體效果（禁用，保留程式碼） (100 行) =====
const VARIABLE_FONT_ENABLED = false; // 🔧 改為 true 即可啟用

if (VARIABLE_FONT_ENABLED && document.querySelector('.variable-weight-text')) {
  loadVariableFont();
}

function loadVariableFont() {
  // 檢查瀏覽器是否支援
  if (!('FontFace' in window)) {
    console.warn('瀏覽器不支援 FontFace API，無法載入可變字體');
    return;
  }

  const font = new FontFace('YinTzuYuan Title',
    'url(/fonts/yintzuyuan-title.woff2) format("woff2")', {
      weight: '100 900',
      display: 'swap'
    });

  font.load()
    .then(loadedFont => {
      document.fonts.add(loadedFont);
      document.body.classList.add('variable-font-enabled');
      initVariableWeightEffect();
      console.log('可變字體載入成功');
    })
    .catch(err => {
      console.warn('可變字體載入失敗:', err);
    });
}

function initVariableWeightEffect() {
  const titleElement = document.querySelector('.variable-weight-text');
  if (!titleElement) return;

  let mouseX = 0, mouseY = 0;
  let currentAXS1 = 0, currentAXS2 = 0;
  let animationId = null;

  // 滑鼠移動事件
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
  });

  // 觸控事件（移動裝置）
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouseX = e.touches[0].clientX / window.innerWidth;
      mouseY = e.touches[0].clientY / window.innerHeight;
    }
  });

  // 動畫循環
  function animate() {
    const targetAXS1 = mouseX * 100;
    const targetAXS2 = mouseY * 100;

    // 平滑插值
    currentAXS1 += (targetAXS1 - currentAXS1) * 0.1;
    currentAXS2 += (targetAXS2 - currentAXS2) * 0.1;

    // 更新字體變化軸
    titleElement.style.fontVariationSettings =
      `'AXS1' ${currentAXS1.toFixed(2)}, 'AXS2' ${currentAXS2.toFixed(2)}`;

    animationId = requestAnimationFrame(animate);
  }

  animate();

  // 頁面卸載時停止動畫
  window.addEventListener('beforeunload', () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });
}

// ===== 總計：約 150 行 =====
