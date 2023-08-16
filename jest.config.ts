/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: false,
  testMatch: ['<rootDir>/tests/**/*.ts'],
};
