module.exports = {
  extends: ['@upleveled/upleveled'],
  rules: {
    '@next/next/link-passhref': 'error',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
  },
  plugins: ['next'],
};
