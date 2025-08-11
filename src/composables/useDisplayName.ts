import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export function useDisplayName() {
  const isSupported = 'Intl' in globalThis && 'DisplayNames' in Intl
  if (!isSupported) {
    return computed(() => ({
      getLabel(lang: string) {
        return lang
      },
    }))
  }
  const { locale, t } = useI18n()

  return computed(() => {
    const displayNames = new Intl.DisplayNames([locale.value], { type: 'language' })
    const unknownLanguage = t('unknown_language')
    return {
      getLabel(lang: string) {
        if (!lang || lang === 'und') {
          return `${unknownLanguage} <${lang}>`
        }
        const label = displayNames.of(lang)
        return label ? `${label} <${lang}>` : lang
      },
    }
  })
}
