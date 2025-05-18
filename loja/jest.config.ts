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
  moduleNameMapper: {
    "@components/(.*)": "<rootDir>/src/app/components/$1",
    "@services/(.*)": "<rootDir>/src/app/services/$1",
    "@models/(.*)": "<rootDir>/src/app/models/$1"

  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: "jsdom",
  verbose: true,

};

export default config;
