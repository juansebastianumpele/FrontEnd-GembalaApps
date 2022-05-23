/* eslint-env node */
/* eslint-disable-next-line import/no-extraneous-dependencies */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/base',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-prettier',
    'airbnb-base',
  ],
  env: {
    'vue/setup-compiler-macros': true,
    browser: true,
    commonjs: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['**/vendor/**.js'],
  rules: {
    'prettier/prettier': 'off',
    'max-len': 'off',
    'linebreak-style': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
      },
    },
  },
};
