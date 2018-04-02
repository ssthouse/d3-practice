<template>
  <div style="position: relative; width: 100%; height: 100%;">
    <svg id="tooltip-svg"></svg>
  </div>
</template>

<script>
import csvData from './data.csv'

export default {
  name: 'Tooltip',
  data () {
    return {
      g: null,
      data: [],
      parseDate: this.$d3.timeParse('%d-%b-%y'),
      formatTime: this.$d3.timeFormat('%e %B'),
      xScale: this.$d3.scaleTime().range([0, 600]),
      yScale: this.$d3.scaleLinear().range([300, 0])
    }
  },
  methods: {
    start () {
      const xAxis = this.$d3.axisBottom([0, 600])
        .scale(this.xScale).ticks(5)
      const yAxis = this.$d3.axisLeft([300, 0])
        .scale(this.yScale).ticks(5)

      const valueLine = this.$d3.line()
        .x(d => this.xScale(d.date))
        .y(d => this.yScale(d.close))

      // init scale domain
      this.xScale.domain(this.$d3.extent(this.data, d => d.date))
      this.yScale.domain([0, this.$d3.max(this.data, d => d.close)])

      // draw data line
      this.g.append('path')
        .attr('class', 'line')
        .attr('d', valueLine(this.data))
    },
    parseCsvData () {
      for (let i = 0; i < csvData.length; i++) {
        let d = csvData[i]
        // d.date = this.parseDate(d.date)
        // d.close = parseInt(d.close)
        this.data.push({
          'date': this.parseDate(d.date),
          'close': parseInt(d.close)
        })
      }
    }
  },
  created () {
    if (this.data.length === 0) {
      this.parseCsvData()
    }
  },
  mounted () {
    const svg = this.$d3.select('#tooltip-svg')
      .attr('width', 600)
      .attr('height', 300)
    this.g = svg.append('g')
      .attr('transform', 'translate(0, 0)')

    this.start()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  body { font: 12px Arial;}

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
  }

  div.tooltip {
    position: absolute;
    text-align: center;
    width: 60px;
    height: 28px;
    padding: 2px;
    font: 12px sans-serif;
    background: lightsteelblue;
    border: 0px;
    border-radius: 8px;
    pointer-events: none;
  }

  #tooltip-svg {
    margin-left: 30px;
    margin-top: 30px;
  }
</style>
