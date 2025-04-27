// plz dont mess with dis code or site go bye bye  haha (andrew was here)
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            menuBtn.classList.toggle('open');
            if (navLinks) {
                navLinks.classList.toggle('active');

                document.body.classList.toggle('no-scroll', navLinks.classList.contains('active'));
            }
        });
    }

    document.addEventListener('click', function(e) {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && e.target !== menuBtn && !menuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                if (menuBtn) {
                    menuBtn.classList.remove('open');
                }
                document.body.classList.remove('no-scroll');
            }
        }
    });

    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }


    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry, idx) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('scroll-in');
                    }, idx * 120); // stagger
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }


    const logContent = document.querySelector('.log-content');
    let isTyping = false;
    
    function typeText(element, text, speed, callback) {
        if (!element) return;
        
        isTyping = true;
        let i = 0;
        element.textContent = '';
        element.classList.add('typing');
        
        function typing() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else {
                element.classList.remove('typing');
                isTyping = false;
                if (callback) callback();
            }
        }
        
        typing();
    }
 
    const logMessages = [
        "System initialized...",
        "Checking server status...",
        "All systems online.",
        "Server connection established.",
        "Loading resources: 100% complete.",
        "API endpoints operational.",
        "Database connection: successful.",
        "Memory usage: optimal.",
        "Cache cleared successfully.",
        "Monitoring active connections...",
        "Security protocols enabled.",
        "Welcome to RoRanks. We're glad you're here.",
    ];
    
    const systemStatus = document.querySelector('.system-status');
    
    function initSystemLogs() {
        if (!logContent || isTyping) return;
        
        let index = 0;
        
        function typeNextLog() {
            if (index < logMessages.length) {
                const message = `> ${logMessages[index]}`;
                
                if (index > 0) {
                    logContent.innerHTML += '<br>';
                }
                
                const span = document.createElement('span');
                logContent.appendChild(span);
                
                typeText(span, message, 20, function() {
                    index++;
                    setTimeout(typeNextLog, 300);
                });
            } else {

                logContent.scrollTop = logContent.scrollHeight;
            }
        }
        
        typeNextLog();
    }

    if (systemStatus) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(initSystemLogs, 500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(systemStatus);
    }

    const closeButton = document.querySelector('.log-close');
    
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            const systemLogs = document.querySelector('.system-logs');
            if (systemLogs) {
                systemLogs.style.transform = 'translateY(150%)';
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });

                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuBtn.classList.remove('open');
                    document.body.classList.remove('no-scroll');
                }
            }
        });
    });

    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                markInvalid(nameInput, 'Please enter your name');
                isValid = false;
            } else {
                markValid(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                markInvalid(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                markInvalid(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                markValid(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                markInvalid(messageInput, 'Please enter your message');
                isValid = false;
            } else {
                markValid(messageInput);
            }
            
            if (isValid) {

                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = 'Message Sent!';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1500);
            }
        });
    }
    
    function markInvalid(input, message) {
        input.classList.add('invalid');
        
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
        } else {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        }
    }
    
    function markValid(input) {
        input.classList.remove('invalid');
        
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const heroContent = hero.querySelector('.hero-content');
            
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
                heroContent.style.opacity = 1 - (scrollPosition * 0.002);
            }
        });
    }

    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // ms
                    const step = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    const updateCounter = () => {
                        current += step;
                        
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.querySelector('.theme-switch');
    
    if (themeSwitch) {

        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
        
        if (currentTheme === 'light') {
            document.body.classList.add('light-theme');
            themeSwitch.checked = true;
        }
        
        themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
});
