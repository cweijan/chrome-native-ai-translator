export const LocalLanguageDetector = {
    status: 'ready' as any,
    instance: {
        detect: (text: string): Promise<LanguageDetectionResult[]> => {
            let detectedLanguage = 'en'
            const chineseText = text.match(/[\u4e00-\u9fa5]+/g)
            if (chineseText) {
                const chineseLength = chineseText.join('').length
                if (chineseLength / text.length > 0.4) {
                    detectedLanguage = 'zh-Hans'
                }
            }
            return Promise.resolve([{
                detectedLanguage,
                confidence: 1,
            }])
        },
    } as LanguageDetectorInstance,
}
