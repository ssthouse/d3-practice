module.exports = {
  'Test index page': function(browser) {
    let indexPage = browser.page.indexPage()
    indexPage.navigate().assert.title('vue-d3-template')
    indexPage.click('@rootBtn')
    browser.pause(500)
    indexPage.click('@horizontalTreeBtn')
    browser.pause(500)
    indexPage.click('@tooltipBtn')
    browser.pause(500)
    indexPage.click('@scatterplotBtn')
    browser.pause(500)
    indexPage.click('@lineChartBtn')
    browser.pause(500)
    indexPage.click('@areaChartBtn')
    browser.pause(500)
    indexPage.click('@stackChartBtn')
    browser.pause(500)
    indexPage.click('@treeBtn')
    browser.pause(500)
    indexPage.click('@pieBtn')
    browser.pause(500)
    indexPage.click('@forceLayoutBtn')
    browser.pause(500)
    browser.end()
  }
}
