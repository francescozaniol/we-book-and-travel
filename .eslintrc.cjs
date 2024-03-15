module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config"],
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