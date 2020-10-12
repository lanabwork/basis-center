module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  plugins: [
    'vue'
  ],
  globals: {
    'window': true,
    'localStorage': true,
    'document': true,
    'FormData': true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'import/no-unresolved': 0,
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'import/prefer-default-export': 0,
    'max-len': ["error", { "code": 140 }],
    'no-param-reassign': 0,
    'no-console': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
};
