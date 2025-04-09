import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  preset: 'jest-preset-angular',
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: "jsdom",
  verbose: true,

};

export default config;
