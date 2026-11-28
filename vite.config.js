import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            // Il manifest resta quello scritto a mano in public/manifest.webmanifest.
            manifest: false,
            registerType: 'autoUpdate',
            injectRegister: 'script-defer',
            workbox: {
                // Codice, stili, icone e manifest salvati subito: l'app si apre anche offline.
                globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'],
                globIgnores: ['asta/**'],
                maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
                cleanupOutdatedCaches: true,
                runtimeCaching: [
                    {
                        // Foto dell'Asta: salvate man mano che compaiono, non tutte all'installazione.
                        urlPattern: ({ url }) => url.pathname.startsWith('/asta/'),
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'asta-foto',
                            expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 365 },
                        },
                    },
                    {
                        urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
                        handler: 'StaleWhileRevalidate',
                        options: { cacheName: 'google-fonts-css' },
                    },
                    {
                        urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-file',
                            expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 365 },
                            cacheableResponse: { statuses: [0, 200] },
                        },
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
        },
    },
    server: {
        host: 'localhost',
    },
});
