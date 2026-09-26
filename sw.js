const CACHE_NAME = "tripdhara-cache-v16";
const urlsToCache = [
    "/",
    "/index.html",
    "/services/accommodation/",
    "/services/accommodation/index.html",
    "/services/activities/",
    "/services/activities/index.html",
    "/services/travel/",
    "/services/travel/index.html",
    "/services/packages/",
    "/services/packages/index.html",
    "/terms/",
    "/terms/index.html",
    "/privacy/",
    "/privacy/index.html",
    "/cancellation/",
    "/cancellation/index.html",
    "/refund/",
    "/refund/index.html",
    "/contact/",
    "/contact/index.html",
    "/faq/",
    "/faq/index.html",
    "/404.html",
    "/assets/css/style.css",
    "/assets/js/components.js",
    "/assets/js/main.js",
    "/assets/favicon/site.webmanifest",
];

// Install service worker and cache core static assets safely
self.addEventListener("install", (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.allSettled(
                urlsToCache.map((url) =>
                    cache.add(url).catch((err) => {
                        console.warn(`[SW] Failed to cache asset: ${url}`, err);
                    })
                )
            );
        })
    );
});

// Activate service worker and clear old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Intercept requests and implement hybrid caching
self.addEventListener("fetch", (event) => {
    // Only intercept HTTP/HTTPS GET requests (ignore chrome-extension://, etc.)
    if (event.request.method !== "GET" || !event.request.url.startsWith("http")) return;

    // 1. Navigation requests (HTML pages) -> Network-First
    if (event.request.mode === "navigate") {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    // Update cache with the fresh page
                    if (networkResponse && networkResponse.status === 200) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return networkResponse;
                })
                .catch(async () => {
                    // Fallback to cache if offline
                    const cachedPage = await caches.match(event.request);
                    if (cachedPage) return cachedPage;
                    const indexPage = await caches.match("/index.html");
                    if (indexPage) return indexPage;
                    return caches.match("/");
                })
        );
        return;
    }

    // 2. Static resources (CSS, JS, Images, Fonts) -> Cache-First
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request)
                .then((networkResponse) => {
                    // Check if response is valid
                    if (
                        !networkResponse ||
                        networkResponse.status !== 200 ||
                        (networkResponse.type !== "basic" &&
                            networkResponse.type !== "cors")
                    ) {
                        return networkResponse;
                    }

                    // Dynamically cache images, local assets, and Google Fonts
                    const requestUrl = event.request.url;
                    if (
                        requestUrl.includes("/assets/images/") ||
                        requestUrl.includes("/favicon/") ||
                        requestUrl.includes("fonts.gstatic.com") ||
                        requestUrl.includes("fonts.googleapis.com")
                    ) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    }

                    return networkResponse;
                })
                .catch(() => {
                    // Fail gracefully
                });
        })
    );
});
