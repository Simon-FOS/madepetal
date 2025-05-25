/**
 * MadePetal Clinic & Spa - Contact Form Handling
 * This script handles form submission and validation for the contact page
 */

// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function () {

    // Get the contact form element
    const contactForm = document.getElementById('contactForm');

    // If the contact form exists on the page
    if (contactForm) {

        // Add event listener for form submission
        contactForm.addEventListener('submit', function (e) {
            // Prevent the default form submission
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            // Simple validation - check if required fields are filled
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Validate email format
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // If everything is valid, proceed with form submission
            submitContactForm(name, email, phone, service, message);
        });
    }

    /**
     * Validates an email address
     * @param {string} email - The email address to validate
     * @returns {boolean} - True if email is valid, false otherwise
     */
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Handles the form submission (in a real scenario, this would send to a server)
     * @param {string} name - User's name
     * @param {string} email - User's email
     * @param {string} phone - User's phone number
     * @param {string} service - Selected service
     * @param {string} message - User's message
     */
    function submitContactForm(name, email, phone, service, message) {
        // In a real implementation, you would send this data to your server
        // For now, we'll just show a success message

        console.log('Form data:', { name, email, phone, service, message });

        // Show success message to user
        alert('Thank you for your message! We will get back to you soon.');

        // Reset the form
        contactForm.reset();

        // In a real implementation, you might want to:
        // 1. Use fetch() or XMLHttpRequest to send data to your server
        // 2. Show a loading spinner during submission
        // 3. Handle server responses (success/error)
        // 4. Potentially redirect to a thank you page
    }
});