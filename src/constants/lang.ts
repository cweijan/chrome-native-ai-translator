export const LANGUAGES: string[] = [
  'zh-Hans', // 简体中文
  'zh-Hant', // 繁体中文
  'en', // 英语
  'ja', // 日语
  'ru', // 俄语
  'ko', // 韩语
  'es', // 西班牙语
  'fr', // 法语
  'de', // 德语
  'pt', // 葡萄牙语
  'it', // 意大利语
  'nl', // 荷兰语
  'sv', // 瑞典语
  'da', // 丹麦语
  'fi', // 芬兰语
  'no', // 挪威语
  'id', // 印尼语
  'th', // 泰语
  'pl', // 波兰语
  'tr', // 土耳其语
  'vi', // 越南语
  'ar', // 阿拉伯语
  'hi', // 印地语
  'bn', // 孟加拉语
  'kn', // 卡纳达语
  'mr', // 马拉地语
  'hr', // 克罗地亚语
  'ar-Latn', // 阿拉伯语（拉丁字母）
  'cs', // 捷克语
]

export const LANGUAGE_MAP: Record<string, string> = {
  'und': '未知语言',
  'zh': '中文',
  'zh-Hans': '简体中文',
  'zh-Hant': '繁体中文',
  'en': '英语',
  'ja': '日语',
  'ru': '俄语',
  'ko': '韩语',
  'es': '西班牙语',
  'fr': '法语',
  'de': '德语',
  'pt': '葡萄牙语',
  'it': '意大利语',
  'nl': '荷兰语',
  'sv': '瑞典语',
  'da': '丹麦语',
  'fi': '芬兰语',
  'no': '挪威语',
  'id': '印尼语',
  'th': '泰语',
  'pl': '波兰语',
  'tr': '土耳其语',
  'vi': '越南语',
  'ar': '阿拉伯语',
  'hi': '印地语',
  'bn': '孟加拉语',
  'kn': '卡纳达语',
  'mr': '马拉地语',
  'hr': '克罗地亚语',
  'ar-Latn': '阿拉伯语 (拉丁字母)',
  'cs': '捷克语',
}

export function getLangLabel(lang?: string) {
  if (!lang) {
    return '未知'
  }
  return LANGUAGE_MAP[lang ?? ''] ?? lang
}
