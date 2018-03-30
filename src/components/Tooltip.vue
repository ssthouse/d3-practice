<template>
  <div style="position: relative; width: 100%; height: 100%;">
    <v-btn style="position: absolute; left: 100px; top: 50px;" @click="start">Start</v-btn>
    <svg id="tooltipSvg"></svg>
  </div>
</template>

<script>
import data from './data.csv'

export default {
  name: 'Tooltip',
  data () {
    return {
      g: null,
      data: data,
      parseDate: this.$d3.timeFormat('%d-%b-%y').parse,
      formatTime: this.$d3.timeFormat('%e %B'),
      xScale: this.$d3.scaleTime().range(0, 600),
      yScale: this.$d3.scaleLinear().range([600, 0])
    }
  },
  methods: {
    start () {
      // handle data
      const xAxis = this.$d3.axisBottom([0, 600])
        .scale(this.xScale).ticks(5)
      const yAxis = this.$d3.axisLeft([600, 0])
        .scale(this.yScale).ticks(5)

      const valueLine = this.$d3.line()
        .x(d => this.xScale(d.date))
        .y(d => this.yScale(d.close))

      const svg = this.$d3.select('tooltipSvg')
      this.g = svg.append('g')
        .attr('transform', 'translate(30, 30')
    }
  },
  mounted () {
    const svg = this.$d3.select('tooltipSvg')
    this.g = svg.append('g')
      .attr('transform', 'translate(30, 30')

    this.start()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
