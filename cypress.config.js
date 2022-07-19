const { defineConfig } = require('cypress')

module.exports = defineConfig({
  'cypress-watch-and-reload': {
    watch: 'js/*',
  },
  env: {
    grepFilterSpecs: true,
    grepOmitFiltered: true,
  },
  projectId: 'ovmwmi',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:8888',
    excludeSpecPattern: ['*.page.js', 'utils.js', '*.d.ts'],
    specPattern: 'cypress/e2e/**/*spec.js',
  },
})
