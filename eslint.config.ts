import antfu from '@antfu/eslint-config'
import pluginOxlint from 'eslint-plugin-oxlint'
import { globalIgnores } from 'eslint/config'

export default antfu(
  {
    unocss: true,
    rules: {
      '@unocss/order': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'unused-imports/no-unused-vars': ['warn', {
        caughtErrors: 'none',
        argsIgnorePattern: '^_',
      }],
    },
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '.oxlintrc.json']),
  ...pluginOxlint.buildFromOxlintConfigFile('./.oxlintrc.json'),
)
