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
    return {
        newsletterFloating: document.getElementById('newsletter-floating'),
        newsletterToggle: document.getElementById('newsletter-toggle'),
        newsletterForm: document.getElementById('newsletter-form'),
        header: document.getElementById('site-header'),
        menuToggle: document.querySelector('.menu-toggle'),
        navAndButton: document.querySelector('.nav-and-button'),
        themeToggle: document.getElementById('theme-toggle')
    };
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

    function setMinimizedState(minimized) {
        // 設置最小化狀態的邏輯
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

        // 移除初始隱藏類，顯示整個 newsletter-floating 元素
        setTimeout(() => {
            newsletterFloating.classList.remove('initially-hidden');
            // 強制重繪以確保過渡效果正常工作
            newsletterFloating.offsetHeight;
            newsletterFloating.style.transition = 'all var(--transition-duration) ease';
            // 確保所有子元素也可見
            Array.from(newsletterFloating.getElementsByTagName('*')).forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
            });
        }, 100);
    }

    setMinimizedState(localStorage.getItem(storageKey) === 'true');

    newsletterToggle.addEventListener('click', function() {
        const isCurrentlyMinimized = newsletterForm.classList.contains('hidden');
        setMinimizedState(!isCurrentlyMinimized);
    });

    const closeIcon = newsletterToggle.querySelector('.close-icon');
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
    // ...（保留原有的可變字重文字相關代碼）
}

// 初始化導航鏈接
function initializeNavLinks() {
    const navLinks = document.querySelectorAll('nav a:not(.external-link)');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
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
    function setTheme() {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const originalForm = document.getElementById('original-form');
        const mailerliteForm = document.getElementById('mailerlite-form');

        if (isDarkMode) {
            originalForm.style.display = 'block';
            mailerliteForm.style.display = 'none';
        } else {
            originalForm.style.display = 'none';
            mailerliteForm.style.display = 'block';
        }
    }

    setTheme();
    window.matchMedia('(prefers-color-scheme: dark)').addListener(setTheme);
}

// 在頁面加載完成後再次滾動到頂部
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});