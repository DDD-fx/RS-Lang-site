/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
/* eslint-disable */

import type {Config} from '@jest/types';
const config: Config.InitialOptions = {
  verbose: true,
};
export default config;
module.exports = {
  preset: 'ts-jest',
 // testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
      '^(\.{1,2}/.*)\.js$': '$1',
  },
  rootDir: './src/tests',
  transform: {
      '^.+\.(ts|tsx)?$': 'ts-jest',
  //    '.+\.(css|styl|less|sass|scss|png|jpg|webp|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  resetMocks: false,
 // setupFiles: ['jest-localstorage-mock'],
};