
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Replace 'repo-name' with your actual repository name for GitHub Pages
// Or use './' for relative paths which works well with HashRouter
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg', 'data/*'],
      manifest: {
        name: 'LocalDoc Explorer',
        short_name: 'DocExplorer',
        description: 'Visualizador de documentos y fotos locales',
        theme_color: '#2563eb',
        background_color: '#f8fafc',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,pdf,jpg,jpeg}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/data/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'local-data-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      }
    })
  ],
  base: './', // Using relative base for easier GH Pages deployment
});
