module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/__tests__/**',
    '!**/node_modules/**',
    '!.eslintrc.js',
    '!jest.config.js',
    '!**/vendor/**',
    '!**/coverage/**'
  ],
  coverageReporters: ['json', 'lcov', 'text', 'html'],
  testRegex: '(test|spec)\\.js?$'
};
