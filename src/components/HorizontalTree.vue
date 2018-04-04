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
      g: null
    }
  },
  methods: {
    start() {
      const barSelection = this.$d3
        .select('#horizontal-tree')
        .selectAll('.bar')
        .data(this.barValues)

      barSelection
        .enter()
        .append('div')
        .attr('class', 'bar')
        .style('width', this.barWidth + 'px')
        .style('height', d => d * 10 + 'px')
        .style('left', (d, i) => i * this.barWidth + 'px')

      barSelection.exit().remove()
    }
  },
  mounted() {
    const svg = this.$d3.select('horizontalTreeSvg')
    this.g = svg.append('g').attr('transform', 'translate(30, 30)')

    this.start()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#horizontal-tree {
  position: relative;

  #horizontalTreeSvg {
    margin: 30px;
  }

  .bar {
    position: absolute;
    background-color: teal;
  }
}
</style>
