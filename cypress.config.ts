import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'ovmwmi',
  e2e: {
    env: {
      'cypress-watch-and-reload': {
        watch: 'js/*',
      },
      grepFilterSpecs: true,
      grepOmitFiltered: true,
    },
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:8888',
    excludeSpecPattern: ['*.page.ts', 'utils.ts', '*.d.ts'],
    specPattern: 'cypress/e2e/**/*spec.{js,ts}',
    experimentalRunAllSpecs: true,
  },
})
