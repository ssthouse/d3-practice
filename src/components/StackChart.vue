<template>
  <div id=stack-chart style="position: relative; width: 100%; height: 100%;">
    <svg id="stack-chart-svg"></svg>
  </div>
</template>

<script>
import csvData from './data_random.csv'

export default {
  name: 'StackChart',
  data() {
    return {
      padding: 20,
      width: 600,
      height: 300,
      g: null,
      series: null,
      values: [
        {
          month: new Date(2015, 0, 1),
          apples: 3840,
          bananas: 1920,
          cherries: 960,
          dates: 400
        },
        {
          month: new Date(2015, 1, 1),
          apples: 1600,
          bananas: 1440,
          cherries: 960,
          dates: 400
        },
        {
          month: new Date(2015, 2, 1),
          apples: 640,
          bananas: 960,
          cherries: 640,
          dates: 400
        },
        {
          month: new Date(2015, 3, 1),
          apples: 320,
          bananas: 480,
          cherries: 640,
          dates: 400
        }
      ],
      formatTime: this.$d3.timeFormat('%B-%e'),
      xScale: null,
      yScale: null
    }
  },
  methods: {
    start() {
      this.initScales()
      this.initAxis()
      this.initStackChart()
    },
    initScales() {
      this.series = this.$d3
        .stack()
        .keys(['apples', 'bananas', 'cherries', 'dates'])
        .order(this.$d3.stackOrderNone)
        .offset(this.$d3.stackOffsetNone)
      this.xScale = this.$d3
        .scaleLinear()
        .domain([0, this.values.length])
        .range([0, 600])
      const maxYDomain = this.$d3.max(
        this.series[this.series.length - 1],
        d => d[1]
      )
      this.yScale = this.$d3
        .scaleLinear()
        .domain([0, maxYDomain])
        .range([0, 400])
    },
    initAxis() {},
    initStackChart() {
      const stackContainer = this.g
        .selectAll('g')
        .data(this.series)
        .enter()
        .append('g')
      stackContainer
        .selectAll('rect')
        .enter()
        .append('rect')
        .attr('x', (d, i) => this.xScale(i))
        .attr('y', (d, i) => this.yScale(d[1]) - this.yScale(d[0]))
    }
  },
  created() {
    this.parseCsvData()
  },
  mounted() {
    const svg = this.$d3
      .select('#stack-chart-svg')
      .attr('width', 600)
      .attr('height', 400)
    this.g = svg.append('g').attr('transform', 'translate(0, 0)')
    this.start()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
#stack-chart {
  .axis path,
  .axis line {
    fill: none;
    stroke: grey;
    stroke-width: 1;
    shape-rendering: crispEdges;

    font-size: 122;
  }
  .axis {
    font-size: 12px;
  }

  #stack-chart-svg {
    padding-left: 30px;
    padding-top: 30px;
  }
}
</style>
