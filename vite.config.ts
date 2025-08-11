import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import Unfont from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
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
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
