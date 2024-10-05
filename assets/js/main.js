document.addEventListener('DOMContentLoaded', function() {
    // 初始化頁面滾動位置
    initializeScrollPosition();

    // 獲取 DOM 元素
    const elements = getDOMElements();

    // 初始化主題
    initializeTheme(elements.themeToggle);

    // 初始化電子報訂閱
    initializeNewsletter(elements);

    // 初始化菜單
    initializeMenu(elements);

    // 初始化 MailerLite
    initializeMailerLite();

    // 添加 js-loaded 類到 body
    document.body.classList.add('js-loaded');

    // 初始化可變字重文字
    initializeVariableWeightText();

    // 初始化導航鏈接
    initializeNavLinks();

    // 設置主題和表單
    handleThemeAndForm();
});

// 初始化頁面滾動位置
function initializeScrollPosition() {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
}

// 獲取 DOM 元素
function getDOMElements() {
    const elements = {
        newsletterFloating: document.getElementById('newsletter-floating'),
        newsletterToggle: document.getElementById('newsletter-toggle'),
        newsletterForm: document.getElementById('newsletter-form'),
        header: document.getElementById('site-header'),
        menuToggle: document.querySelector('.menu-toggle'),
        navAndButton: document.querySelector('.nav-and-button'),
        themeToggle: document.getElementById('theme-toggle')
    };

    // 檢查是否所有元素都存在
    for (const [key, value] of Object.entries(elements)) {
        if (!value) {
            console.warn(`元素 "${key}" 未找到`);
        }
    }

    return elements;
}

// 初始化主題
function initializeTheme(themeToggle) {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem("theme", theme);
        setTimeout(() => {
            document.body.style.transition = 'background-color var(--transition-duration) ease, color var(--transition-duration) ease';
        }, 50);
    }

    const currentTheme = localStorage.getItem("theme") || (prefersDarkScheme.matches ? "dark" : "light");
    setTheme(currentTheme);

    themeToggle.addEventListener("click", function() {
        document.body.style.transition = 'none';
        const newTheme = document.documentElement.getAttribute('data-theme') === "light" ? "dark" : "light";
        setTheme(newTheme);
    });

    prefersDarkScheme.addListener((e) => {
        if (!localStorage.getItem("theme")) {
            setTheme(e.matches ? "dark" : "light");
        }
    });
}

// 初始化電子報訂閱
function initializeNewsletter(elements) {
    const { newsletterFloating, newsletterToggle, newsletterForm } = elements;
    const storageKey = 'newsletter_minimized';
    const toggleText = newsletterToggle.querySelector('.toggle-text');
    const emojiMinimized = newsletterToggle.querySelector('.emoji-minimized');
    const minimizeIcon = newsletterToggle.querySelector('.minimize-icon');
    const closeIcon = newsletterToggle.querySelector('.close-icon');

    function setMinimizedState(minimized) {
        if (minimized) {
            newsletterForm.classList.add('hidden');
            toggleText.classList.remove('hidden');
            emojiMinimized.classList.remove('hidden');
            minimizeIcon.classList.add('hidden');
            closeIcon.classList.add('hidden');
            newsletterFloating.classList.add('minimized');
        } else {
            newsletterForm.classList.remove('hidden');
            toggleText.classList.add('hidden');
            emojiMinimized.classList.add('hidden');
            minimizeIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            newsletterFloating.classList.remove('minimized');
        }
        localStorage.setItem(storageKey, minimized);

        setTimeout(() => {
            newsletterFloating.classList.remove('initially-hidden');
            newsletterFloating.offsetHeight;
            newsletterFloating.style.transition = 'all var(--transition-duration) ease';
            Array.from(newsletterFloating.getElementsByTagName('*')).forEach(el => {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
            });
        }, 100);
    }

    // 修改這裡：預設為縮小狀態，但仍然檢查 localStorage
    const isMinimized = localStorage.getItem(storageKey) !== 'false';
    setMinimizedState(isMinimized);

    newsletterToggle.addEventListener('click', function() {
        const isCurrentlyMinimized = newsletterForm.classList.contains('hidden');
        setMinimizedState(!isCurrentlyMinimized);
    });

    closeIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        setMinimizedState(true);
    });
}

// 初始化菜單
function initializeMenu(elements) {
    const { menuToggle, navAndButton } = elements;

    function toggleMenu() {
        navAndButton.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        const isExpanded = navAndButton.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        menuToggle.classList.toggle('open', isExpanded);
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
        menuToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
    }

    const navLinks = document.querySelectorAll('.nav-and-button a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 767) {
                toggleMenu();
            }
        });
    });
}

// 初始化 MailerLite
function initializeMailerLite() {
    if (window.ml) {
        window.ml('webforms');
        window.ml('on', 'pageView', function() {
            const form = document.querySelector('#newsletter-form form');
            if (form) {
                form.style.opacity = '0';
                form.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    form.style.opacity = '1';
                }, 100);
            }
        });
    }
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

