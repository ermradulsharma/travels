// index.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close mobile menu when clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // 2. Active Class on Scroll & Sticky Header
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        // Sticky Header effect
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 13, 10, 0.9)';
            navbar.style.padding = '10px 25px';
            navbar.style.borderBottom = '1px solid rgba(245, 166, 35, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 20, 16, 0.7)';
            navbar.style.padding = '15px 30px';
            navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.15)';
        }

        // Highlight Active Link depending on Scroll position
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 3. Tab Navigation for Booking Widget
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and target content
            button.classList.add('active');
            const targetTab = button.getAttribute('data-tab');
            const targetContent = document.getElementById(`tab-${targetTab}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // 4. Scroll Reveal Animations (Intersection Observer)
    const scrollElements = document.querySelectorAll('.animate-scroll');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });
    scrollElements.forEach(el => scrollObserver.observe(el));
    // 5. Form Validations (Dynamic Date Constraints & Mobile numbers validation)
    const todayStr = new Date().toISOString().split('T')[0];
    ['car-date', 'bike-date', 'resort-checkin', 'package-date'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.setAttribute('min', todayStr);
        }
    });

    function validatePhone(phone) {
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        const phoneRegex = /^(?:\+?91|0)?[6-9]\d{9}$/;
        return phoneRegex.test(cleanPhone);
    }

    ['car-phone', 'bike-phone', 'resort-phone', 'package-phone'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', () => {
                if (input.value && !validatePhone(input.value)) {
                    input.setCustomValidity("Please enter a valid 10-digit mobile number.");
                } else {
                    input.setCustomValidity("");
                }
            });
        }
    });

    // 8. Testimonials Carousel Slider
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonials-track .testimonial-card');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    let currentIndex = 0;
    let autoslideInterval;

    function updateSlider(index) {
        if (!track || cards.length === 0) return;

        if (index >= cards.length) index = 0;
        if (index < 0) index = cards.length - 1;
        currentIndex = index;

        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        cards.forEach((card, i) => {
            card.classList.toggle('active', i === currentIndex);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            updateSlider(currentIndex - 1);
            resetAutoslide();
        });
        nextBtn.addEventListener('click', () => {
            updateSlider(currentIndex + 1);
            resetAutoslide();
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            updateSlider(index);
            resetAutoslide();
        });
    });

    function startAutoslide() {
        autoslideInterval = setInterval(() => {
            updateSlider(currentIndex + 1);
        }, 5000);
    }

    function resetAutoslide() {
        clearInterval(autoslideInterval);
        startAutoslide();
    }

    if (track && cards.length > 0) {
        startAutoslide();
    }

    // 9. Booking Inquiry Compilation & WhatsApp Redirection
    const recipientPhone = "917017288052";

    // Form 1: Chauffeur Cars
    const formCars = document.getElementById('form-cars');
    if (formCars) {
        formCars.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('car-name').value;
            const phone = document.getElementById('car-phone').value;
            const type = document.getElementById('car-type').value;
            const date = document.getElementById('car-date').value;
            const days = document.getElementById('car-days').value;
            const route = document.getElementById('car-route').value;

            const message = `*PahadiGo Booking Inquiry - Chauffeur Cars*\n\n` +
                `• *Client Name:* ${name}\n` +
                `• *Contact Phone:* ${phone}\n` +
                `• *Vehicle Type:* ${type}\n` +
                `• *Pick-up Date:* ${date}\n` +
                `• *Duration:* ${days} Day(s)\n` +
                `• *Route / Destination:* ${route}\n\n` +
                `_Inquiry sent via PahadiGo.com_`;

            sendWhatsAppInquiry(message);
        });
    }

    // Form 2: Self-Drive Bikes
    const formBikes = document.getElementById('form-bikes');
    if (formBikes) {
        formBikes.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('bike-name').value;
            const phone = document.getElementById('bike-phone').value;
            const model = document.getElementById('bike-model').value;
            const date = document.getElementById('bike-date').value;
            const days = document.getElementById('bike-days').value;
            const loc = document.getElementById('bike-loc').value;

            const message = `*PahadiGo Booking Inquiry - Self-Drive Bikes*\n\n` +
                `• *Client Name:* ${name}\n` +
                `• *Contact Phone:* ${phone}\n` +
                `• *Preferred Bike:* ${model}\n` +
                `• *Start Date:* ${date}\n` +
                `• *Duration:* ${days} Day(s)\n` +
                `• *Pick-up Location:* ${loc}\n\n` +
                `_Inquiry sent via PahadiGo.com_`;

            sendWhatsAppInquiry(message);
        });
    }

    // Form 3: Stays & Resorts
    const formResorts = document.getElementById('form-resorts');
    if (formResorts) {
        formResorts.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('resort-name').value;
            const phone = document.getElementById('resort-phone').value;
            const type = document.getElementById('resort-type').value;
            const checkin = document.getElementById('resort-checkin').value;
            const nights = document.getElementById('resort-nights').value;
            const guests = document.getElementById('resort-guests').value;
            const dest = document.getElementById('resort-dest').value;

            const message = `*PahadiGo Booking Inquiry - Resorts & Stays*\n\n` +
                `• *Client Name:* ${name}\n` +
                `• *Contact Phone:* ${phone}\n` +
                `• *Stay Category:* ${type}\n` +
                `• *Check-in Date:* ${checkin}\n` +
                `• *Duration:* ${nights} Night(s)\n` +
                `• *Number of Guests:* ${guests}\n` +
                `• *Destination Region:* ${dest}\n\n` +
                `_Inquiry sent via PahadiGo.com_`;

            sendWhatsAppInquiry(message);
        });
    }

    // Form 4: Travel Packages
    const formPackages = document.getElementById('form-packages');
    if (formPackages) {
        formPackages.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('package-name').value;
            const phone = document.getElementById('package-phone').value;
            const theme = document.getElementById('package-theme').value;
            const date = document.getElementById('package-date').value;
            const days = document.getElementById('package-days').value;
            const members = document.getElementById('package-members').value;

            const message = `*PahadiGo Booking Inquiry - Travel Packages*\n\n` +
                `• *Client Name:* ${name}\n` +
                `• *Contact Phone:* ${phone}\n` +
                `• *Package Theme:* ${theme}\n` +
                `• *Travel Date:* ${date}\n` +
                `• *Duration:* ${days} Day(s)\n` +
                `• *Group Size:* ${members} Member(s)\n\n` +
                `_Inquiry sent via PahadiGo.com_`;

            sendWhatsAppInquiry(message);
        });
    }

    // WhatsApp Redirect Helper
    function sendWhatsAppInquiry(textMessage) {
        const encodedText = encodeURIComponent(textMessage);
        const waUrl = `https://wa.me/${recipientPhone}?text=${encodedText}`;
        window.open(waUrl, '_blank');
    }

    // 10. FAQ Accordion Collapse/Expand logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isOpen) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 11. Trending Routes Card Click Autofill Action
    const routeCards = document.querySelectorAll('.route-card');
    routeCards.forEach(card => {
        card.addEventListener('click', () => {
            const service = card.getAttribute('data-service');
            const targetRouteValue = card.getAttribute('data-target');

            // Find matching tab button and trigger click to switch
            const tabBtn = document.querySelector(`.tab-btn[data-tab="${service}"]`);
            if (tabBtn) {
                tabBtn.click();
            }

            // Autofill the input field based on the service
            if (service === 'cars') {
                const routeInput = document.getElementById('car-route');
                if (routeInput) routeInput.value = targetRouteValue;
            } else if (service === 'bikes') {
                const locInput = document.getElementById('bike-loc');
                if (locInput) locInput.value = targetRouteValue;
            } else if (service === 'resorts') {
                const destInput = document.getElementById('resort-dest');
                if (destInput) destInput.value = targetRouteValue;
            } else if (service === 'packages') {
                const themeSelect = document.getElementById('package-theme');
                if (themeSelect) {
                    for (let option of themeSelect.options) {
                        if (option.value === targetRouteValue) {
                            themeSelect.value = targetRouteValue;
                            break;
                        }
                    }
                }
            }

            // Scroll smoothly to the booking section
            const bookingSec = document.getElementById('booking');
            if (bookingSec) {
                bookingSec.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 12. Floating WhatsApp Widget Scroll-entry control
    const waWidget = document.querySelector('.whatsapp-float-widget');
    if (waWidget) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                waWidget.classList.add('visible');
            } else {
                waWidget.classList.remove('visible');
            }
        });
    }

    // 13. Dynamic Hero Text Typer
    const words = ["Himalayan Roads", "Adventure Bikes", "Luxury Resorts", "Bespoke Tours"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typerSpan = document.getElementById('typer-text');

    function typeEffect() {
        if (!typerSpan) return;
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typerSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typerSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            speed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, speed);
    }
    typeEffect();

    // 14. Back to Top Button with Scroll Progress
    const backToTopBtn = document.getElementById('back-to-top');
    const circle = document.querySelector('.progress-ring__circle');
    if (backToTopBtn && circle) {
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;

        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY) / (document.documentElement.scrollHeight - window.innerHeight);
            const offset = circumference - (scrollPercent * circumference);
            circle.style.strokeDashoffset = isNaN(offset) ? circumference : offset;

            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 15. Himalayan Live Weather status fetch (Open-Meteo API)
    async function fetchLiveWeather() {
        const locations = [
            { name: 'Rishikesh', lat: 30.0864, lon: 78.2676, id: 'weather-rishikesh' },
            { name: 'Mukteshwar', lat: 29.4722, lon: 79.6450, id: 'weather-mukteshwar' },
            { name: 'Manali', lat: 32.2396, lon: 77.1887, id: 'weather-manali' },
            { name: 'Auli', lat: 30.5284, lon: 79.5670, id: 'weather-auli' }
        ];

        for (const loc of locations) {
            try {
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,weather_code`);
                if (!response.ok) throw new Error('API error');
                const data = await response.json();

                const temp = Math.round(data.current.temperature_2m);
                const code = data.current.weather_code;

                // Map weather codes to weather emoji and text
                let condition = '☀️ Sunny';
                if (code >= 1 && code <= 3) condition = '☁️ Cloudy';
                else if (code === 45 || code === 48) condition = '🌫️ Foggy';
                else if (code >= 51 && code <= 67) condition = '🌦️ Rainy';
                else if (code >= 71 && code <= 77) condition = '❄️ Snowy';
                else if (code >= 80 && code <= 82) condition = '🌦️ Showers';
                else if (code >= 95) condition = '⛈️ Stormy';

                const container = document.getElementById(loc.id);
                if (container) {
                    const tempSpan = container.querySelector('.temp-val');
                    const condSpan = container.querySelector('.cond-text');
                    if (tempSpan) tempSpan.textContent = `${temp}° C`;
                    if (condSpan) condSpan.textContent = condition;
                }
            } catch (err) {
                console.error(`Error fetching weather for ${loc.name}:`, err);
                const container = document.getElementById(loc.id);
                if (container) {
                    const condSpan = container.querySelector('.cond-text');
                    if (condSpan) condSpan.textContent = 'N/A';
                }
            }
        }
    }

    // Fetch once on load
    fetchLiveWeather();
});