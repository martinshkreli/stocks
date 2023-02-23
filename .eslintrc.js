module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
  },
};
