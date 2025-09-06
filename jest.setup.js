// Polyfills for Node + Jest
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill fetch, Request, Response, Headers
require("whatwg-fetch");

// Load jest-dom matchers
require("@testing-library/jest-dom");


const nextJest = require("next/jest");


const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // <- must be JS file
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
