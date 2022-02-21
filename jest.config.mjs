const config = {
  // testEnvironment: 'jsdom',
  preset: 'jest-puppeteer',
  testPathIgnorePatterns: ['<rootDir>/util/__tests__'],
  // testPathIgnorePatterns: ['<rootDir>/integration'],
};

export default config;
