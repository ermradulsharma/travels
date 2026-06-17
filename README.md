![Tripdhara Banner](assets/img/og-banner.png)

# 🌊 Tripdhara - Premium Himalayan Travel & Stay Bookings

Tripdhara is a high-performance, modern, and fully responsive single-page Progressive Web App (PWA) designed for a premium travel booking and itinerary planning agency in the Himalayas. It showcases handpicked adventure services, stays, resorts, and packages across Uttarakhand and Himachal Pradesh.

Built with clean architecture, search engine optimization, and offline capabilities, Tripdhara delivers a premium application experience with zero framework overhead.

---

## 🚀 Key Features

### 📱 1. Mobile-First Responsive Layout
- **Horizontal Scrollable Tabs:** Custom-designed booking selector tabs that scroll horizontally on mobile screens rather than wrapping, keeping margins, borders, and layouts clean.
- **Adaptive Navigation Header:** The navigation CTA hides contact numbers on smaller viewports, displaying only the phone icon to prevent layout clutter.
- **Responsive Grids & Typography:** Fluid layout grids (Services, Why Choose Us, Gallery, and Weather widgets) that seamlessly stack (e.g. from 4 columns to 2 columns on tablets, and 1 column on mobile devices).
- **Parallax Scroll Optimizations:** Smooth scrolling experience on touch devices by disabling resource-intensive desktop parallax effects on tablets and mobile screens (`background-attachment: scroll`).

### 👆 2. Touch Swipe Gestures
- **Native Testimonial Carousel:** Supports touch-drag swiping gestures (`touchstart` and `touchend` events) for native carousel navigation on mobile devices.
- **Responsive Slide Navigation:** Navigation arrows are hidden on smaller screens to avoid viewport boundaries, allowing users to scroll by swiping or clicking dots.

### 📶 3. PWA & Offline Support
- **Service Worker (`sw.js`):** Intercepts fetches and caches essential core assets (`/`, `/index.html`, `/index.css`, `/index.js`) to load pages instantly on sub-optimal networks or offline.
- **Web App Manifest (`site.webmanifest`):** Fully configured installation parameters (maskable icons, brand colors, standalone display, and shortcuts) matching premium Android & iOS standards.

### ⚡ 4. High-Performance Architecture
- **No Layout Thrashing:** Section offsets and heights are cached on page load and window resize, preventing costly reflows/forced layouts inside high-frequency scroll event loops.
- **Pure CSS Transitions:** Decoupled layout states (e.g., sticky headers and visual reveals) using CSS class changes (`.scrolled`) rather than JS style injection.

### ☀️ 5. Live Destination Weather Widget
- Fetches real-time temperatures and conditions (Sunny, Rainy, Snowy, etc.) for key Himalayan destinations (Rishikesh, Mukteshwar, Manali, Auli) using the Open-Meteo API.

---

## 🛠️ Technology Stack

- **HTML5**: Semantic elements and structured tagging.
- **CSS3**: Layouts powered by CSS grid, flexbox, custom HSL design variables, and fluid typography.
- **JavaScript (ES6+)**: Custom dynamic state manager, intersection observers, and swiping handlers.
- **Service Worker**: Cache storage operations for offline capabilities.

---

## 💻 Local Development

Run the project locally without any installation or build configurations:

### Option 1: Live Server (Recommended)
Launch a local server for direct testing (which handles service workers correctly):

Using **Python**:
```bash
python -m http.server 3000
```

Using **Node.js**:
```bash
npx http-server -p 3000
```
Open `http://localhost:3000` in your web browser.

### Option 2: Direct File Opening
Double-click `index.html` to open the page directly. Note: Service workers and API calls might require a local HTTP origin to load correctly in modern browsers.

---

## 📦 Deployment

This static site is ready to deploy on any hosting provider in seconds:

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run command inside root folder:
   ```bash
   vercel
   ```
3. Keep default settings, and your site is live!
