/**
 * MadePetal Clinic & Spa - Blog Page Functionality
 * This script handles interactive elements on the blog page
 */

document.addEventListener('DOMContentLoaded', function () {
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get the email input value
            const email = this.querySelector('input[type="email"]').value;

            // Simple validation
            if (!email) {
                alert('Please enter your email address');
                return;
            }

            // In a real implementation, you would send this to your server
            console.log('New subscriber:', email);

            // Show success message
            alert('Thank you for subscribing to our newsletter!');

            // Reset the form
            this.reset();
        });
    }

    // Search functionality (basic client-side example)
    const searchInput = document.querySelector('.input-group input');
    const searchButton = document.querySelector('.input-group button');

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function () {
            const searchTerm = searchInput.value.trim();

            if (searchTerm) {
                // In a real implementation, this would filter articles or make an API call
                console.log('Searching for:', searchTerm);
                alert('In a complete implementation, this would search for: ' + searchTerm);
            } else {
                alert('Please enter a search term');
            }
        });
    }

    // Article click tracking (example)
    const articles = document.querySelectorAll('.blog-card, .list-group-item');

    articles.forEach(article => {
        article.addEventListener('click', function () {
            // In a real implementation, you might track which articles are being viewed
            const title = this.querySelector('h5, h6').textContent;
            console.log('Article viewed:', title);
        });
    });
});