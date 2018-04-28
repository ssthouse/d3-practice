module.exports = {
  'Test github page': function(browser) {
    var index = browser.page.indexPage()
    index
      .navigate()
      .assert.title('vue-d3-template')
      .click('@rootButton')

    browser.end()
    // browser
    //   .url('localhost:9999/index')
    //   .waitForElementVisible('body')
    //   .assert.title('vue-d3-template')
    //   .end()
  }
}
