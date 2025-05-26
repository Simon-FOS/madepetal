// static/js/spa-services.js

/**
 * SPA SERVICES PAGE INTERACTIVITY
 * This script enhances the user experience on the Spa & Massage services page
 * with interactive elements and animations.
 */

// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function () {

    // ========== SMOOTH SCROLLING FOR ANCHOR LINKS ==========
    // This makes navigation to page sections smooth instead of abrupt

    // Select all anchor links with hashes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump behavior

            // Get the target element's ID from the href attribute
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip empty hashes

            // Find the target element
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate the position to scroll to (accounting for fixed navbar)
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                // Perform the smooth scroll
                window.scroll