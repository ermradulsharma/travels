const CACHE_NAME = "tripdhara-cache-v9";
const urlsToCache = [
    "/",
    "index.html",
    "services/accommodation/",
    "services/accommodation/index.html",
    "services/activities/",
    "services/activities/index.html",
    "services/travel/",
    "services/travel/index.html",
    "services/packages/",
    "services/packages/index.html",
    "assets/css/style.css",
    "assets/js/main.js",
];

// Install service worker and cache core static assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        }),
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
                }),
            );
        }),
    );
    return self.clients.claim();
});

// Intercept requests and implement hybrid caching
self.addEventListener("fetch", (event) => {
    // Only cache GET requests
    if (event.request.method !== "GET") return;

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
                .catch(() => {
                    // Fallback to cache if offline
                    return caches.match("index.html") || caches.match("/");
                }),
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
        }),
    );
});
