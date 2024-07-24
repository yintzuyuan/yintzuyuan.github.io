// load-templates.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        });

    fetch('newsletter-floating.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
            initNewsletterFloating();
            if (window.ml) {
                window.ml('webforms');
            } else {
                console.error('MailerLite script not loaded');
            }
        });
});

function initNewsletterFloating() {
    const toggle = document.getElementById('newsletter-toggle');
    const form = document.getElementById('newsletter-form');
    const close = document.getElementById('newsletter-close');
    const floating = document.getElementById('newsletter-floating');

    if (localStorage.getItem('newsletter-hidden') !== 'true') {
        floating.style.display = 'block';
    } else {
        floating.style.display = 'none';
    }

    toggle.addEventListener('click', function() {
        form.classList.toggle('hidden');
    });

    close.addEventListener('click', function() {
        floating.style.display = 'none';
        localStorage.setItem('newsletter-hidden', 'true');
    });
}