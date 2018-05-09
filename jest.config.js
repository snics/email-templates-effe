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
  coverageFormats: ['json', 'html'],
  testRegex: '(test|spec)\\.js?$'
};
