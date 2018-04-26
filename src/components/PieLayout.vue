<template>
  <div id="pie" style="position: relative; width: 100%; height: 100%;">
    <svg id="pie-svg"></svg>
  </div>
</template>

<script>
export default {
  name: 'Tree',
  data() {
    return {
      padding: 40,
      width: 600,
      height: 700,
      value: [
        {
          name: 'giant',
          value: 100
        },
        {
          name: 'little',
          value: 90
        },
        {
          name: 'duo',
          value: 80
        }
      ],
      g: null,
      values: [],
      xScale: null,
      yScale: null
    }
  },
  methods: {
    initChartContainer() {
      this.g = this.$d3
        .select('#pie-svg')
        .append('g')
        .attr('transform', `translate(100, 100)`)
    },
    start() {
      const pieData = this.$d3.pie().value(d => d.value)(this.value)
      // draw pie data
      const arcFunc = this.$d3
        .arc()
        .innerRadius(0)
        .outerRadius(100)
      this.g
        .selectAll('.arc')
        .data(pieData)
        .enter()
        .append('path')
        .attr('d', d => {
          arcFunc.startAngle(d.startAngle).endAngle(d.endAngle)
          console.log(arcFunc())
          return arcFunc()
        })
        .attr('fill', (d, i) => this.$d3.schemeSet1[i])
        .attr('class', 'link')
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
#pie {
  #pie-svg {
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
}
</style>
