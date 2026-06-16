import react from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        jsx: true,
      },
    },
    plugins: {
      react,
      'react-refresh': reactRefresh,
      '@typescript-eslint': typescript,
    },
    rules: {
      'react-refresh/only-export-components': 'warn',
    },
  },
]
