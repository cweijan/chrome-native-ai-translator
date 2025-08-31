import path from 'node:path'
import process from 'node:process'

import { fileURLToPath, URL } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import Unfont from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vueDevTools from 'vite-plugin-vue-devtools'
import htmlPlugin from './plugins/html-plugin'

const isVercelProduction = process.env.VERCEL_ENV === 'production'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    htmlPlugin(),
    vue(),
    vueJsx(),
    vueDevTools(),
    UnoCSS(),
    VueI18nPlugin({
      include: [path.resolve(__dirname, './src/locales/**.json')],
      strictMessage: false,
      dropMessageCompiler: true,
    }),
    Unfont({
      fontsource: {
        families: [
          {
            name: 'Sn Pro',
            weights: [400, 600, 800],
          },
        ],
      },
    }),
    VitePWA({
      strategies: 'generateSW',
      registerType: 'prompt',
      manifest: {
        start_url: '/',
        display: 'standalone',
        name: 'Native AI Translator',
        short_name: 'Native AI Translator',
        icons: [
          {
            src: '/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        theme_color: '#ffffff',
        background_color: '#ffffff',
        // display_override: ['window-controls-overlay'],
      },
      disable: !isVercelProduction,
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff,woff2,svg,webp}'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    cssMinify: 'esbuild',
  },
})
