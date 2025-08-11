import { defineConfig, presetIcons, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      dark: 'class',
      preflights: {
        reset: true,
      },
    }),
    presetIcons(),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
})
