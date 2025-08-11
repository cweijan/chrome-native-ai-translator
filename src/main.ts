import messages from '@intlify/unplugin-vue-i18n/messages'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import { getAvailableLanguages, getPreferredLanguage } from './utils/lang.util'
import 'virtual:uno.css'
import 'unfonts.css'
import '@/assets/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// #region I18n
let lang = localStorage.getItem('lang') || navigator.language
if (!getAvailableLanguages().includes(lang)) {
  lang = getPreferredLanguage(navigator.languages)
  localStorage.setItem('lang', lang)
}

export const i18n = createI18n({
  locale: lang,
  fallbackLocale: 'en-US',
  warnHtmlMessage: false,
  messages,
  legacy: false,
  globalInjection: true,
})

app.use(i18n)
// #endregion

app.mount('#app')
