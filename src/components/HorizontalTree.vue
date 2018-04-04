<template>
<div id="horizontal-tree">
  <svg id="horizontalTreeSvg"></svg>
</div>
</template>

<script>
export default {
  name: 'HorizontalTree',
  data() {
    return {
      barValues: [1, 33, 5, 9, 7, 5, 3, 2,1, 33, 5, 9, 7, 5, 3, 2,1, 33, 5, 9, 7, 5, 3, 2],
      barWidth: 30,
      width: 600,
      height: 360,
      labelChartPadding: 8,
      xScale: null,
      yScale: null,
      g: null
    }
  },
  methods: {
    start() {
      this.xScale = this.$d3
        .scaleBand()
        .domain(this.$d3.range(this.barValues.length))
        .rangeRound([0, this.width])
        .paddingInner(0.1)

      this.yScale = this.$d3
        .scaleLinear()
        .domain([0, this.$d3.max(this.barValues)])
        .range([0, this.height])

      const barSelection = this.g.selectAll('.bar').data(this.barValues)

      barSelection
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('width', this.xScale.bandwidth())
        .attr('height', d => this.yScale(d))
        .attr('x', (d, i) => this.xScale(i))
        .attr('y', d => this.height - this.yScale(d))

      barSelection.exit().remove()

      const labelSelection = this.g.selectAll('.label').data(this.barValues)
      labelSelection
        .enter()
        .append('text')
        .attr('class', 'label')
        .text(d => d)
        .attr('x', (d, i) => this.xScale(i) + this.xScale.bandwidth() / 2)
        .attr('y', d => this.height - this.yScale(d) - this.labelChartPadding)
    }
  },
  mounted() {
    const svg = this.$d3.select('#horizontalTreeSvg')
    this.g = svg.append('g').attr('transform', 'translate(30, 30)')

    this.start()
    window.vue = this
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#horizontal-tree {
  position: relative;

  #horizontalTreeSvg {
    margin: 30px;
    width: 1000px;
    height: 480px;
  }

  .bar {
    fill: teal;
  }

  .label {
    fill: teal;
    text-anchor: middle;
  }
}
</style>
