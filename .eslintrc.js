module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    "max-len": [
      0,
      {
        "code": 120
      }
    ],
    'generator-star-spacing': 'off',
    // allow paren-less arrow functions
    'arrow-parens': 'off',
    'one-var': 'off',
    'prefer-promise-reject-errors': 'off',

    'import/first': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "filenames/match-exported": 0,
    "filenames/no-index": 0,
    "vue/html-self-closing": 1,
    "vue/multi-word-component-names": ["off", {
      "ignores": ['index.vue']
    }]
    // "vue/component-name-in-template-casing": ["error", "kebab-case", {
    //   "registeredComponentsOnly": true,
    //   "ignores": []
    // }]
  }
}
