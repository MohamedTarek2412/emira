// Initialize AOS
try {
    AOS.init();
    console.log("AOS initialized successfully");
} catch (error) {
    console.error("AOS initialization failed:", error);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    } else {
        console.warn("Navbar element not found");
    }
});

// PDF download fallback
document.addEventListener('DOMContentLoaded', function() {
    const downloadGuide = document.getElementById('downloadGuide');
    if (downloadGuide) {
        console.log("downloadGuide element found");
        downloadGuide.addEventListener('click', function(e) {
            const link = this.href;
            const filename = 'BusinessSetupGuide.pdf';
            e.preventDefault();
            const a = document.createElement('a');
            a.href = link;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            console.log("PDF download triggered");
        });
    } else {
        console.warn("downloadGuide element not found");
    }
});

// Social icons debug
console.log("Social media icons loaded in footer");
document.addEventListener('DOMContentLoaded', function() {
    const icons = document.querySelectorAll('.social-icons i');
    icons.forEach(icon => {
        if (!window.getComputedStyle(icon, ':before').content) {
            icon.parentElement.classList.add('no-icon');
            console.warn(`Font Awesome icon for ${icon.parentElement.getAttribute('aria-label')} failed to load`);
        }
    });
});

// Mobile navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarClose = document.querySelector('.navbar-close');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    // Initialize Bootstrap Collapse properly
    if (navbarCollapse) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
        });

        // Handle navbar toggler click
        if (navbarToggler) {
            navbarToggler.addEventListener('click', function() {
                bsCollapse.toggle();
                navbarToggler.setAttribute('aria-expanded', bsCollapse._isShown());
            });
        }

        // Handle close button click
        if (navbarClose) {
            navbarClose.addEventListener('click', function(e) {
                e.preventDefault();
                bsCollapse.hide();
                navbarToggler.setAttribute('aria-expanded', 'false');
            });
        }

        // Close navbar when clicking on links (mobile only)
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 991.98) {
                    bsCollapse.hide();
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Update aria-expanded when collapse is shown/hidden
        navbarCollapse.addEventListener('shown.bs.collapse', function() {
            navbarToggler.setAttribute('aria-expanded', 'true');
        });

        navbarCollapse.addEventListener('hidden.bs.collapse', function() {
            navbarToggler.setAttribute('aria-expanded', 'false');
        });
    }
});