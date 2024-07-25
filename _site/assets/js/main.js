document.addEventListener('DOMContentLoaded', function() {
    const newsletterFloating = document.getElementById('newsletter-floating');
    const newsletterToggle = document.getElementById('newsletter-toggle');
    const newsletterForm = document.getElementById('newsletter-form');
    const toggleText = newsletterToggle.querySelector('.toggle-text');
    const emojiMinimized = newsletterToggle.querySelector('.emoji-minimized');
    const minimizeIcon = newsletterToggle.querySelector('.minimize-icon');
    const closeIcon = newsletterToggle.querySelector('.close-icon');
    const storageKey = 'newsletter_minimized';

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
    }

    // 初始狀態設置
    const initiallyMinimized = localStorage.getItem(storageKey) === 'true';
    setMinimizedState(initiallyMinimized);

    newsletterToggle.addEventListener('click', function() {
        const isCurrentlyMinimized = newsletterForm.classList.contains('hidden');
        setMinimizedState(!isCurrentlyMinimized);
    });

    // 關閉按鈕功能
    closeIcon.addEventListener('click', function(event) {
        event.stopPropagation(); // 防止觸發 newsletterToggle 的點擊事件
        setMinimizedState(true);
    });

    // MailerLite 初始化
    if (window.ml) {
        window.ml('webforms');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var header = document.getElementById('site-header');
    var backToTopButton = document.getElementById('back-to-top');
  
    if (header && backToTopButton) {
      function toggleBackToTop() {
        if (window.pageYOffset > 300) {
          header.classList.add('scrolled');
          backToTopButton.classList.add('visible');
        } else {
          header.classList.remove('scrolled');
          backToTopButton.classList.remove('visible');
        }
      }
  
      window.addEventListener('scroll', toggleBackToTop);
  
      backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  
      // 初始化時觸發一次
      toggleBackToTop();
    }
  });