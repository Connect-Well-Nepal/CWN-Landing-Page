// ============================================
// CONNECTWELL NEPAL LANDING PAGE SCRIPT
// ============================================

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Check if device is mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Check if device is iOS
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

// Check if device is Android
function isAndroid() {
    return /Android/.test(navigator.userAgent);
}

// ============================================
// THEME MANAGEMENT
// ============================================

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeIcon = document.querySelector('#themeToggle .material-icons');
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// ============================================
// MOBILE MENU
// ============================================

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');

    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
    if (mobileMenuToggle) {
        mobileMenuToggle.classList.toggle('active');
    }
    if (mobileMenuBackdrop) {
        mobileMenuBackdrop.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');

    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }
    if (mobileMenuToggle) {
        mobileMenuToggle.classList.remove('active');
    }
    if (mobileMenuBackdrop) {
        mobileMenuBackdrop.classList.remove('active');
    }
}

// ============================================
// AUTHENTICATION HANDLING
// ============================================

function handleAuth(action) {
    // Show launching soon modal instead of redirecting
    showLaunchingSoonModal();
    
    // Original redirect code (commented out - will be enabled after launch)
    // const appUrl = 'https://app.connectwellnepal.org';
    // const loginUrl = `${appUrl}/login`;
    // const signupUrl = `${appUrl}/signup`;
    // 
    // const targetUrl = action === 'login' ? loginUrl : signupUrl;
    // 
    // // If mobile device, show app/web selection modal
    // if (isMobileDevice()) {
    //     showAppSelectionModal(targetUrl);
    // } else {
    //     // Desktop: direct redirect
    //     window.location.href = targetUrl;
    // }
}


// ============================================
// LAUNCHING SOON MODAL
// ============================================

function showLaunchingSoonModal() {
    const modal = document.getElementById('launchingSoonModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeLaunchingSoonModal() {
    const modal = document.getElementById('launchingSoonModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// ============================================
// APP/WEB SELECTION MODAL
// ============================================

let pendingRedirectUrl = null;

function showAppSelectionModal(url) {
    pendingRedirectUrl = url;
    const modal = document.getElementById('appSelectionModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeAppSelectionModal() {
    const modal = document.getElementById('appSelectionModal');
    if (modal) {
        modal.classList.remove('active');
    }
    pendingRedirectUrl = null;
}

function openInApp() {
    if (!pendingRedirectUrl) return;
    
    const url = pendingRedirectUrl;
    
    // Try to open in app first
    if (isIOS()) {
        // For iOS, try universal links or custom URL scheme
        // Replace with your actual app URL scheme if available
        const appScheme = 'connectwellnepal://';
        window.location.href = appScheme;
        
        // Fallback to web after delay if app doesn't open
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    } else if (isAndroid()) {
        // For Android, try intent URL
        // Replace with your actual app package name if available
        const intentUrl = `intent://${url.replace(/https?:\/\//, '')}#Intent;scheme=https;package=com.connectwellnepal.app;end`;
        
        // Try to open app
        window.location.href = intentUrl;
        
        // Fallback to web after delay if app doesn't open
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    } else {
        // Other mobile devices, just redirect to web
        window.location.href = url;
    }
    
    closeAppSelectionModal();
}

function continueOnWeb() {
    if (pendingRedirectUrl) {
        window.location.href = pendingRedirectUrl;
    }
    closeAppSelectionModal();
}

// ============================================
// SMOOTH SCROLLING
// ============================================

function initSmoothScrolling() {
    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#privacy' || href === '#terms' || href === '#contact') {
                // These are placeholder links, prevent default
                e.preventDefault();
                return;
            }

            if (href === '#') {
                // Handle logo click to go to top
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                closeMobileMenu();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                closeMobileMenu();
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.classList.add('animated');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.9)';
        card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        observer.observe(card);
    });
    
    // Observe screenshot cards with stagger
    document.querySelectorAll('.screenshot-card-flip').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateY(20deg)';
        card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        observer.observe(card);
    });
    
    // Observe stat cards
    document.querySelectorAll('.stat-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.8)';
        card.style.transition = `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`;
        observer.observe(card);
    });
}

// ============================================
// SCREENSHOT CARDS INTERACTIVE ANIMATIONS
// ============================================

function initScreenshotAnimations() {
    const screenshotCards = document.querySelectorAll('.screenshot-card-flip');
    
    screenshotCards.forEach((card, index) => {
        const inner = card.querySelector('.screenshot-card-inner');
        const iconWrapper = card.querySelector('.screenshot-icon-wrapper');
        const icon = card.querySelector('.screenshot-icon');
        
        // Add mouse move parallax effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            inner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
        
        // Add click animation
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
        
        // Animate icon on load
        setTimeout(() => {
            if (iconWrapper) {
                iconWrapper.style.animation = 'iconBounce 0.6s ease-out';
            }
        }, index * 150);
    });
}

// ============================================
// FEATURE CARDS INTERACTIVE EFFECTS
// ============================================

function initFeatureCardAnimations() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        const icon = card.querySelector('.feature-icon');
        
        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Animate icon on hover
        card.addEventListener('mouseenter', () => {
            if (icon) {
                icon.style.animation = 'iconPulse 0.5s ease-out';
            }
        });
    });
}

// ============================================
// ANIMATED COUNTERS FOR STATS
// ============================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return Math.floor(num / 1000) + 'K+';
    }
    return Math.floor(num) + '+';
}

