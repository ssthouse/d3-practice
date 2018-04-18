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
      values: [
        { apples: 5, oranges: 10, grapes: 22 },
        { apples: 4, oranges: 12, grapes: 28 },
        { apples: 2, oranges: 19, grapes: 32 },
        { apples: 7, oranges: 23, grapes: 35 },
        { apples: 23, oranges: 17, grapes: 43 }
      ],
      parseDate: this.$d3.timeParse('%d-%b-%y'),
      formatTime: this.$d3.timeFormat('%B-%e'),
      xScale: null,
      yScale: null
    }
  },
  methods: {
    initScales() {},
    initAxis() {},
    start() {
      this.initScales()
      this.initAxis()
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
