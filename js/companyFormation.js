 // Initialize AOS
 AOS.init();

 // Navbar scroll effect
 window.addEventListener('scroll', function() {
     const navbar = document.querySelector('.navbar');
     if (window.scrollY > 50) {
         navbar.classList.add('scrolled');
     } else {
         navbar.classList.remove('scrolled');
     }
 });

 // Lazy load images
 document.addEventListener('DOMContentLoaded', function() {
     const lazyImages = document.querySelectorAll('img.lazy');
     const observer = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
             if (entry.isIntersecting) {
                 const img = entry.target;
                 img.src = img.dataset.src;
                 img.classList.remove('lazy');
                 observer.unobserve(img);
             }
         });
     });
     lazyImages.forEach(img => observer.observe(img));
 });

 // PDF download fallback
 document.getElementById('downloadGuide').addEventListener('click', function(e) {
     const link = this.href;
     const filename = 'DubaiCompanyGuide.pdf';
     e.preventDefault();
     const a = document.createElement('a');
     a.href = link;
     a.download = filename;
     document.body.appendChild(a);
     a.click();
     document.body.removeChild(a);
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