/*
確保在 CSS 中正確設置了字體的可變軸範圍：
.variable-weight-text {
    font-variation-settings: "AXS1" 100, "AXS2" 0;
    transition: font-variation-settings 0.3s ease;
}
*/
// 初始化可變字重文字
function initializeVariableWeightText() {
    console.log("Initializing variable weight text");
    const text = document.querySelector('.variable-weight-text');
    if (!text) {
        console.log("Variable weight text element not found");
        return;
    }
    console.log("Variable weight text element found:", text);

    // 設定字距
    text.style.letterSpacing = '0.1em'; // 你可以根據需要調整這個值

    const minAxis1 = 0, maxAxis1 = 100, minAxis2 = 0, maxAxis2 = 100;
    const defaultAxis1 = 100, defaultAxis2 = 0;
    let currentAxis1 = defaultAxis1, currentAxis2 = defaultAxis2;
    let targetAxis1 = defaultAxis1, targetAxis2 = defaultAxis2;
    let lastUpdateTime = 0;
    const updateInterval = 100;
    let animationFrameId = null;
    const idleTimeLimit = 5000; // 自定義秒數，這裡設定為5秒
    let idleTimeoutId = null;
    let lastExtremeIndex = -1;
    
    function updateTargetValues(e) {
        const now = Date.now();
        if (now - lastUpdateTime < updateInterval) return;
        lastUpdateTime = now;
    
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        const relativeX = Math.max(0, Math.min(1, e.clientX / width));
        const relativeY = Math.max(0, Math.min(1, e.clientY / height));
        
        // 調整計算方式使兩個軸交叉
        targetAxis1 = minAxis1 + relativeY * (maxAxis1 - minAxis1);
        targetAxis2 = minAxis2 + relativeX * (maxAxis2 - minAxis2);
        
        console.log("Target values updated:", targetAxis1, targetAxis2);
    
        // 重置閒置計時器
        clearTimeout(idleTimeoutId);
        idleTimeoutId = setTimeout(switchToExtremeValues, idleTimeLimit);
    }
    
    function switchToExtremeValues() {
        const extremes = [
            { axis1: minAxis1, axis2: minAxis2 },
            { axis1: minAxis1, axis2: maxAxis2 },
            { axis1: maxAxis1, axis2: minAxis2 },
            { axis1: maxAxis1, axis2: maxAxis2 }
        ];
        let randomExtremeIndex;
        do {
            randomExtremeIndex = Math.floor(Math.random() * extremes.length);
        } while (randomExtremeIndex === lastExtremeIndex);
        
        lastExtremeIndex = randomExtremeIndex;
        const randomExtreme = extremes[randomExtremeIndex];
        targetAxis1 = randomExtreme.axis1;
        targetAxis2 = randomExtreme.axis2;
        console.log("Idle timeout reached. Switching to extreme values:", targetAxis1, targetAxis2);
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(updateValues);
        }
        idleTimeoutId = setTimeout(switchToExtremeValues, idleTimeLimit);
    }
    
    function updateValues() {
        currentAxis1 += (targetAxis1 - currentAxis1) * 0.1;
        currentAxis2 += (targetAxis2 - currentAxis2) * 0.1;
        
        text.style.fontVariationSettings = `"AXS1" ${Math.round(currentAxis1)}, "AXS2" ${Math.round(currentAxis2)}`;
        console.log("Font variation settings updated:", text.style.fontVariationSettings);
        
        if (Math.abs(currentAxis1 - targetAxis1) > 0.5 || Math.abs(currentAxis2 - targetAxis2) > 0.5) {
            animationFrameId = requestAnimationFrame(updateValues);
        } else {
            animationFrameId = null;
        }
        const debugInfo = document.getElementById('debug-info');
        if (debugInfo) {
            debugInfo.textContent = `AXS1: ${Math.round(currentAxis1)}, AXS2: ${Math.round(currentAxis2)}`;
        }
    }
    
    // 初始化閒置計時器
    idleTimeoutId = setTimeout(switchToExtremeValues, idleTimeLimit);
    
    function startAnimation() {
        if (!animationFrameId) {
            console.log("Starting animation");
            animationFrameId = requestAnimationFrame(updateValues);
        }
    }

    function resetValues() {
        console.log("Resetting values");
        targetAxis1 = defaultAxis1;
        targetAxis2 = defaultAxis2;
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(updateValues);
        }
    }

    // 檢查是否為觸摸裝置
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // 關閉可變字型軸的偵測功能
    function disableVariableFontAxisDetection() {
        window.removeEventListener('mousemove', throttledUpdateTargetValues);
        window.removeEventListener('mouseleave', resetValues);
        window.removeEventListener('touchmove', throttledUpdateTargetValues);
        window.removeEventListener('touchend', resetValues);
    }

    if (isTouchDevice()) {
        disableVariableFontAxisDetection();
    } else {
        const throttledUpdateTargetValues = throttle(updateTargetValues, updateInterval);

        window.addEventListener('mousemove', function(e) {
            throttledUpdateTargetValues(e);
            startAnimation();
        });

        window.addEventListener('mouseleave', resetValues);

        // 觸摸設備支援
        window.addEventListener('touchmove', function(e) {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            throttledUpdateTargetValues(mouseEvent);
            startAnimation();
        }, { passive: false });

        window.addEventListener('touchend', resetValues);

        resetValues();
    }
}

// 初始化導航鏈接
function initializeNavLinks() {
    const navLinks = document.querySelectorAll('nav a:not(.external-link)');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // 檢查連結是否為外部連結
            if (link.hostname !== window.location.hostname) {
                return;
            }

            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('current'));
            e.target.classList.add('current');
            setTimeout(() => {
                window.location.href = e.target.href;
            }, 300);
        });
    });

    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('current');
        }
    });
}

// 處理主題和表單
function handleThemeAndForm() {
    const darkModeForm = document.querySelector('.dark-mode-form');
    const lightModeForm = document.querySelector('.light-mode-form');

    function setTheme() {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDarkMode) {
            darkModeForm.style.display = 'block';
            lightModeForm.style.display = 'none';
        } else {
            darkModeForm.style.display = 'none';
            lightModeForm.style.display = 'block';
        }
    }

    setTheme();
    document.getElementById('theme-toggle').addEventListener('click', setTheme);
}

// 在頁面加載完成後再次滾動到頂部
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});