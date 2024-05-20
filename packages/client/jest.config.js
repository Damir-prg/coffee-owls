import dotenv from 'dotenv';
dotenv.config();

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
  },
  moduleNameMapper: {
    '\\.(css|svg|png|jpeg)$': 'identity-obj-proxy',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^widgets/(.*)$': '<rootDir>/src/widgets/$1',
    '^features/(.*)$': '<rootDir>/src/features/$1',
    '^entities/(.*)$': '<rootDir>/src/entities/$1',
    '^shared/(.*)$': '<rootDir>/src/shared/$1',
    '^images/(.*)$': '<rootDir>/src/shared/images/$1',
  },
  modulePaths: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts', 'jest-canvas-mock'],
};
