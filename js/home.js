// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Navigation - Fixed Implementation
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarClose = document.querySelector('.navbar-close');
    let isMenuOpen = false;

    console.log('Navigation elements found:', {
        toggler: !!navbarToggler,
        collapse: !!navbarCollapse,
        close: !!navbarClose
    });

    function openMenu() {
        if (navbarCollapse) {
            navbarCollapse.classList.add('show');
            document.body.style.overflow = 'hidden';
            isMenuOpen = true;
            if (navbarToggler) {
                navbarToggler.setAttribute('aria-expanded', 'true');
            }
            console.log('Menu opened');
        }
    }

    function closeMenu() {
        if (navbarCollapse) {
            navbarCollapse.classList.remove('show');
            document.body.style.overflow = '';
            isMenuOpen = false;
            if (navbarToggler) {
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
            console.log('Menu closed');
        }
    }

    // Handle hamburger menu toggle
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Toggler clicked');

            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Handle close button click
    if (navbarClose) {
        // Make sure the close button is properly styled and clickable
        navbarClose.style.pointerEvents = 'auto';
        navbarClose.style.cursor = 'pointer';
        navbarClose.style.zIndex = '9999';

        navbarClose.addEventListener('click', function(e) {
            console.log('Close button clicked');
            e.preventDefault();
            e.stopPropagation();
            closeMenu();
        });

        // Visual feedback for debugging
        navbarClose.addEventListener('mouseenter', function() {
            console.log('Close button hovered');
            this.style.color = 'red';
        });

        navbarClose.addEventListener('mouseleave', function() {
            this.style.color = '';
        });
    }

    // Close menu when clicking nav links on mobile
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only close menu if it's a regular navigation link (not calculator)
            if (window.innerWidth <= 991.98 && isMenuOpen) {
                if (!this.getAttribute('href').includes('#calculator')) {
                    closeMenu();
                }
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && window.innerWidth <= 991.98) {
            const isClickInsideNav = navbarCollapse.contains(e.target) ||
                navbarToggler.contains(e.target);

            if (!isClickInsideNav) {
                closeMenu();
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991.98 && isMenuOpen) {
            closeMenu();
        }
    });

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
});

// Smooth scrolling for anchor links (excluding calculator)
document.querySelectorAll('a[href^="#"]:not([href="#calculator"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Cost Calculator functionality
function updateCalculator() {
    const businessType = document.getElementById('businessType').value;
    const visaCount = parseInt(document.getElementById('visaCount').value) || 0;
    const bankAccount = document.getElementById('bankAccount').checked;
    const accounting = document.getElementById('accounting').checked;

    let setupCost = 5000;
    if (businessType === 'Mainland Company') setupCost = 7000;
    if (businessType === 'Offshore Company') setupCost = 3000;

    const visaCost = visaCount * 1000;
    let additionalCost = 0;
    if (bankAccount) additionalCost += 1500;
    if (accounting) additionalCost += 2000;

    const totalCost = setupCost + visaCost + additionalCost;

    document.getElementById('setupCost').textContent = '$' + setupCost.toLocaleString();
    document.getElementById('visaCost').textContent = '$' + visaCost.toLocaleString();
    document.getElementById('additionalCost').textContent = '$' + additionalCost.toLocaleString();
    document.getElementById('totalCost').textContent = '$' + totalCost.toLocaleString();
}

// Add calculator link to navbar - Fixed to work with mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const calculatorLink = document.querySelector('a[href="#calculator"]');
    if (calculatorLink) {
        calculatorLink.addEventListener('click', function(e) {
            e.preventDefault();

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                const navbarToggler = document.querySelector('.navbar-toggler');
                if (navbarToggler) {
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
                document.body.style.overflow = '';
            }

            // Open calculator modal
            const modal = new bootstrap.Modal(document.getElementById('calculatorModal'));
            modal.show();
        });
    }
});

// Calculator event listeners
document.addEventListener('DOMContentLoaded', function() {
    const calculatorInputs = ['businessType', 'visaCount', 'bankAccount', 'accounting'];
    calculatorInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', updateCalculator);
        }
    });
});

// Newsletter subscription
document.addEventListener('DOMContentLoaded', function() {
    const newsletterButton = document.querySelector('.input-group button');
    if (newsletterButton) {
        newsletterButton.addEventListener('click', function() {
            const inputs = this.parentElement.querySelectorAll('input');
            const firstName = inputs[0].value;
            const lastName = inputs[1].value;
            const email = inputs[2].value;
            if (firstName && lastName && email) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                this.style.background = '#28a745';

                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                    inputs[0].value = '';
                    inputs[1].value = '';
                    inputs[2].value = '';
                }, 2000);
            }
        });
    }
});

// Add floating particles dynamically
function createParticle() {
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = particle.style.height = (Math.random() * 8 + 4) + 'px';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 25000);
    }
}

setInterval(createParticle, 3000);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});