function initAnimatedCounters() {
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber) {
                    const text = statNumber.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (number) {
                        statNumber.textContent = '0+';
                        animateCounter(statNumber, number);
                    }
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.stat-card').forEach(card => {
        observer.observe(card);
    });
}

// ============================================
// PARALLAX SCROLL EFFECTS
// ============================================

function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroRect = hero.getBoundingClientRect();
            
            if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
                const speed = 0.3;
                const yPos = -(scrolled * speed);
                hero.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
}

// ============================================
// TYPING ANIMATION FOR HERO
// ============================================

function initTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    const phrases = [
        'Remote Healthcare Access',
        '24/7 Medical Support',
        'Expert Doctors Available',
        'Secure Video Consultations',
        'Your Health, Our Priority'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal speed when typing
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before starting new phrase
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing animation after a short delay
    setTimeout(() => {
        type();
    }, 1000);
}

// ============================================
// TESTIMONIALS CAROUSEL
// ============================================

function initTestimonialsCarousel() {
    const track = document.getElementById('testimonialsTrack');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    let autoPlayInterval = null;
    
    // Create indicators
    cards.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.classList.add('carousel-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    function updateCarousel() {
        // Update track position
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active card
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoPlay();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
        resetAutoPlay();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
        resetAutoPlay();
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('testimonials') && 
            document.getElementById('testimonials').getBoundingClientRect().top < window.innerHeight &&
            document.getElementById('testimonials').getBoundingClientRect().bottom > 0) {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        }
    });
    
    // Pause on hover
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Initialize
    updateCarousel();
    startAutoPlay();
}

// ============================================
// SCREENSHOT CARDS AUTO-ROTATE (OPTIONAL)
// ============================================

function initScreenshotAutoRotate() {
    const cards = document.querySelectorAll('.screenshot-card-flip');
    let currentIndex = 0;
    
    // Auto-flip cards on hover area
    setInterval(() => {
        if (cards.length === 0) return;
        
        // Reset previous
        if (cards[currentIndex]) {
            cards[currentIndex].classList.remove('auto-flip');
        }
        
        currentIndex = (currentIndex + 1) % cards.length;
        
        // Add flip to current
        if (cards[currentIndex]) {
            cards[currentIndex].classList.add('auto-flip');
            setTimeout(() => {
                cards[currentIndex].classList.remove('auto-flip');
            }, 3000);
        }
    }, 4000);
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

function initNavbarScroll() {
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 8px rgba(26, 47, 90, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(26, 47, 90, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// SCROLL SPY FOR NAVIGATION
// ============================================

function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    function updateActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Update on scroll
    window.addEventListener('scroll', updateActiveLink);

    // Update on load
    updateActiveLink();
}

// ============================================
// CLOSE MODAL ON OUTSIDE CLICK
// ============================================

function initModalCloseOnOutsideClick() {
    const appSelectionModal = document.getElementById('appSelectionModal');
    const launchingSoonModal = document.getElementById('launchingSoonModal');
    
    if (appSelectionModal) {
        appSelectionModal.addEventListener('click', (e) => {
            if (e.target === appSelectionModal) {
                closeAppSelectionModal();
            }
        });
    }
    
    if (launchingSoonModal) {
        launchingSoonModal.addEventListener('click', (e) => {
            if (e.target === launchingSoonModal) {
                closeLaunchingSoonModal();
            }
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Theme toggle event
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking outside or on backdrop
    const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
    if (mobileMenuBackdrop) {
        mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
    }

    document.addEventListener('click', (e) => {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');

        if (mobileMenu && mobileMenuToggle &&
            !mobileMenu.contains(e.target) &&
            !mobileMenuToggle.contains(e.target) &&
            mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize scroll animations
    if (window.IntersectionObserver) {
        initScrollAnimations();
        initAnimatedCounters();
    }
    
    // Initialize interactive animations
    initScreenshotAnimations();
    initFeatureCardAnimations();
    
    // Initialize navbar scroll effect
    initNavbarScroll();

    // Initialize scroll spy for navigation
    initScrollSpy();

    // Initialize parallax effects
    initParallaxEffects();
    
    // Initialize typing animation
    setTimeout(() => {
        initTypingAnimation();
    }, 500);
    
    // Initialize testimonials carousel
    initTestimonialsCarousel();
    
    // Initialize screenshot auto-rotate (optional, can be disabled)
    // initScreenshotAutoRotate();
    
    // Initialize modal close on outside click
    initModalCloseOnOutsideClick();
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAppSelectionModal();
            closeLaunchingSoonModal();
        }
    });
});

// ============================================
// CSS ANIMATIONS (injected dynamically)
// ============================================

function injectAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes iconBounce {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-10px) scale(1.1); }
        }
        
        @keyframes iconPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        }
        
        .screenshot-card-flip.auto-flip .screenshot-card-inner {
            animation: autoFlip 3s ease-in-out;
        }
        
        @keyframes autoFlip {
            0%, 100% { transform: rotateY(0deg); }
            50% { transform: rotateY(180deg); }
        }
        
        .feature-card.animated {
            animation: cardPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes cardPop {
            0% {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
            }
            60% {
                transform: translateY(-5px) scale(1.02);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .screenshot-card-flip.animated {
            animation: screenshotSlide 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes screenshotSlide {
            0% {
                opacity: 0;
                transform: translateY(50px) rotateY(20deg);
            }
            100% {
                opacity: 1;
                transform: translateY(0) rotateY(0deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// PERFORMANCE: LAZY LOADING IMAGES (if added later)
// ============================================

if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Inject animation styles on load
injectAnimationStyles();
