<template>
  <div id="force-layout" style="position: rkelative; width: 100%; height: 100%;">
    <svg id="force-layout-svg"></svg>
  </div>
</template>

<script>
/**
 * create an array of objects
 * call forceSimulation, passing in the array of objects
 * add one or more force functions (e.g. forceManyBody, forceCenter, forceCollide) to the system
 * set up a callback function to update the element positions after each tick
 */

export default {
  name: 'Tree',
  data() {
    return {
      padding: 40,
      width: 600,
      height: 700,
      value: [{}, {}, {}, {}, {}],
      g: null,
      xScale: null,
      yScale: null
    }
  },
  methods: {
    initChartContainer() {
      this.g = this.$d3
        .select('#force-layout-svg')
        .append('g')
        .attr('transform', `translate(100, 100)`)
    },
    start() {
      const self = this
      const ticked = function() {
        const circles = self.g.selectAll('circle').data(self.value)
        circles
          .enter()
          .append('circle')
          .attr('r', 5)
          .merge(circles)
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
        circles.exit().remove()
      }

      const simulation = this.$d3
        .forceSimulation(this.value)
        .force('charge', this.$d3.forceManyBody().strength(10))
        .force('collide', this.$d3.forceCollide().radius(5))
        .force('center', this.$d3.forceCenter(this.width / 2, this.height / 2))
        .force('forceX', this.$d3.forceX(200))
        .force('forceY', this.$d3.forceY(400))
        .on('tick', ticked)
    }
  },
  mounted() {
    this.initChartContainer()
    this.start()
    window.vue = this
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
#force-layout {
  #force-layout-svg {
    padding-left: 30px;
    padding-top: 30px;
    width: 100%;
    height: 100%;
  }

  circle {
    fill: teal;
  }

  .link {
    stroke: teal;
  }

  .label {
    fill: white;
  }
}
</style>
