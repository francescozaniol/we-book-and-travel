module.exports = {
  root: true,
  plugins: [
    'anti-trojan-source',
    'security-node',
  ],
  extends: [
    '@nuxt/eslint-config',
    'plugin:anti-trojan-source/recommended',
    'plugin:security-node/recommended',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'always'],
    'dot-notation': 0,
    'no-undef': 0,
    'no-return-assign': 0,
    'no-throw-literal': 0,
    'multiline-ternary': 0,
  },
};