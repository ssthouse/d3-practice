const seleniumServer = require('selenium-server')
const chromedriver = require('chromedriver')

// we use a nightwatch.conf.js file so we can include comments and helper functions
module.exports = {
  src_folders: [
    'test/src' // Where you are storing your Nightwatch e2e tests
  ],
  output_folder: false, // reports (test outcome) output by nightwatch
  selenium: {
    start_process: true, // tells nightwatch to start/stop the selenium process
    server_path: seleniumServer.path,
    host: '127.0.0.1',
    port: 4444, // standard selenium port
    cli_args: {
      'webdriver.chrome.driver': chromedriver.path
    }
  },
  test_settings: {
    default: {
      screenshots: {
        enabled: false, // if you want to keep screenshots
        path: '' // save screenshots here
      },
      globals: {
        waitForConditionTimeout: 5000 // sometimes internet is slow so wait.
      },
      desiredCapabilities: {
        // use Chrome as the default browser for tests
        browserName: 'chrome'
      }
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true // turn off to test progressive enhancement
      }
    }
  }
}
