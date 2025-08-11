const LOCALES: Record<string, string> = {
  'zh-CN': '简体中文',
  'en-US': 'English (US)',
}

export function getLocaleLabel(locale: string): string {
  return LOCALES[locale] || 'Unknown'
}
