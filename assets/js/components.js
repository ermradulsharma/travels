// components.js - Dynamic Component Loader for Tripdhara
(function () {
    // 1. Detect Path Prefix based on current URL depth
    function getPathPrefix() {
        const path = window.location.pathname;
        if (path.includes("/services/")) {
            return "../../";
        } else if (
            path.includes("/terms/") ||
            path.includes("/privacy/") ||
            path.includes("/cancellation/") ||
            path.includes("/refund/") ||
            path.includes("/contact/") ||
            path.includes("/faq/")
        ) {
            return "../";
        }
        return "/";
    }

    const prefix = getPathPrefix();
    const currentPath = window.location.pathname;

    // 2. Dynamic Header Component Generator
    function renderHeader() {
        const headerPlaceholder = document.getElementById("common-header") || document.querySelector("header.header");
        if (!headerPlaceholder) return;

        const homeLink = prefix === "/" ? "/" : prefix;
        const accommodationLink = `${prefix}services/accommodation/`;
        const activitiesLink = `${prefix}services/activities/`;
        const travelLink = `${prefix}services/travel/`;
        const packagesLink = `${prefix}services/packages/`;
        const contactLink = `${prefix}contact/`;
        const aboutLink = prefix === "/" ? "#about" : `${prefix}#about`;

        // Active Link Checker
        const isHome = currentPath === "/" || currentPath.endsWith("/index.html") && !currentPath.includes("/services/");
        const isAccommodation = currentPath.includes("/services/accommodation/");
        const isActivities = currentPath.includes("/services/activities/");
        const isTravel = currentPath.includes("/services/travel/");
        const isPackages = currentPath.includes("/services/packages/");
        const isContact = currentPath.includes("/contact/");

        const headerHTML = `
            <nav class="navbar" id="navbar">
                <div class="logo">
                    <a href="${homeLink}" class="logo-link">
                        <span class="logo-accent">Trip</span>dhara
                    </a>
                </div>
                <ul class="nav-menu">
                    <li><a href="${homeLink}" class="nav-link ${isHome ? 'active' : ''}">Home</a></li>
                    <li><a href="${accommodationLink}" class="nav-link ${isAccommodation ? 'active' : ''}">Accommodation</a></li>
                    <li><a href="${activitiesLink}" class="nav-link ${isActivities ? 'active' : ''}">Activities</a></li>
                    <li><a href="${travelLink}" class="nav-link ${isTravel ? 'active' : ''}">Travel Services</a></li>
                    <li><a href="${packagesLink}" class="nav-link ${isPackages ? 'active' : ''}">Packages</a></li>
                    <li><a href="${aboutLink}" class="nav-link">About Us</a></li>
                    <li><a href="${contactLink}" class="nav-link ${isContact ? 'active' : ''}">Contact</a></li>
                </ul>
                <div class="nav-cta">
                    <a href="tel:+919536489063" class="cta-btn-nav">
                        <svg class="phone-icon" viewBox="0 0 24 24" width="18" height="18">
                            <path fill="currentColor" d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
                        </svg>
                        <span class="cta-text-nav">+91 95364 89063</span>
                    </a>
                    <button class="mobile-toggle" id="mobile-toggle" aria-label="Toggle Menu">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </button>
                </div>
            </nav>
        `;

        headerPlaceholder.className = "header";
        headerPlaceholder.innerHTML = headerHTML;
    }

    // 3. Dynamic Footer Component Generator
    function renderFooter() {
        const footerPlaceholder = document.getElementById("common-footer") || document.querySelector("footer.footer");
        if (!footerPlaceholder) return;

        const homeLink = prefix === "/" ? "/" : prefix;
        const accommodationLink = `${prefix}services/accommodation/`;
        const activitiesLink = `${prefix}services/activities/`;
        const travelLink = `${prefix}services/travel/`;
        const packagesLink = `${prefix}services/packages/`;
        const aboutLink = prefix === "/" ? "#about" : `${prefix}#about`;
        const termsLink = `${prefix}terms/`;
        const privacyLink = `${prefix}privacy/`;
        const cancellationLink = `${prefix}cancellation/`;
        const refundLink = `${prefix}refund/`;
        const faqLink = `${prefix}faq/`;

        const footerHTML = `
            <div class="footer-container">
                <div class="footer-brand">
                    <a href="${homeLink}" class="footer-logo">
                        <span class="logo-accent">Trip</span>dhara
                    </a>
                    <p class="footer-about">
                        Connecting traveler vibes with high-safety chauffeured vehicles, adventure bikes, and verified stays across the scenic Himalayas.
                    </p>
                </div>

                <div class="footer-links-group">
                    <h5>Explore</h5>
                    <ul class="footer-links">
                        <li><a href="${accommodationLink}">Accommodation</a></li>
                        <li><a href="${activitiesLink}">Activities</a></li>
                        <li><a href="${travelLink}">Travel Services</a></li>
                        <li><a href="${packagesLink}">Packages</a></li>
                        <li><a href="${aboutLink}">About Us</a></li>
                    </ul>
                </div>

                <div class="footer-links-group">
                    <h5>Policies &amp; Legal</h5>
                    <ul class="footer-links">
                        <li><a href="${termsLink}">Terms &amp; Conditions</a></li>
                        <li><a href="${privacyLink}">Privacy Policy</a></li>
                        <li><a href="${cancellationLink}">Cancellation &amp; Weather</a></li>
                        <li><a href="${refundLink}">Refund Policy</a></li>
                        <li><a href="${faqLink}">FAQ &amp; Help Desk</a></li>
                    </ul>
                </div>

                <div class="footer-links-group">
                    <h5>Contact</h5>
                    <ul class="footer-links">
                        <li>Phone: +91 95364 89063</li>
                        <li>Address: Dehradun, Uttarakhand, India</li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="footer-divider"></div>
                <div class="footer-bottom-flex section-container">
                    <p class="footer-copyright">&copy; 2026 Tripdhara. All rights reserved.</p>
                </div>
            </div>
        `;

        footerPlaceholder.className = "footer";
        footerPlaceholder.innerHTML = footerHTML;
    }

    // 4. Dynamic Floating Widgets (WhatsApp & Back-to-Top) Generator
    function renderFloatingWidgets() {
        let widgetsContainer = document.getElementById("common-widgets");
        if (!widgetsContainer) {
            widgetsContainer = document.createElement("div");
            widgetsContainer.id = "common-widgets";
            document.body.appendChild(widgetsContainer);
        }

        const widgetsHTML = `
            <!-- Floating WhatsApp Contact Button -->
            <a href="https://wa.me/919536489063?text=Hi%20Tripdhara%2C%20I%20want%20to%20inquire%20about%20a%20himalayan%20booking."
                class="whatsapp-float-widget" target="_blank" rel="noopener noreferrer"
                aria-label="Chat on WhatsApp with Tripdhara">
                <svg class="whatsapp-icon" viewBox="0 0 32 32" width="28" height="28">
                    <path fill="currentColor"
                        d="M16 2a13.9 13.9 0 0 0-12 21L2 30l7.2-1.9A13.9 13.9 0 1 0 16 2zm7.9 19.8c-.3.9-1.8 1.7-2.5 1.8-.7.1-1.6.2-5.2-1.3-4.3-1.8-7.1-6.1-7.3-6.4-.2-.3-1.6-2.2-1.6-4.2s1-2.9 1.4-3.3c.4-.4.8-.5 1.1-.5h.8c.3 0 .6 0 .9.7.3.7 1.1 2.7 1.2 2.9.1.2.1.4 0 .6s-.2.4-.4.6c-.2.2-.4.4-.6.6s-.4.4-.2.8c.5.9 2.2 3.6 4.7 4.7.4.2.8.2 1-.1s1-1.1 1.3-1.5c.3-.4.6-.3.9-.2.3.1 2.2 1 2.6 1.2.4.2.7.3.8.5.1.3.1 1.7-.2 2.6z" />
                </svg>
            </a>

            <!-- Back to Top Button with Scroll Progress -->
            <button id="back-to-top" aria-label="Back to Top">
                <svg class="progress-ring" width="48" height="48">
                    <circle class="progress-ring__circle" stroke="#f5a623" stroke-width="3" fill="transparent" r="20"
                        cx="24" cy="24" />
                </svg>
                <svg class="arrow-icon" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                </svg>
            </button>
        `;

        widgetsContainer.innerHTML = widgetsHTML;
    }

    // 5. Initialize Ingestion on DOM Ready
    function init() {
        renderHeader();
        renderFooter();
        renderFloatingWidgets();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
