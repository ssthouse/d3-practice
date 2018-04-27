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
      categories: ['type1', 'type2', 'type3'],
      value: [],
      simulation: null,
      g: null,
      xScale: null,
      yScale: null
    }
  },
  methods: {
    initValues() {
      for (let i = 0; i < 100; i++) {
        this.value.push({
          name: `name${i}`,
          radius: Math.floor(Math.random() * 12) + 12,
          category: this.categories[i % 3]
        })
      }
      console.log(this.value)
    },
    initChartContainer() {
      this.g = this.$d3
        .select('#force-layout-svg')
        .append('g')
        .attr('transform', `translate(100, 0)`)
    },
    start() {
      const self = this
      const ticked = function() {
        const circles = self.g.selectAll('circle').data(self.value)
        circles
          .enter()
          .append('circle')
          .attr('r', d => d.radius)
          .merge(circles)
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr('class', d => d.category)
          .call(self.enableDragFunc())
        circles.exit().remove()
      }

      this.simulation = this.$d3
        .forceSimulation(this.value)
        .force('charge', this.$d3.forceManyBody().strength(-50))
        .force('collide', this.$d3.forceCollide().radius(d => d.radius + 2))
        .force('center', this.$d3.forceCenter(this.width / 2, this.height / 2))
        .force(
          'forceX',
          this.$d3
            .forceX(d => {
              switch (d.category) {
                case this.categories[0]:
                  return 150
                case this.categories[1]:
                  return 400
                case this.categories[2]:
                  return 650
              }
            })
            .strength(0.5)
        )
        .force('forceY', this.$d3.forceY(400).strength(0.5))
        .on('tick', ticked)

      this.enableDragFunc()
    },
    enableDragFunc() {
      return this.$d3
        .drag()
        .on('start', d => {
          if (!this.$d3.event.active) this.simulation.alphaTarget(0.3).restart()
          d.fx = this.$d3.event.x
          d.fy = this.$d3.event.y
        })
        .on('drag', d => {
          d.fx = this.$d3.event.x
          d.fy = this.$d3.event.y
        })
        .on('end', d => {
          if (!this.$d3.event.active) this.simulation.alphaTarget(0)
          d.fx = null
          d.fy = null
        })
    }
  },
  mounted() {
    this.initValues()
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

  .type1 {
    fill: teal;
  }

  .type2 {
    fill: olivedrab;
  }

  .type3 {
    fill: navajowhite;
  }
}
</style>
