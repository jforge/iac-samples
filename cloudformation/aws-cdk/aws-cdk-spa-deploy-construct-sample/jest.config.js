module.exports = {
  "roots": [
    "<rootDir>/test",
    "<rootDir>"
  ],
  testMatch: ['**/*.test.ts'],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
}
