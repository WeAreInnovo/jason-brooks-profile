// ================================================
// Jason Brooks - Personal Profile Website
// Interactive JavaScript
// ================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll behavior ---
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // --- Scroll-reveal animations ---
    const animateElements = document.querySelectorAll(
        '.about-card, .timeline-item, .award-card, .edu-card, .skill-group, .contact-item, .hero-stats, .hero-actions'
    );

    animateElements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 60);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    animateElements.forEach(el => observer.observe(el));

    // --- Active nav link highlighting ---
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');

    const highlightNav = () => {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navAnchors.forEach(a => {
                    a.classList.remove('active-link');
                    if (a.getAttribute('href') === `#${id}`) {
                        a.classList.add('active-link');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Counter animation for hero stats ---
    const counters = document.querySelectorAll('.stat-number');
    let counterAnimated = false;

    const animateCounters = () => {
        if (counterAnimated) return;

        counters.forEach(counter => {
            const text = counter.textContent;
            const match = text.match(/(\d+)/);
            if (!match) return;

            const target = parseInt(match[1]);
            const suffix = text.replace(match[1], '');
            let current = 0;
            const increment = Math.max(1, Math.ceil(target / 40));
            const duration = 1200;
            const step = duration / (target / increment);

            const updateCounter = () => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    return;
                }
                counter.textContent = current + suffix;
                setTimeout(updateCounter, step);
            };

            counter.textContent = '0' + suffix;
            updateCounter();
        });

        counterAnimated = true;
    };

    const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            heroObserver.disconnect();
        }
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) heroObserver.observe(heroStats);
});
