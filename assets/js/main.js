// main.js

// Defensive Google Analytics Event Tracker
function trackEvent(eventName, params = {}) {
    if (typeof gtag === "function") {
        gtag("event", eventName, params);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Navigation Menu Toggle
    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");
            mobileToggle.classList.toggle("open");
            mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        // Close mobile menu when clicking any nav link
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                mobileToggle.classList.remove("open");
                navMenu.classList.remove("open");
                mobileToggle.setAttribute("aria-expanded", "false");
            });
        });

        // Close mobile menu when clicking the logo link
        const logoLink = document.querySelector(".logo-link");
        if (logoLink) {
            logoLink.addEventListener("click", () => {
                mobileToggle.classList.remove("open");
                navMenu.classList.remove("open");
                mobileToggle.setAttribute("aria-expanded", "false");
            });
        }
    }

    // 2. Active Class on Scroll & Sticky Header (Optimized with class toggling and offset caching)
    const navbar = document.getElementById("navbar");
    const sections = document.querySelectorAll("section");
    let sectionOffsets = [];

    function cacheSectionOffsets() {
        sectionOffsets = [];
        sections.forEach((section) => {
            const id = section.getAttribute("id");
            if (id) {
                sectionOffsets.push({
                    id: id,
                    top: section.offsetTop,
                });
            }
        });
    }

    // Cache offsets on load and update them on resize & full page load to avoid reading offsetTop on scroll
    cacheSectionOffsets();
    window.addEventListener("resize", cacheSectionOffsets);
    window.addEventListener("load", cacheSectionOffsets);

    window.addEventListener("scroll", () => {
        // Sticky Header effect via class toggle
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Highlight Active Link based on cached scroll positions
        let current = "";
        sectionOffsets.forEach((sec) => {
            if (window.scrollY >= sec.top - 250) {
                current = sec.id;
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").slice(1) === current) {
                link.classList.add("active");
            }
        });
    });

    // 3. Tab Navigation for Booking Widget
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    const tabContentData = {
        accommodation: {
            image: 'url("/assets/images/luxury_resort.png")',
            tagline: "Premium Stays & Resorts",
            title: "Handpicked Mountain Lodges",
            desc: "Escape to personally pre-inspected cozy homestays, premium wooden cottages, and luxury valley resorts with stunning peak views.",
            stats: [
                { val: "100%", lbl: "Verified Stays" },
                { val: "50+", lbl: "Premium Stays" },
                { val: "4.9★", lbl: "Rated Stays" },
            ],
        },
        activity: {
            image: 'url("/assets/images/hero_background.png")',
            tagline: "Adrenaline & Outdoors",
            title: "Conquer the Himalayan Wilds",
            desc: "Engage in thrilling activities led by certified local instructors: white-water rafting in Rishikesh, paragliding in Bir Billing, or trekking to the highest temple in Tungnath.",
            stats: [
                { val: "100%", lbl: "Certified Guides" },
                { val: "12+", lbl: "Valley Trails" },
                { val: "Zero", lbl: "Safety Issues" },
            ],
        },
        travel: {
            image: 'url("/assets/images/adventure_bike.png")',
            tagline: "Mountain Transit Services",
            title: "Ride Free or Relax in Comfort",
            desc: "Navigate winding passes on a rugged Royal Enfield Himalayan 450, or sit back in a luxury SUV driven by a veteran mountain chauffeur.",
            stats: [
                { val: "50+", lbl: "Bike Fleet" },
                { val: "100%", lbl: "Mountain Drivers" },
                { val: "24/7", lbl: "Roadside Assist" },
            ],
        },
        package: {
            image: 'url("/assets/images/scenic_landscape.avif")',
            tagline: "Bespoke Tour Packages",
            title: "Curated Himalayan Journeys",
            desc: "Embark on the sacred Chardham pilgrimage or request a custom adventure itinerary tailored by local experts to match your group size and pace.",
            stats: [
                { val: "100%", lbl: "Organized Plans" },
                { val: "10k+", lbl: "Pilgrims Guided" },
                { val: "Flexible", lbl: "Re-routing" },
            ],
        },
    };

    const tabButtonsArray = Array.from(tabButtons);
    tabButtonsArray.forEach((button, index) => {
        // Keyboard accessibility for tab controls (Arrow keys)
        button.addEventListener("keydown", (e) => {
            let targetIndex = null;
            if (e.key === "ArrowRight") {
                targetIndex = (index + 1) % tabButtonsArray.length;
            } else if (e.key === "ArrowLeft") {
                targetIndex = (index - 1 + tabButtonsArray.length) % tabButtonsArray.length;
            }
            if (targetIndex !== null) {
                e.preventDefault();
                tabButtonsArray[targetIndex].focus();
                tabButtonsArray[targetIndex].click();
            }
        });

        button.addEventListener("click", () => {
            // Remove active class and update ARIA attributes from all buttons and contents
            tabButtons.forEach((btn) => {
                btn.classList.remove("active");
                btn.setAttribute("aria-selected", "false");
            });
            tabContents.forEach((content) =>
                content.classList.remove("active"),
            );

            // Add active class, set ARIA-selected, and show target content
            button.classList.add("active");
            button.setAttribute("aria-selected", "true");
            const targetTab = button.getAttribute("data-tab");
            const targetContent = document.getElementById(`tab-${targetTab}`);
            if (targetContent) {
                targetContent.classList.add("active");
            }

            // Dynamically update the split screen image panel content
            const imageSide = document.getElementById("booking-image-side");
            const taglineEl = document.getElementById("booking-image-tagline");
            const titleEl = document.getElementById("booking-image-title");
            const descEl = document.getElementById("booking-image-desc");

            if (imageSide && tabContentData[targetTab]) {
                const data = tabContentData[targetTab];
                // Smooth transition fade-out/fade-in
                imageSide.style.opacity = "0.7";
                imageSide.style.transform = "scale(0.99)";

                setTimeout(() => {
                    imageSide.style.backgroundImage = `linear-gradient(rgba(3, 8, 6, 0.45), rgba(3, 8, 6, 0.9)), ${data.image}`;
                    if (taglineEl) taglineEl.textContent = data.tagline;
                    if (titleEl) titleEl.textContent = data.title;
                    if (descEl) descEl.textContent = data.desc;

                    // Update stats
                    data.stats.forEach((stat, index) => {
                        const valEl = document.getElementById(
                            `stat-val-${index + 1}`,
                        );
                        const lblEl = document.getElementById(
                            `stat-lbl-${index + 1}`,
                        );
                        if (valEl) valEl.textContent = stat.val;
                        if (lblEl) lblEl.textContent = stat.lbl;
                    });

                    imageSide.style.opacity = "1";
                    imageSide.style.transform = "scale(1)";
                }, 150);
            }
        });
    });

    // Auto-select tab based on URL search param or hash (e.g. ?tab=travel)
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get("tab") || window.location.hash.replace("#", "");
    if (tabParam) {
        const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabParam}"]`);
        if (targetBtn) {
            targetBtn.click();
        }
    }

    // 3.5. Enhanced Booking Widget Helpers (Counters, Dynamic Selects, Suggestion Pills)

    // Custom Numeric Counter Widget Handler
    const counterButtons = document.querySelectorAll(".counter-btn");
    counterButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute("data-target");
            const input = document.getElementById(targetId);
            if (!input) return;

            let val = parseInt(input.value) || 0;
            const min = parseInt(input.getAttribute("min")) || 1;

            if (btn.classList.contains("plus")) {
                val++;
            } else if (btn.classList.contains("minus")) {
                if (val > min) val--;
            }
            input.value = val;

            // Trigger change event for custom counter updates
            input.dispatchEvent(new Event("change"));
        });
    });

    // Dynamic Selects Handler for Travel Option
    const travelTypeSelect = document.getElementById("travel-type");
    const travelVehicleGroup = document.getElementById("travel-vehicle-group");
    const travelVehicleSelect = document.getElementById("travel-vehicle");

    if (travelTypeSelect && travelVehicleSelect && travelVehicleGroup) {
        const vehicleOptions = {
            cars: `
                <option value="Premium SUV (Fortuner/Scorpio)">Premium SUV (Fortuner/Scorpio)</option>
                <option value="Comfort MPV (Innova/Ertiga)">Comfort MPV (Innova/Ertiga)</option>
                <option value="Sedan (Dzire/Etios)">Sedan (Dzire/Etios)</option>
            `,
            bikes: `
                <option value="Royal Enfield Himalayan 450">Royal Enfield Himalayan 450</option>
                <option value="Royal Enfield Classic 350">Royal Enfield Classic 350</option>
                <option value="Hero XPulse 200">Hero XPulse 200</option>
                <option value="KTM Adventure 390">KTM Adventure 390</option>
            `,
        };

        travelTypeSelect.addEventListener("change", () => {
            const val = travelTypeSelect.value;
            const label = travelVehicleGroup.querySelector("label");

            if (val === "Bike Rental") {
                if (label) label.textContent = "Preferred Bike Model";
                travelVehicleSelect.innerHTML = vehicleOptions.bikes;
            } else {
                if (label) label.textContent = "Preferred Vehicle";
                travelVehicleSelect.innerHTML = vehicleOptions.cars;
            }
        });
    }

    // Dynamic Selects Handler for Activities Options
    const activityTypeSelect = document.getElementById("activity-type");
    const activitySubtypeGroup = document.getElementById(
        "activity-subtype-group",
    );
    const activitySubtypeLabel = document.getElementById(
        "activity-subtype-label",
    );
    const activitySubtypeSelect = document.getElementById("activity-subtype");

    if (activityTypeSelect && activitySubtypeSelect && activitySubtypeLabel) {
        const activityOptions = {
            Trekking: `
                <option value="Tungnath-Chandrashila Trek">Tungnath-Chandrashila Trek</option>
                <option value="Deoriatal Trek">Deoriatal Trek</option>
                <option value="Valley of Flowers Trek">Valley of Flowers Trek</option>
                <option value="Custom Trek Plan">Custom Trek Plan</option>
            `,
            Rafting: `
                <option value="12 km Stretch (Basic Rapids)">12 km Stretch (Basic Rapids)</option>
                <option value="16 km Stretch (Moderate Rapids)">16 km Stretch (Moderate Rapids)</option>
                <option value="24 km Stretch (Adventure Rapids)">24 km Stretch (Adventure Rapids)</option>
                <option value="36 km Stretch (Extreme Rapids)">36 km Stretch (Extreme Rapids)</option>
            `,
            "Bungee Jumping": `
                <option value="83 meters Fixed-Platform Jump">83 meters Fixed-Platform Jump</option>
                <option value="100 meters Ultra Platform Jump">100 meters Ultra Platform Jump</option>
                <option value="Giant Canyon Swing">Giant Canyon Swing</option>
                <option value="Extreme Flying Fox (Zipline)">Extreme Flying Fox (Zipline)</option>
            `,
            Paragliding: `
                <option value="Standard Flight (15-20 Mins)">Standard Flight (15-20 Mins)</option>
                <option value="High Altitude Flight (30-45 Mins)">High Altitude Flight (30-45 Mins)</option>
                <option value="Bir Billing Tandem Flight">Bir Billing Tandem Flight</option>
                <option value="Custom Aero Adventure Flight">Custom Aero Adventure Flight</option>
            `,
        };

        activityTypeSelect.addEventListener("change", () => {
            const val = activityTypeSelect.value;
            activitySubtypeLabel.textContent = `${val} Option`;
            if (activityOptions[val]) {
                activitySubtypeSelect.innerHTML = activityOptions[val];
            }
        });
    }

    // Clickable suggestion pills handler
    const suggestionPills = document.querySelectorAll(
        ".suggestion-pills .pill",
    );
    suggestionPills.forEach((pill) => {
        pill.addEventListener("click", () => {
            const parent = pill.parentElement;
            const targetId = parent.getAttribute("data-target");
            const input = document.getElementById(targetId);
            if (input) {
                input.value = pill.textContent.trim();
                input.dispatchEvent(new Event("input")); // trigger validations if any
            }
        });
    });

    // 4. Scroll Reveal Animations (Intersection Observer)
    const scrollElements = document.querySelectorAll(".animate-scroll");
    const scrollObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    scrollObserver.unobserve(entry.target);
                }
            });
        },
        {
            root: null,
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px",
        },
    );
    scrollElements.forEach((el) => scrollObserver.observe(el));
    // 5. Form Validations (Dynamic Date Constraints & Mobile numbers validation)
    const todayStr = new Date().toISOString().split("T")[0];
    [
        "travel-date",
        "accommodation-checkin",
        "activity-date",
        "package-date",
    ].forEach((id) => {
        const input = document.getElementById(id);
        if (input) {
            input.setAttribute("min", todayStr);
        }
    });

    function validatePhone(phone) {
        const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, "");
        // International phone number validation: between 7 and 15 digits (E.164 compliant)
        return /^\d{7,15}$/.test(cleanPhone);
    }

    [
        "travel-phone",
        "accommodation-phone",
        "activity-phone",
        "package-phone",
        "contact-phone",
    ].forEach((id) => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener("input", () => {
                if (input.value && !validatePhone(input.value)) {
                    input.setCustomValidity(
                        "Please enter a valid phone number with country code (e.g. +1 555 123 4567 or +91 95364 89063).",
                    );
                } else {
                    input.setCustomValidity("");
                }
            });
        }
    });

    // 8. Testimonials Carousel Slider
    const track = document.querySelector(".testimonials-track");
    const cards = document.querySelectorAll(
        ".testimonials-track .testimonial-card",
    );
    const dots = document.querySelectorAll(".slider-dots .dot");
    const prevBtn = document.querySelector(".slider-arrow.prev");
    const nextBtn = document.querySelector(".slider-arrow.next");
    let currentIndex = 0;
    let autoslideInterval;

    function updateSlider(index) {
        if (!track || cards.length === 0) return;

        if (index >= cards.length) index = 0;
        if (index < 0) index = cards.length - 1;
        currentIndex = index;

        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        cards.forEach((card, i) => {
            card.classList.toggle("active", i === currentIndex);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            updateSlider(currentIndex - 1);
            resetAutoslide();
        });
        nextBtn.addEventListener("click", () => {
            updateSlider(currentIndex + 1);
            resetAutoslide();
        });
    }

    dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
            const index = parseInt(e.target.getAttribute("data-index"));
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

    // Touch swipe controls for mobile
    if (track) {
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener(
            "touchstart",
            (e) => {
                touchStartX = e.changedTouches[0].screenX;
            },
            { passive: true },
        );

        track.addEventListener(
            "touchend",
            (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            },
            { passive: true },
        );

        function handleSwipe() {
            const swipeThreshold = 50; // Threshold in pixels
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swiped left, show next slide
                updateSlider(currentIndex + 1);
                resetAutoslide();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swiped right, show previous slide
                updateSlider(currentIndex - 1);
                resetAutoslide();
            }
        }
    }

    if (track && cards.length > 0) {
        startAutoslide();
    }

    // 9. Booking Inquiry Compilation & WhatsApp Redirection
    const recipientPhone = "919536489063";

    // Form 1: Travel Services
    const formTravel = document.getElementById("form-travel");
    if (formTravel) {
        formTravel.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("travel-name").value;
            const phone = document.getElementById("travel-phone").value;
            const type = document.getElementById("travel-type").value;
            const vehicle = document.getElementById("travel-vehicle").value;
            const date = document.getElementById("travel-date").value;
            const days = document.getElementById("travel-days").value;
            const route = document.getElementById("travel-route").value;

            // Track submission in Google Analytics
            trackEvent("booking_form_submit", {
                form_type: "travel",
                vehicle_preference: vehicle,
                duration_days: days,
            });

            const message =
                `*Tripdhara Booking Inquiry - Travel Services*\n\n` +
                `• *Client Name:* ${name}\n` +
                `• *Contact Phone:* ${phone}\n` +
                `• *Travel Option:* ${type}\n` +
                `• *Vehicle Preference:* ${vehicle}\n` +
                `• *Start Date:* ${date}\n` +
                `• *Duration:* ${days} Day(s)\n` +
                `• *Route / Destination:* ${route}\n\n` +
                `_Inquiry sent via Tripdhara.com_`;

            sendWhatsAppInquiry(message);
        });
    }

    // Form 2: Accommodation
    const formAccommodation = document.getElementById("form-accommodation");
    if (formAccommodation) {
        formAccommodation.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("accommodation-name").value;
            const phone = document.getElementById("accommodation-phone").value;
            const type = document.getElementById("accommodation-type").value;
            const checkin = document.getElementById(
                "accommodation-checkin",
            ).value;
            const nights = document.getElementById(
                "accommodation-nights",
            ).value;
            const guests = document.getElementById(
                "accommodation-guests",
            ).value;
            const dest = document.getElementById("accommodation-dest").value;

            // Track submission in Google Analytics
            trackEvent("booking_form_submit", {
                form_type: "accommodation",
                stay_type: type,
                duration_nights: nights,
                guests_count: guests,
            });

            const message =
                `*Tripdhara Booking Inquiry - Accommodation*\n\n` +
                `• *Client Name:* ${name}\n` +
                `• *Contact Phone:* ${phone}\n` +
                `• *Stay Type:* ${type}\n` +
                `• *Check-in Date:* ${checkin}\n` +
                `• *Duration:* ${nights} Night(s)\n` +
                `• *Number of Guests:* ${guests}\n` +
                `• *Destination Region:* ${dest}\n\n` +
                `_Inquiry sent via Tripdhara.com_`;

            sendWhatsAppInquiry(message);
        });
    }

    // Form 3: Activity
    const formActivity = document.getElementById("form-activity");
    if (formActivity) {
        formActivity.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("activity-name").value;
            const phone = document.getElementById("activity-phone").value;
            const type = document.getElementById("activity-type").value;
            const subtype = document.getElementById("activity-subtype").value;
            const date = document.getElementById("activity-date").value;
            const members = document.getElementById("activity-members").value;
            const loc = document.getElementById("activity-loc").value;

            // Track submission in Google Analytics
            trackEvent("booking_form_submit", {
                form_type: "activity",
                activity_type: type,
                activity_subtype: subtype,
                group_size: members,
            });

            const message =
                `*Tripdhara Booking Inquiry - Activity*\n\n` +
                `• *Client Name:* ${name}\n` +
                `• *Contact Phone:* ${phone}\n` +
                `• *Preferred Activity:* ${type} - ${subtype}\n` +
                `• *Activity Date:* ${date}\n` +
                `• *Group Size:* ${members} Person(s)\n` +
                `• *Preferred Location:* ${loc}\n\n` +
                `_Inquiry sent via Tripdhara.com_`;

            sendWhatsAppInquiry(message);
        });
    }

    // Form 4: Package
    const formPackage = document.getElementById("form-package");
    if (formPackage) {
        formPackage.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("package-name").value;
            const phone = document.getElementById("package-phone").value;
            const type = document.getElementById("package-type").value;
            const date = document.getElementById("package-date").value;
            const days = document.getElementById("package-days").value;
            const members = document.getElementById("package-members").value;

            // Track submission in Google Analytics
            trackEvent("booking_form_submit", {
                form_type: "package",
                package_type: type,
                duration_days: days,
                group_size: members,
            });

            const message =
                `*Tripdhara Booking Inquiry - Tour Package*\n\n` +
                `• *Client Name:* ${name}\n` +
                `• *Contact Phone:* ${phone}\n` +
                `• *Package Type:* ${type}\n` +
                `• *Travel Date:* ${date}\n` +
                `• *Duration:* ${days} Day(s)\n` +
                `• *Group Size:* ${members} Member(s)\n\n` +
                `_Inquiry sent via Tripdhara.com_`;

            sendWhatsAppInquiry(message);
        });
    }

    // WhatsApp Redirect Helper with popup blocker fallback
    function sendWhatsAppInquiry(textMessage) {
        const encodedText = encodeURIComponent(textMessage);
        const waUrl = `https://wa.me/${recipientPhone}?text=${encodedText}`;
        const newWin = window.open(waUrl, "_blank", "noopener,noreferrer");
        if (!newWin || newWin.closed || typeof newWin.closed === "undefined") {
            window.location.href = waUrl;
        }
    }

    // 10. FAQ Accordion Collapse/Expand logic
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        if (question && answer) {
            question.addEventListener("click", () => {
                const isOpen = item.classList.contains("active");

                // Close all other FAQ items and update their ARIA attributes
                faqItems.forEach((i) => {
                    i.classList.remove("active");
                    const q = i.querySelector(".faq-question");
                    const a = i.querySelector(".faq-answer");
                    if (q) q.setAttribute("aria-expanded", "false");
                    if (a) a.setAttribute("aria-hidden", "true");
                });

                // If the clicked FAQ item was not open, open it and update its ARIA attributes
                if (!isOpen) {
                    item.classList.add("active");
                    question.setAttribute("aria-expanded", "true");
                    answer.setAttribute("aria-hidden", "false");
                }
            });
        }
    });

    // 11. Trending Routes & Gallery Cards Click / Keyboard Autofill Action
    const interactiveCards = document.querySelectorAll(".route-card, .gallery-card");
    interactiveCards.forEach((card) => {
        const handleCardAction = (e) => {
            // If the user clicked an explicit inner link or button, allow default navigation
            if (e && e.target && e.target.closest("a, button")) {
                return;
            }

            const service = card.getAttribute("data-service");
            const targetRouteValue = card.getAttribute("data-target");
            const customDest = card.getAttribute("data-dest");

            if (!service) return;

            const bookingSec = document.getElementById("booking");
            // If booking section doesn't exist on this subpage, redirect to home page booking section
            if (!bookingSec) {
                window.location.href = `/#booking?tab=${service}`;
                return;
            }

            // Find matching tab button and trigger click to switch
            const tabBtn = document.querySelector(
                `.tab-btn[data-tab="${service}"]`,
            );
            if (tabBtn) {
                tabBtn.click();
            }

            // Helper function to set select value with option matching fallback
            const setSelectValue = (selectEl, val) => {
                if (!selectEl || !val) return;
                // Try direct assignment
                selectEl.value = val;
                if (selectEl.value === val) {
                    selectEl.dispatchEvent(new Event("change"));
                    return;
                }
                // Try case-insensitive or substring matching fallback
                const options = Array.from(selectEl.options);
                const matchedOpt = options.find((opt) =>
                    opt.value.toLowerCase().includes(val.toLowerCase()) ||
                    val.toLowerCase().includes(opt.value.toLowerCase())
                );
                if (matchedOpt) {
                    selectEl.value = matchedOpt.value;
                    selectEl.dispatchEvent(new Event("change"));
                }
            };

            // Helper function to flash glowing highlight on autofilled inputs
            const highlightInput = (inputEl) => {
                if (!inputEl) return;
                inputEl.style.transition = "all 0.3s ease";
                inputEl.style.borderColor = "var(--primary)";
                inputEl.style.boxShadow = "0 0 14px rgba(245, 166, 35, 0.45)";
                setTimeout(() => {
                    inputEl.style.borderColor = "";
                    inputEl.style.boxShadow = "";
                }, 1800);
            };

            // Autofill the input field based on the service
            if (service === "travel") {
                const typeSelect = document.getElementById("travel-type");
                setSelectValue(typeSelect, targetRouteValue);

                const routeInput = document.getElementById("travel-route");
                if (routeInput) {
                    if (customDest) {
                        routeInput.value = customDest;
                    } else if (targetRouteValue === "Chauffeur-driven Car") {
                        routeInput.value =
                            "Dehradun to Mussoorie, Landour & Dhanaulti";
                    } else if (targetRouteValue === "Bike Rental") {
                        routeInput.value =
                            "Rishikesh to Chopta, Tungnath & Sari Village";
                    }
                    highlightInput(routeInput);
                }
            } else if (service === "accommodation") {
                const typeSelect = document.getElementById("accommodation-type");
                setSelectValue(typeSelect, targetRouteValue);

                const destInput = document.getElementById("accommodation-dest");
                if (destInput) {
                    destInput.value = customDest || "Mukteshwar / Manali";
                    highlightInput(destInput);
                }
            } else if (service === "activity") {
                const typeSelect = document.getElementById("activity-type");
                setSelectValue(typeSelect, targetRouteValue);

                const locInput = document.getElementById("activity-loc");
                if (locInput) {
                    locInput.value = customDest || "Chopta / Rishikesh";
                    highlightInput(locInput);
                }
            } else if (service === "package") {
                const typeSelect = document.getElementById("package-type");
                setSelectValue(typeSelect, targetRouteValue);
            }

            // Scroll smoothly to the booking section
            bookingSec.scrollIntoView({ behavior: "smooth" });
        };

        card.addEventListener("click", handleCardAction);
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCardAction(e);
            }
        });
    });

    // 12. Floating WhatsApp Widget Scroll-entry control
    const waWidget = document.querySelector(".whatsapp-float-widget");
    if (waWidget) {
        const updateWaVisibility = () => {
            if (window.scrollY > 300) {
                waWidget.classList.add("visible");
            } else {
                waWidget.classList.remove("visible");
            }
        };
        window.addEventListener("scroll", updateWaVisibility);
        updateWaVisibility(); // Run immediately on load
    }

    // 13. Dynamic Hero Text Typer
    const words = [
        "Himalayan Roads",
        "Adventure Bikes",
        "Luxury Resorts",
        "Bespoke Tours",
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typerSpan = document.getElementById("typer-text");

    function typeEffect() {
        if (!typerSpan || !document.body.contains(typerSpan)) return;
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
    if (typerSpan) typeEffect();

    // 14. Back to Top Button with Scroll Progress
    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
        const circle = document.querySelector(".progress-ring__circle");
        let circumference = 0;

        if (circle && circle.r && circle.r.baseVal) {
            const radius = circle.r.baseVal.value;
            circumference = 2 * Math.PI * radius;
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = circumference;
        }

        const updateBackToTop = () => {
            if (circle && circumference > 0) {
                const scrollTop = window.scrollY;
                const docHeight =
                    document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
                const offset = circumference - scrollPercent * circumference;
                circle.style.strokeDashoffset = offset < 0 ? 0 : offset;
            }

            if (window.scrollY > 300) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        };

        window.addEventListener("scroll", updateBackToTop);
        updateBackToTop(); // Check on load

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 15. Himalayan Live Weather status fetch (Open-Meteo API) - Cached & Optimized
    async function fetchLiveWeather() {
        const locations = [
            {
                name: "Rishikesh",
                lat: 30.0864,
                lon: 78.2676,
                id: "weather-rishikesh",
            },
            {
                name: "Mukteshwar",
                lat: 29.4722,
                lon: 79.645,
                id: "weather-mukteshwar",
            },
            {
                name: "Manali",
                lat: 32.2396,
                lon: 77.1887,
                id: "weather-manali",
            },
            { name: "Auli", lat: 30.5284, lon: 79.567, id: "weather-auli" },
        ];

        // 1. Guard check: only run network requests if weather elements exist on current page
        const hasWeatherElements = locations.some((loc) =>
            document.getElementById(loc.id),
        );
        if (!hasWeatherElements) return;

        // 2. Check local storage cache (valid for 30 minutes)
        const CACHE_KEY = "tripdhara_weather_cache";
        const CACHE_TIME_KEY = "tripdhara_weather_timestamp";
        const now = Date.now();
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

        function updateWeatherUI(dataObj) {
            Object.keys(dataObj).forEach((id) => {
                const item = dataObj[id];
                const container = document.getElementById(id);
                if (container) {
                    const tempSpan = container.querySelector(".temp-val");
                    const condSpan = container.querySelector(".cond-text");
                    if (tempSpan) tempSpan.textContent = `${item.temp}° C`;
                    if (condSpan) condSpan.textContent = item.condition;
                }
            });
        }

        // Use cache if fresh (< 30 mins)
        if (cachedData && cachedTime && now - parseInt(cachedTime) < 30 * 60 * 1000) {
            try {
                updateWeatherUI(JSON.parse(cachedData));
                return;
            } catch (e) {
                // Ignore parse errors and fetch fresh
            }
        }

        // 3. Fetch fresh weather with timeout and fallback to cache
        const newCache = {};
        const weatherPromises = locations.map(async (loc) => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000);

            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,weather_code`,
                    { signal: controller.signal },
                );
                clearTimeout(timeoutId);
                if (!response.ok) throw new Error("API error");
                const data = await response.json();

                const temp = Math.round(data.current.temperature_2m);
                const code = data.current.weather_code;

                let condition = "☀️ Sunny";
                if (code >= 1 && code <= 3) condition = "☁️ Cloudy";
                else if (code === 45 || code === 48) condition = "🌫️ Foggy";
                else if (code >= 51 && code <= 67) condition = "🌦️ Rainy";
                else if (code >= 71 && code <= 77) condition = "❄️ Snowy";
                else if (code >= 80 && code <= 82) condition = "🌦️ Showers";
                else if (code >= 95) condition = "⛈️ Stormy";

                newCache[loc.id] = { temp, condition };
            } catch (err) {
                clearTimeout(timeoutId);
                console.warn(`Weather fetch bypassed for ${loc.name}:`, err.message);
            }
        });

        await Promise.allSettled(weatherPromises);

        if (Object.keys(newCache).length > 0) {
            updateWeatherUI(newCache);
            localStorage.setItem(CACHE_KEY, JSON.stringify(newCache));
            localStorage.setItem(CACHE_TIME_KEY, now.toString());
        } else if (cachedData) {
            // Fallback to expired cache if offline
            try {
                updateWeatherUI(JSON.parse(cachedData));
            } catch (e) {}
        }
    }

    // Fetch once on load if weather section exists
    fetchLiveWeather();

    // 16. Google Analytics Click Tracking for Custom Events
    // Floating WhatsApp Widget (reusing the already declared waWidget)
    if (waWidget) {
        waWidget.addEventListener("click", () => {
            trackEvent("whatsapp_chat_click", {
                button_position: "floating_widget",
            });
        });
    }

    // Hero Section CTAs
    const heroPrimary = document.querySelector(".hero-actions .btn-primary");
    if (heroPrimary) {
        heroPrimary.addEventListener("click", () => {
            trackEvent("hero_button_click", {
                button_text: "Book Your Journey",
            });
        });
    }

    const heroSecondary = document.querySelector(
        ".hero-actions .btn-secondary",
    );
    if (heroSecondary) {
        heroSecondary.addEventListener("click", () => {
            trackEvent("hero_button_click", {
                button_text: "Explore Services",
            });
        });
    }

    // Navigation and Footer Call Buttons
    const navCall = document.querySelector(".cta-btn-nav");
    if (navCall) {
        navCall.addEventListener("click", () => {
            trackEvent("phone_call_click", {
                button_position: "nav_bar",
            });
        });
    }

    // Contact Details Helpline Clicks
    const contactCall = document.querySelector(".detail-item a[href^='tel:']");
    if (contactCall) {
        contactCall.addEventListener("click", () => {
            trackEvent("phone_call_click", {
                button_position: "contact_details",
            });
        });
    }

    const contactWhatsApp = document.querySelector(
        ".detail-item a[href^='https://wa.me']",
    );
    if (contactWhatsApp) {
        contactWhatsApp.addEventListener("click", () => {
            trackEvent("whatsapp_chat_click", {
                button_position: "contact_details",
            });
        });
    }
});
