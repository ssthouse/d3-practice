<template>
  <div id="scatterplot">
    <svg id="scatterplotSvg"></svg>
  </div>
</template>

<script>
export default {
  name: 'Scatterplot',
  data() {
    return {
      values: [[27, 5], [9, 33], [5, 9], [7, 5], [9, 7], [5, 3]],
      width: 600,
      height: 360,
      xScale: null,
      yScale: null,
      areaScale: null,
      g: null
    }
  },
  methods: {
    start() {
      this.initParams()
      this.initAxis()
      this.startCircleSelection()
    },
    startCircleSelection() {
      const labelSelection = this.g.selectAll('circle').data(this.values)
      labelSelection
        .transition()
        .attr('cx', d => this.xScale(d[0]))
        .attr('cy', d => this.yScale(d[1]))
      labelSelection
        .enter()
        .append('circle')
        .transition()
        .attr('cx', d => this.xScale(d[0]))
        .attr('cy', d => this.yScale(d[1]))
        .attr('r', d => {
          console.log(d[1])
          return this.areaScale(d[1])
          console.log(this.areaScale(d[1]))
        })

      labelSelection.exit().remove()
    },
    initParams() {
      this.xScale = this.$d3
        .scaleLinear()
        .domain([0, this.$d3.max(this.values, d => d[0])])
        .range([0, this.width])

      this.yScale = this.$d3
        .scaleLinear()
        .domain([this.$d3.max(this.values, d => d[1]), 0])
        .range([0, this.height])

      this.areaScale = this.$d3
        .scaleSqrt()
        .domain([0, this.$d3.max(this.values, d => d[1])])
        .range([0, 10])
    },
    initAxis() {
      const xAxis = this.$d3.axisLeft(this.yScale).ticks(5)
      this.g
        .append('g')
        .attr('class', 'axisLeft')
        .attr('transform', `translate(0, 0)`)
        .call(xAxis)
      const yAxis = this.$d3.axisBottom(this.xScale).ticks(5)
      this.g
        .append('g')
        .attr('class', 'axisBottom')
        .attr('transform', `translate(0, ${this.height})`)
        .call(yAxis)
    }
  },
  mounted() {
    const svg = this.$d3.select('#scatterplotSvg')
    this.g = svg.append('g').attr('transform', 'translate(30, 30)')

    this.start()
    window.vue = this
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#scatterplot {
  position: relative;
  #scatterplotSvg {
    margin: 30px;
    width: 1000px;
    height: 480px;

    circle {
      fill: teal;
    }
  }
}
</style>
