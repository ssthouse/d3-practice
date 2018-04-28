module.exports = {
  'Test github page': function(browser) {
    browser
      .url('localhost:9999/index')
      .waitForElementVisible('body')
      .assert.title('vue-d3-template')
      .end()
  }
}
