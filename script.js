// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements with staggered delay
    function initializeElements() {
        const elements = document.querySelectorAll('[data-scroll]');
        elements.forEach((element, index) => {
            element.style.transitionDelay = `${index * 200}ms`;
        });
    }

    // Scroll animation function with improved timing
    function checkScroll() {
        const elements = document.querySelectorAll('[data-scroll]');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 50 && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize elements
    initializeElements();

    // Check elements on load with a slight delay
    setTimeout(() => {
        checkScroll();
    }, 300);

    // Check elements on scroll with throttling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            checkScroll();
        });
    });

    // Mobile menu functionality
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('hidden');
        
        // Change menu icon
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    }

    menuBtn.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animate-fadeIn');
            }
        });
    }

    // Initial check for elements in view
    animateOnScroll();
    
    // Check for elements on scroll
    window.addEventListener('scroll', animateOnScroll);
});

// Add smooth parallax effect to hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('#home');
    const scrolled = window.pageYOffset;
    
    if (hero) {
        const background = hero.querySelector('.bg-[url]');
        if (background) {
            background.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
});