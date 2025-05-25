/**
 * MadePetal Clinic & Spa - Gallery Page Functionality
 * 
 * This script handles:
 * 1. Filtering gallery items by category
 * 2. Lightbox functionality for image viewing
 * 3. Load more button functionality
 * 4. Smooth scrolling and animations
 */

// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function () {

    // ========== GALLERY FILTER FUNCTIONALITY ==========
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Add click event listeners to all filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {

            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get the filter category from data-filter attribute
            const filterValue = this.getAttribute('data-filter');

            // Show/hide gallery items based on filter
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';

                    // Add animation class
                    item.classList.add('animate__animated', 'animate__fadeIn');

                    // Remove animation class after animation completes
                    setTimeout(() => {
                        item.classList.remove('animate__animated', 'animate__fadeIn');
                    }, 500);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ========== LOAD MORE FUNCTIONALITY ==========
    const loadMoreBtn = document.getElementById('loadMore');
    let visibleItems = 6; // Initial number of visible items

    // Hide items beyond the initial visible count
    function hideExtraItems() {
        galleryItems.forEach((item, index) => {
            if (index >= visibleItems) {
                item.style.display = 'none';
            }
        });

        // Show or hide load more button based on remaining items
        if (visibleItems >= galleryItems.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }

    // Initial hide of extra items
    hideExtraItems();

    // Load more items when button is clicked
    loadMoreBtn.addEventListener('click', function () {
        visibleItems += 3; // Increase visible items by 3

        // Show additional items with animation
        for (let i = 0; i < visibleItems && i < galleryItems.length; i++) {
            if (galleryItems[i].style.display === 'none') {
                galleryItems[i].style.display = 'block';
                galleryItems[i].classList.add('animate__animated', 'animate__fadeIn');

                // Remove animation class after animation completes
                setTimeout(() => {
                    galleryItems[i].classList.remove('animate__animated', 'animate__fadeIn');
                }, 500);
            }
        }

        // Hide button if all items are visible
        if (visibleItems >= galleryItems.length) {
            loadMoreBtn.style.display = 'none';
        }

        // Smooth scroll to the newly loaded items
        const lastVisibleItem = galleryItems[Math.min(visibleItems, galleryItems.length) - 1];
        lastVisibleItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // ========== LIGHTBOX CONFIGURATION ==========
    // Configure lightbox plugin
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'showImageNumberLabel': true,
        'alwaysShowNavOnTouchDevices': true,
        'disableScrolling': true
    });

    // ========== SMOOTH SCROLLING FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== ANIMATE ELEMENTS ON SCROLL ==========
    // Initialize Intersection Observer for scroll animations
    const animateOnScroll = function () {
        const elementsToAnimate = document.querySelectorAll('.gallery-item, .testimonial-card, .cta-section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');

                    // Stop observing after animation
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    };

    // Run the scroll animation function
    animateOnScroll();
});