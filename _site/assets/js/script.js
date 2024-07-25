// script.js
document.addEventListener('DOMContentLoaded', function() {
    const headerTemplate = document.getElementById('header-template');
    const footerTemplate = document.getElementById('footer-template');
    const newsletterTemplate = document.getElementById('newsletter-template');

    document.getElementById('header-placeholder').appendChild(
        document.importNode(headerTemplate.content, true)
    );
    document.getElementById('footer-placeholder').appendChild(
        document.importNode(footerTemplate.content, true)
    );
    document.getElementById('newsletter-placeholder').appendChild(
        document.importNode(newsletterTemplate.content, true)
    );
});