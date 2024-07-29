document.addEventListener('DOMContentLoaded', function() {
    // 電子報訂閱相關元素
    const newsletterFloating = document.getElementById('newsletter-floating');
    const newsletterToggle = document.getElementById('newsletter-toggle');
    const newsletterForm = document.getElementById('newsletter-form');
    const toggleText = newsletterToggle.querySelector('.toggle-text');
    const emojiMinimized = newsletterToggle.querySelector('.emoji-minimized');
    const minimizeIcon = newsletterToggle.querySelector('.minimize-icon');
    const closeIcon = newsletterToggle.querySelector('.close-icon');
    const storageKey = 'newsletter_minimized';

    // 頁首和回到頂部按鈕元素
    const header = document.getElementById('site-header');
    const backToTopButton = document.getElementById('back-to-top');

    // 漢堡菜單相關元素
    const menuToggle = document.querySelector('.menu-toggle');
    const navAndButton = document.querySelector('.nav-and-button');
    const body = document.body;

    // 設置電子報訂閱區塊的最小化狀態
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

    // 切換回到頂部按鈕的顯示狀態
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            header.classList.add('scrolled');
            backToTopButton.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            backToTopButton.classList.remove('visible');
        }
    }

    // 切換漢堡菜單的狀態
    function toggleMenu() {
        navAndButton.classList.toggle('active');
        body.classList.toggle('menu-open');
        const isExpanded = navAndButton.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        menuToggle.classList.toggle('open', isExpanded);
    }

    // 初始化電子報訂閱區塊狀態
    const initiallyMinimized = localStorage.getItem(storageKey) === 'true';
    setMinimizedState(initiallyMinimized);

    // 電子報訂閱切換按鈕點擊事件
    newsletterToggle.addEventListener('click', function() {
        const isCurrentlyMinimized = newsletterForm.classList.contains('hidden');
        setMinimizedState(!isCurrentlyMinimized);
    });

    // 電子報訂閱關閉按鈕點擊事件
    closeIcon.addEventListener('click', function(event) {
        event.stopPropagation(); // 防止觸發 newsletterToggle 的點擊事件
        setMinimizedState(true);
    });

    // 回到頂部按鈕點擊事件
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 漢堡菜單切換按鈕點擊事件
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // 點擊導航鏈接時關閉菜單（在移動設備上）
    const navLinks = document.querySelectorAll('.nav-and-button a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 767) {
                toggleMenu();
            }
        });
    });

    // 監聽滾動事件，切換回到頂部按鈕的顯示狀態
    window.addEventListener('scroll', toggleBackToTop);

    // 初始化時觸發一次回到頂部按鈕狀態檢查
    toggleBackToTop();

    // 初始化 MailerLite
    if (window.ml) {
        window.ml('webforms');
    }
    document.body.classList.add('js-loaded');

    // 在 DOMContentLoaded 事件處理程序中添加
    if (window.ml) {
        window.ml('on', 'pageView', function() {
        // MailerLite 表單已加載
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
});