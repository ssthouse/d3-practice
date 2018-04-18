<template>
  <div id=line-chart style="position: relative; width: 100%; height: 100%;">
    <svg id="line-chart-svg"></svg>
  </div>
</template>

<script>
import csvData from './data.csv'

export default {
  name: 'LineChart',
  data() {
    return {
      padding: 20,
      width: 600,
      height: 300,
      g: null,
      values: [],
      parseDate: this.$d3.timeParse('%d-%b-%y'),
      formatTime: this.$d3.timeFormat('%B-%e'),
      xScale: null,
      yScale: null
    }
  },
  methods: {
    initScales() {
      this.xScale = this.$d3
        .scaleTime()
        .range([this.padding, this.width - this.padding])
        .domain(this.$d3.extent(this.values, d => d.date))
      this.yScale = this.$d3
        .scaleLinear()
        .range([this.height - this.padding, this.padding])
        .domain([0, this.$d3.max(this.values, d => d.close)])
    },
    initAxis() {
      const xAxis = this.$d3
        .axisBottom([this.padding, this.width - this.padding])
        .scale(this.xScale)
        .ticks(5)
      const yAxis = this.$d3
        .axisLeft([this.padding, this.height - this.padding])
        .scale(this.yScale)
        .ticks(5)
      // draw axis
      this.g
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + (this.height - this.padding) + ')')
        .call(xAxis)
      this.g
        .append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + this.padding + ',0)')
        .call(yAxis)
    },
    start() {
      this.initScales()
      this.initAxis()

      const valueLine = this.$d3
        .line()
        .x(d => this.xScale(d.date))
        .y(d => this.yScale(d.close))
        .defined((d, i) => {
          if (parseInt(i) % 4 === 0) {
            return false
          }
          return true
        })

      // draw data line
      this.g
        .append('path')
        .datum(this.values)
        .attr('class', 'line')
        .attr('d', valueLine)
    },
    parseCsvData() {
      for (let i = 0; i < csvData.length; i++) {
        let d = csvData[i]
        this.values.push({
          date: this.parseDate(d.date),
          close: parseInt(d.close)
        })
      }
    }
  },
  created() {
    if (this.values.length === 0) {
      this.parseCsvData()
    }
  },
  mounted() {
    const svg = this.$d3
      .select('#line-chart-svg')
      .attr('width', 600)
      .attr('height', 400)
    this.g = svg.append('g').attr('transform', 'translate(0, 0)')
    this.start()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
#line-chart {
  path {
    stroke: steelblue;
    stroke-width: 2;
    fill: none;
  }

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

  #line-chart-svg {
    padding-left: 30px;
    padding-top: 30px;
  }
}
</style>
