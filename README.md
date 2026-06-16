# PahadiGo - Premium Himalayan Travel & Stay Bookings

PahadiGo is a modern, responsive, and high-performance single-page landing page designed for a premium travel booking and itinerary planning agency in the Himalayas. It showcases services across Uttarakhand and Himachal Pradesh, including chauffeur-driven SUVs, adventure rentals, stays/resorts, and tailored packages.

---

## 🚀 Live Demo & Deployment
This project is fully ready for deployment on **Vercel** or any static hosting provider.
* **Direct Redirection**: Integrates seamlessly with WhatsApp Business API to compile inquiries and direct clients to start booking.

---

## ✨ Features

- **Premium Responsive Design**: Built with custom HSL design tokens, modern Outfit/Inter typography, premium dark gradients, and elegant glassmorphism accents.
- **Interactive Form Cost Estimators**: Dynamic client-side pricing calculators for each booking tab:
  - **Chauffeur Cars**: Calculates price depending on chosen SUV type and duration.
  - **Self-Drive Bikes**: Calculates price depending on cruiser/adventure model and rental days.
  - **Stays & Resorts**: Computes estimate based on category and nights.
  - **Travel Packages**: Calculates total package cost depending on theme and group size.
- **Interactive Testimonials Carousel**: Custom-built sliding testimonials slider with arrows and indicators for premium transitions.
- **Interactive FAQ Accordion**: Responsive question drawers providing direct answers on documents, ground support, and booking policies.
- **Himalayan Live Weather Forecast**: Integrates with the open-source Open-Meteo API to fetch and render live, real-time temperatures and weather conditions for key destinations (Rishikesh, Mukteshwar, Manali, Auli).
- **SEO & Google Rich Snippets Integration**: Embedded valid JSON-LD metadata for search engine optimization:
  - `TravelAgency` Schema (includes coordinates, phone number, operating hours, and social profiles).
  - `FAQPage` Schema (exposes FAQ accordion directly to search engine rich result blocks).

---

## 🛠️ Technology Stack

This project is built using native, lightweight web technologies with **zero frameworks, build compilations, or external runtime dependencies**:

- **HTML5**: Semantic tags for maximum markup readability.
- **CSS3 (Vanilla)**: Responsive styling with flexbox/grid layouts and media queries.
- **JavaScript (ES6+)**: Custom dynamic state manager, scroll reveal intersection observers, form estimators, and weather APIs.

---

## 💻 Local Development

Since this is a static project, you can run it directly:

### Option 1: Direct File Opening
Double-click `index.html` to load the website inside any web browser.

### Option 2: Live Local Server
Start a lightweight static server for hot-reloads and local network sharing:

Using **Node.js**:
```bash
npx http-server -p 3000
```

Using **Python**:
```bash
python -m http.server 3000
```
Open `http://localhost:3000` in your web browser.

---

## 📦 Deployment to Vercel

You can deploy the site instantly in 2 minutes:

### Using Vercel CLI
1. Open terminal inside the project folder.
2. Run command:
   ```bash
   npx vercel
   ```
3. Authenticate, choose **"Create new project"**, and select all default configurations. Vercel automatically detects the static configuration and puts it live.

### Using GitHub Integration
1. Push this code to your GitHub repository.
2. Import the repository in your [Vercel Dashboard](https://vercel.com).
3. Click **"Deploy"**. Future code pushes to GitHub will redeploy the website automatically.
