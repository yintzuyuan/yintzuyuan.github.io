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

// 初始化可變字重文字
function initializeVariableWeightText() {
    const text = document.querySelector('.variable-weight-text');

    if (!text) return;

    const minWeight = 200;
    const maxWeight = 600;
    const defaultWeight = 600;
    let currentWeight = defaultWeight;
    let targetWeight = defaultWeight;
    let lastUpdateTime = 0;
    const updateInterval = 100; // 每 100 毫秒更新一次目標值
    let animationFrameId = null;

    function updateTargetWeight(e) {
        const now = Date.now();
        if (now - lastUpdateTime < updateInterval) return;
        lastUpdateTime = now;

        const width = window.innerWidth;
        const height = window.innerHeight;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // 計算相對位置（0到1之間）
        const relativeX = mouseX / width;
        const relativeY = mouseY / height;
        
        // 更新目標字重，從左上（200）到右下（600）
        targetWeight = minWeight + (relativeX + relativeY) / 2 * (maxWeight - minWeight);
    }

    function updateWeight() {
        currentWeight += (targetWeight - currentWeight) * 0.1;
        
        // 設置字重
        text.style.fontVariationSettings = `"wght" ${Math.round(currentWeight)}`;
        
        // 如果還沒有達到目標字重，繼續動畫
        if (Math.abs(currentWeight - targetWeight) > 0.5) {
            animationFrameId = requestAnimationFrame(updateWeight);
        } else {
            animationFrameId = null;
        }
    }

    function startAnimation() {
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(updateWeight);
        }
    }

    function resetWeight() {
        targetWeight = defaultWeight;
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(updateWeight);
        }
    }

    // 使用 throttle 函數來限制目標值更新頻率
    function throttle(func, limit) {
        let inThrottle;
        return function(e) {
            if (!inThrottle) {
                func(e);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    const throttledUpdateTargetWeight = throttle(updateTargetWeight, updateInterval);

    window.addEventListener('mousemove', function(e) {
        throttledUpdateTargetWeight(e);
        startAnimation();
    });

    window.addEventListener('mouseleave', resetWeight);

    // 初始化字重
    resetWeight();

    // 觸摸設備支持
    window.addEventListener('touchmove', function(e) {
        e.preventDefault();
        throttledUpdateTargetWeight(e.touches[0]);
        startAnimation();
    }, { passive: false });

    window.addEventListener('touchend', resetWeight);
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