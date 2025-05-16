
document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.preloader-progress-bar');
    const percentage = document.querySelector('.preloader-percentage');

    let progress = 0;
    const preloaderInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 1;
        if (progress >= 100) {
            progress = 100;
            clearInterval(preloaderInterval);
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        }
        progressBar.style.width = `${progress}%`;
        percentage.textContent = `${progress}%`;
    }, 50);

    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        if (window.particlesJS) {
            particlesJS('particles-js', newTheme === 'dark' ? particlesDarkConfig : particlesLightConfig);
        }
    });

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');

        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const counters = document.querySelectorAll('.stat-value');
    const speed = 200;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('hero-stats')) {
                    animateCounters();
                }
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(
        '.hero-stats, .feature-card, .solution-content, .testimonial-card, .pricing-card, .resource-card, .case-study-card, .integration-card'
    );
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    const pricingToggle = document.getElementById('pricing-toggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const annualPrices = document.querySelectorAll('.annual-price');

    pricingToggle.addEventListener('change', function () {
        if (this.checked) {
            monthlyPrices.forEach(price => price.style.display = 'none');
            annualPrices.forEach(price => price.style.display = 'inline');
        } else {
            monthlyPrices.forEach(price => price.style.display = 'inline');
            annualPrices.forEach(price => price.style.display = 'none');
        }
    });

    annualPrices.forEach(price => price.style.display = 'none');

    const testimonialSwiper = new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });

    const particlesLightConfig = {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#000000"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.3,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#000000",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    };

    const particlesDarkConfig = {
        ...particlesLightConfig,
        particles: {
            ...particlesLightConfig.particles,
            color: {
                value: "#ffffff"
            },
            line_linked: {
                ...particlesLightConfig.particles.line_linked,
                color: "#ffffff"
            }
        }
    };

    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', html.getAttribute('data-theme') === 'dark' ? particlesDarkConfig : particlesLightConfig);
    }

    function initGSAPAnimations() {
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            gsap.from('.hero-title', {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out'
            });

            gsap.from('.hero-subtitle', {
                opacity: 0,
                y: 50,
                duration: 1,
                delay: 0.2,
                ease: 'power3.out'
            });

            gsap.from('.hero-actions', {
                opacity: 0,
                y: 50,
                duration: 1,
                delay: 0.4,
                ease: 'power3.out'
            });

            gsap.from('.hero-image', {
                opacity: 0,
                x: 100,
                duration: 1,
                delay: 0.6,
                ease: 'power3.out'
            });

            gsap.utils.toArray('.feature-card').forEach((card, i) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 50,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    delay: i * 0.1
                });
            });

            gsap.to('.hero-image', {
                y: 50,
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

            gsap.from('.testimonial-card', {
                opacity: 0,
                y: 100,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.testimonials-section',
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                }
            });

            gsap.from('.case-study-card', {
                opacity: 0,
                y: 100,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.case-studies-section',
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                }
            });
        }
    }

    if (typeof gsap !== 'undefined') {
        initGSAPAnimations();
    } else {
        window.addEventListener('gsapLoaded', initGSAPAnimations);
    }
    // Form submission handler
    document.getElementById('contactForm').addEventListener('submit', async function (e) {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');

        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                window.location.href = form.querySelector('[name="_next"]').value;
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            submitBtn.textContent = 'Error - Try Again';
            setTimeout(() => {
                submitBtn.textContent = 'Send';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        const submitBtn = contactForm.querySelector('button[type="submit"]');
                        submitBtn.disabled = true;
                        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';

                        setTimeout(() => {
                            contactForm.reset();
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = 'Send Message';
                        }, 3000);
                    } else {
                        throw new Error('Form submission failed');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was a problem submitting your form. Please try again.');
                });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    const videoBackground = document.querySelector('.video-background video');
    if (videoBackground) {
        videoBackground.setAttribute('playsinline', '');
        videoBackground.setAttribute('muted', '');

        document.body.addEventListener('click', function initVideo() {
            videoBackground.play().catch(e => console.log('Video play failed:', e));
            document.body.removeEventListener('click', initVideo);
        }, { once: true });
    }

    const demoVideoTrigger = document.getElementById('demo-video-trigger');
    const demoVideoModal = document.getElementById('demo-video-modal');
    const modalClose = document.querySelector('.modal-close');

    if (demoVideoTrigger && demoVideoModal) {
        demoVideoTrigger.addEventListener('click', () => {
            demoVideoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        modalClose.addEventListener('click', () => {
            demoVideoModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        demoVideoModal.addEventListener('click', (e) => {
            if (e.target === demoVideoModal) {
                demoVideoModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});