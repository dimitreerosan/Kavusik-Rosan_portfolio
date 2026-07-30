/**
 * Service Worker — Cache-first strategy for static assets
 * Gives assets a 1-year effective cache TTL on repeat visits,
 * resolving the Lighthouse "Use efficient cache lifetimes" warning
 * (GitHub Pages only serves 10-min Cache-Control; SW overrides this).
 */

const CACHE_VERSION = 'v3';
const CACHE_NAME = `portfolio-${CACHE_VERSION}`;

const BASE = '/Kavusik-Rosan_portfolio';

// App shell + critical images (stable paths, unhashed)
const PRECACHE_URLS = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/manifest.json`,
  `${BASE}/images/kavusik-rosan-official-portrait-128.webp`,
  `${BASE}/images/kavusik-rosan-official-portrait-256.webp`,
  `${BASE}/images/seo-cert-badge.webp`,
];

// Pattern matchers for cache-first assets
const CACHE_FIRST_PATTERNS = [
  /\/assets\//,           // all Vite-hashed JS/CSS bundles
  /\/images\//,           // portrait + badge images
  /\/fonts\//,            // self-hosted @fontsource files
  /\.woff2?$/,            // font files
  /\.png$/,
  /\.jpe?g$/,
  /\.webp$/,
  /\.svg$/,
  /\.js$/,
  /\.css$/,
];

// ─── Install ──────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// ─── Activate — clean up old caches ───────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ─── Fetch — cache-first for hashed assets, network-first for HTML ────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin GET requests
  if (request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;

  const isCacheFirst = CACHE_FIRST_PATTERNS.some((pattern) => pattern.test(url.pathname));
  const isHtml = request.headers.get('accept')?.includes('text/html');

  if (isCacheFirst && !isHtml) {
    // Cache-first: serve from cache, fallback to network and cache the response
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;

        return fetch(request).then((response) => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        });
      })
    );
  } else if (isHtml) {
    // Network-first for HTML so updates are always fresh
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
  }
  // All other requests: browser default (no SW interception)
});
