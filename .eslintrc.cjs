/* module.exports = {
  extends: ['@upleveled/upleveled'],
  rules: {
    '@next/next/link-passhref': 'error',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
  },
  plugins: ['next'],
}; */

module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    '@next/next/link-passhref': 'error',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
  },
  plugins: ['next'],
};
