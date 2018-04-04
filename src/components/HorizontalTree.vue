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
      barValues: [1, 33, 5, 9, 7, 5, 3, 2],
      barWidth: 30,
      width: 600,
      height: 360,
      xScale: null,
      yScale: null,
      g: null
    }
  },
  methods: {
    start() {
      const barSelection = this.g
        .selectAll('.bar')
        .data(this.barValues)

      this.xScale = this.$d3
        .scaleLinear()
        .domain([0, this.barValues.length])
        .range([0, this.width])

      this.yScale = this.$d3
        .scaleLinear()
        .domain([0, this.$d3.max(this.barValues)])
        .range([0, this.height])

      barSelection
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .style('width', this.barWidth + 'px')
        .style('height', d => this.yScale(d) + 'px')
        .style('x', (d, i) => this.xScale(i) + 'px')
        .style('y', d => this.height - this.yScale(d) + 'px')

      barSelection.exit().remove()
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
}
</style>
