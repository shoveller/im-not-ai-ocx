import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import functional from 'eslint-plugin-functional'
import unusedImports from 'eslint-plugin-unused-imports'

const functionalStyles = {
  files: ['**/*.{ts,tsx}'],
  plugins: {
    functional
  },
  rules: {
    'functional/no-let': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'functional/no-loop-statements': 'error',
    'functional/immutable-data': 'warn',
    'no-param-reassign': ['error', { props: true }]
  }
}

const unUsedImportsStyles = {
  plugins: {
    'unused-imports': unusedImports
  },
  rules: {
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ]
  }
}

const customCodeStyles = {
  plugins: {
    '@typescript-eslint': tseslint.plugin
  },
  rules: {
    'max-depth': ['error', 2],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'if' },
      { blankLine: 'always', prev: 'function', next: '*' },
      { blankLine: 'always', prev: '*', next: 'function' }
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'TSInterfaceDeclaration',
        message: 'Interface 대신 type 을 사용하세요.'
      },
      {
        selector: 'ConditionalExpression',
        message: '삼항 연산자 대신 if 를 사용하세요.'
      }
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': [
      'error',
      {
        builtinGlobals: true,
        hoist: 'all',
        allow: []
      }
    ]
  }
}

export default tseslint.config([
  globalIgnores([
    '**/*.d.ts',
    '**/*.d.mts',
    '**/*.d.cts',
    'build/**/*',
    'dist/**/*',
    'node_modules/**/*',
    '.wrangler/**/*',
    'eslint.config.mjs'
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    plugins: {
      'react-hooks': reactHooks
    },
    rules: {
      ...reactHooks.configs.recommended.rules
    },
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  functionalStyles,
  unUsedImportsStyles,
  customCodeStyles
])
