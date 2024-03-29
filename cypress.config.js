const dotenvFlowPlugin = require('cypress-dotenv-flow')
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      config = dotenvFlowPlugin(config)
      config.env = {
        ...process.env,
        ...config.env
      }
      return config
    },
  },
  env: {
    CYPRESS_SEARCH_QUERY: 'test',
    NEXT_PUBLIC_PROVIDER_ID: process.env.NEXT_PUBLIC_PROVIDER_ID,
    NEXT_PUBLIC_PROVIDER_NAME: process.env.NEXT_PUBLIC_PROVIDER_NAME,
    NEXT_PUBLIC_TOKEN: process.env.NEXT_PUBLIC_TOKEN,
    TEST_SCIENTIST_PW: '!test1234',
    NEXT_PUBLIC_PROVIDER_NAME: 'phenovista',
    NEXT_PUBLIC_PROVIDER_ID: '12527',
    TEST_SCIENTIST_USER: 'test@test.com',
    TEST_SESSION_COOKIE: process.env.TEST_SESSION_COOKIE,
  },
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/results/results-[hash].xml',
    toConsole: true,
  },
})
