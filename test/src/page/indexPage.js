module.exports = {
  url: 'localhost:9999',
  elements: {
    rootBtn: {
      locateStrategy: 'xpath',
      selector: `//div[text()='Root']`
    },
    horizontalTreeBtn: {
      locateStrategy: 'xpath',
      selector: `//div[text()='Horizontal Tree']`
    },
    tooltipBtn: {
      locateStrategy: 'xpath',
      selector: `//div[text()='Tooltip']`
    },
    scatterplotBtn: {
      locateStrategy: 'xpath',
      selector: `//div[text()='Scatterplot']`
    },
    lineChartBtn: {
      locateStrategy: 'xpath',
      selector: `//div[text()='Line Chart']`
    },
    areaChartBtn: {
      locateStrategy: 'xpath',
      selector: `//div[text()='Area Chart']`
    },
    stackChartBtn: {
      locateStrategy: 'xpath',
      selector: `//div[text()='Stack Chart']`
    },
    treeBtn: {
      locateStrategy: 'xpath',
      selector: `//div[text()='Tree']`
    },
    pieBtn: {
      locateStrategy: 'xpath',
      selector: `//div[text()='Pie']`
    },
    forceLayoutBtn: {
      locateStrategy: 'xpath',
      selector: `//div[text()='ForceLayout']`
    }
  }
}
