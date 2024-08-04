document.addEventListener('DOMContentLoaded', function() {

    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

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
    // const backToTopButton = document.getElementById('back-to-top');

    // 漢堡菜單相關元素
    const menuToggle = document.querySelector('.menu-toggle');
    const navAndButton = document.querySelector('.nav-and-button');
    const body = document.body;

    // 主題切換邏輯
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem("theme", theme);
    
    // 重新啟用過渡效果
    setTimeout(() => {
        document.body.style.transition = 'background-color var(--transition-duration) ease, color var(--transition-duration) ease';
    }, 50);
    }

    // 檢查本地存儲或系統偏好
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
    setTheme(currentTheme);
    } else {
    setTheme(prefersDarkScheme.matches ? "dark" : "light");
    }

    themeToggle.addEventListener("click", function() {
    // 切換主題時暫時禁用過渡效果
    document.body.style.transition = 'none';
    
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
    });

    // 監聽系統主題變化
    prefersDarkScheme.addListener((e) => {
    if (!localStorage.getItem("theme")) {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
    }
    });

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

    setMinimizedState(true);

    // // 切換回到頂部按鈕的顯示狀態
    // function toggleBackToTop() {
    //     if (window.pageYOffset > 300) {
    //         header.classList.add('scrolled');
    //         backToTopButton.classList.add('visible');
    //     } else {
    //         header.classList.remove('scrolled');
    //         backToTopButton.classList.remove('visible');
    //     }
    // }

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

    // // 回到頂部按鈕點擊事件
    // if (backToTopButton) {
    //     backToTopButton.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         window.scrollTo({ top: 0, behavior: 'smooth' });
    //     });
    // }

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

    // // 監聽滾動事件，切換回到頂部按鈕的顯示狀態
    // window.addEventListener('scroll', toggleBackToTop);

    // // 初始化時觸發一次回到頂部按鈕狀態檢查
    // toggleBackToTop();

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

    window.scrollTo(0, 0);
});

// 在 DOMContentLoaded 事件監聽器之外添加這個
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', function() {
    const text = document.querySelector('.variable-weight-text');
  
    if (!text) return;
  
    const minWeight = 200;
    const maxWeight = 900;
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
  
    function animateWeight() {
      // 平滑過渡到目標字重
      currentWeight += (targetWeight - currentWeight) * 0.1;
      
      // 設置字重
      text.style.fontVariationSettings = `"wght" ${Math.round(currentWeight)}`;
      
      // 如果還沒有達到目標字重，繼續動畫
      if (Math.abs(currentWeight - targetWeight) > 0.5) {
        animationFrameId = requestAnimationFrame(animateWeight);
      } else {
        animationFrameId = null;
      }
    }
  
    function resetWeight() {
      targetWeight = defaultWeight;
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(animateWeight);
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
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(animateWeight);
      }
    });
  
    window.addEventListener('mouseleave', resetWeight);
  
    // 初始化字重
    resetWeight();
  
    // 觸摸設備支持
    window.addEventListener('touchmove', function(e) {
      e.preventDefault();
      throttledUpdateTargetWeight(e.touches[0]);
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(animateWeight);
      }
    }, { passive: false });
  
    window.addEventListener('touchend', resetWeight);
  });
  

  document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a:not(.external-link)');
  
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // 移除所有導航項目的 current 類
        navLinks.forEach(l => l.classList.remove('current'));
        
        // 為被點擊的項目添加 current 類
        e.target.classList.add('current');
      });
    });
  
    // 設置初始的當前頁面
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('current');
      }
    });
  });


  document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a:not(.external-link)');
  
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault(); // 暫時阻止默認行為
        
        // 移除所有導航項目的 current 類
        navLinks.forEach(l => l.classList.remove('current'));
        
        // 為被點擊的項目添加 current 類
        e.target.classList.add('current');
        
        // 延遲導航，以便看到過渡效果
        setTimeout(() => {
          window.location.href = e.target.href; // 在延遲後進行實際導航
        }, 300); // 延遲時間應與 CSS 過渡時間匹配
      });
    });
  
    // 設置初始的當前頁面
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('current');
      }
    });
  });