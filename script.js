/* ============================================
   ANGELA COUTO — JavaScript
   Scroll animations, header behavior, mobile nav
   ============================================ */

(function () {
    'use strict';

    // --- Header scroll effect ---
    const header = document.getElementById('header');
    let lastScroll = 0;

    function handleHeaderScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll(); // Run on load

    // --- Mobile menu toggle ---
    const menuToggle = document.getElementById('menuToggle');
    const mobileOverlay = document.getElementById('mobileNavOverlay');
    const mobileLinks = mobileOverlay.querySelectorAll('a');

    function toggleMobileMenu() {
        const isActive = menuToggle.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach(function(link) {
        link.addEventListener('click', function () {
            if (menuToggle.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (!target) return;
            
            e.preventDefault();
            
            const headerHeight = header.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // --- Scroll Reveal (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(function(el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: show everything immediately
        revealElements.forEach(function(el) {
            el.classList.add('visible');
        });
    }

    // --- Active navigation link highlight on scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');

    function highlightNavOnScroll() {
        const scrollPos = window.pageYOffset + header.offsetHeight + 100;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

    // --- Subtle parallax on hero image ---
    const heroImg = document.querySelector('.hero-bg-img');
    
    if (heroImg && window.innerWidth > 900) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const heroHeight = document.querySelector('.hero').offsetHeight;
            
            if (scrolled < heroHeight) {
                heroImg.style.transform = 'translateY(' + (scrolled * 0.15) + 'px) scale(' + (1 + scrolled * 0.0001) + ')';
            }
        }, { passive: true });
    }

    // --- Copyright year ---
    const yearEl = document.querySelector('.footer-bottom p');
    if (yearEl) {
        const currentYear = new Date().getFullYear();
        yearEl.innerHTML = yearEl.innerHTML.replace('2024', currentYear);
    }

})();
