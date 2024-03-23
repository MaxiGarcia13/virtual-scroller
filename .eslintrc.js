module.exports = {
  env: {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'plugin:storybook/recommended'
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'parser': '@typescript-eslint/parser',
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint',
    'vue'
  ],
  'rules': {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    curly: ['error', 'all'],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    indent: ['error', 2],
    'max-len': ['error', { code: 120, ignoreComments: false }],
    'array-bracket-spacing' : ['error', 'never'],
    'no-multi-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'keyword-spacing'   : ['error', { before: true, after: true }],
    'arrow-spacing':['error', { 'before': true, 'after': true }],
    'space-in-parens':'error',
    'comma-spacing' : 'error',
    'no-dupe-class-members': 'off',
    'no-duplicate-imports': 'error',
    'no-empty-function': 'off',
    'no-template-curly-in-string': 'error',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    'require-atomic-updates': 'error',
    'require-await': 'error'
  }
};
