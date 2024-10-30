const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ujigcx',
  e2e: {
    specPattern: "cypress/integration/**/*.js",  // Matches all `.js` files in `cypress/integration`
    baseUrl: "http://localhost:3000",
    video: true,                  // Enables video recording
    screenshotOnRunFailure: true, // Takes screenshots on failure
    retries: {
      runMode: 2,                 // Retries failed tests twice in run mode
      openMode: 1                 // Retries once in open mode
    },
    defaultCommandTimeout: 10000, // Sets default timeout to 10 seconds for all commands
    failOnStatusCode: false,      // Bypasses errors caused by HTTP status codes
  }
});
