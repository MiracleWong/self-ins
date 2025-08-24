// DOM Elements
const loader = document.querySelector('.loader-wrapper');
const sidebar = document.getElementById('sidebar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const skillBars = document.querySelectorAll('.skill-progress');
const typewriter = document.getElementById('typewriter');

// Loading Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
        initAnimations();
    }, 1000);
});

// Mobile Menu Toggle
mobileMenuToggle?.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-active');
    mobileMenuToggle.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('mobile-active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !sidebar.contains(e.target) && 
        !mobileMenuToggle.contains(e.target) && 
        sidebar.classList.contains('mobile-active')) {
        sidebar.classList.remove('mobile-active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Smooth Scrolling Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('mobile-active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// Active Navigation Link Tracking
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Scroll Event Listeners
let ticking = false;

function onScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateActiveNavLink();
            animateOnScroll();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll);

// Typewriter Effect
const typewriterTexts = [
    '十年云原生架构运维经验',
    'Kubernetes/Docker专家',
    '大规模容器平台建设专家',
    '监控体系架构师',
    '性能优化专家'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typewriterEffect() {
    const currentText = typewriterTexts[textIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriter.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        typeSpeed = 500;
    }
    
    setTimeout(typewriterEffect, typeSpeed);
}

// Skill Bars Animation
function animateSkillBars() {
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth;
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate skill bars when skills section is visible
            if (entry.target.id === 'skills') {
                setTimeout(animateSkillBars, 300);
            }
        }
    });
}, observerOptions);

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-category, .highlight-item, .timeline-item, .project-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in-up');
        }
    });
}

// Initialize animations
function initAnimations() {
    // Start typewriter effect
    typewriterEffect();
    
    // Observe sections for animations
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add staggered animation to elements
    const animatedElements = document.querySelectorAll('.highlight-item, .skill-category, .timeline-item, .project-card');
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// Parallax Effect for Hero Background
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Add parallax to scroll event
window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) {
        parallaxEffect();
    }
});

// Resize Event Handler
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('mobile-active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Dynamic Stats Counter
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericValue = parseInt(target.replace(/\D/g, ''));
        const suffix = target.replace(/\d/g, '');
        let current = 0;
        const increment = numericValue / 50;
        
        const updateCounter = () => {
            if (current < numericValue) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                setTimeout(updateCounter, 40);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Animate counters when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            animateCounters();
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

const heroSection = document.getElementById('home');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Add hover effects for interactive elements
const interactiveElements = document.querySelectorAll('.contact-item, .highlight-item, .skill-category, .project-card, .timeline-content');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transform = element.style.transform + ' scale(1.02)';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = element.style.transform.replace(' scale(1.02)', '');
    });
});

// Dark/Light theme toggle (optional enhancement)
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.classList.add('theme-toggle');
    themeToggle.innerHTML = '🌙';
    themeToggle.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 1rem;
        width: 45px;
        height: 45px;
        border: none;
        border-radius: 50%;
        background: var(--secondary-bg);
        color: var(--text-primary);
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1002;
        transition: var(--transition);
        display: none;
    `;
    
    document.body.appendChild(themeToggle);
}

// Initialize theme toggle (commented out for now)
// createThemeToggle();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScroll = debounce(onScroll, 16);
window.removeEventListener('scroll', onScroll);
window.addEventListener('scroll', debouncedScroll);

// Add loading states for dynamic content
function showLoadingState(element) {
    element.style.opacity = '0.5';
    element.style.pointerEvents = 'none';
}

function hideLoadingState(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Error handling for animations
try {
    // Animation initialization with error handling
    window.addEventListener('DOMContentLoaded', () => {
        console.log('Resume website loaded successfully');
    });
} catch (error) {
    console.warn('Animation initialization failed:', error);
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('mobile-active')) {
        sidebar.classList.remove('mobile-active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Focus management for accessibility
navLinks.forEach(link => {
    link.addEventListener('focus', () => {
        link.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});

// Print optimization
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});