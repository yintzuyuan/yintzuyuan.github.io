// ===== 完整腳本 (165 行) =====

// ===== 1. 主題切換 (15 行) =====
const themeToggle = document.querySelector('[data-theme-toggle]');
const currentTheme = localStorage.getItem('theme') || 'light';

if (themeToggle) {
  // 更新按鈕顯示
  themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

  themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light'
      ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });
}

// ===== 2. 字體載入 (35 行) =====
function loadGoogleFonts() {
  if (document.body.classList.contains('fonts-loaded')) return;

  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;700&family=Fira+Code:wght@400;700&family=Noto+Emoji&display=swap';
  link.rel = 'stylesheet';

  link.onload = () => {
    document.body.classList.add('fonts-loaded');
    localStorage.setItem('font-pref', 'google');
    hideFontPrompt();
  };

  document.head.appendChild(link);
}

function showFontPrompt() {
  const prompt = document.createElement('div');
  prompt.className = 'font-prompt';
  prompt.innerHTML = `
    <p>載入精緻字體以獲得更好的閱讀體驗
      <button onclick="loadGoogleFonts()">確定</button>
      <button onclick="dismissFontPrompt()">稍後</button>
    </p>
  `;
  document.body.appendChild(prompt);
}

function hideFontPrompt() {
  const prompt = document.querySelector('.font-prompt');
  if (prompt) prompt.remove();
}

function dismissFontPrompt() {
  hideFontPrompt();
  sessionStorage.setItem('font-prompt-dismissed', 'true');
}

// 檢查字體偏好
if (localStorage.getItem('font-pref') === 'google') {
  loadGoogleFonts();
} else if (!sessionStorage.getItem('font-prompt-dismissed')) {
  // 延遲 2 秒顯示提示，避免干擾首次載入
  setTimeout(showFontPrompt, 2000);
}

// ===== 3. 可變字體效果（禁用，保留程式碼） (100 行) =====
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
