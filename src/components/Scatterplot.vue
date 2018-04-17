<template>
  <div id="scatterplot">
    <svg id="scatterplotSvg"></svg>
    <div id="tooltip" class="tooltip hidden"></div>
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
      this.initAnimation()
      // this.initBrowserTooltip()
      // this.initSvgTooltip()
      this.initHtmlTooltip()
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
          return this.areaScale(d[1])
        })

      labelSelection.exit().remove()
    },
    initAnimation() {
      const self = this
      this.g
        .selectAll('circle')
        .on('mouseover', function(d, i) {
          self.$d3
            .select(this)
            .transition()
            .style('fill', 'red')
        })
        .on('mouseout', function(d, i) {
          self.$d3
            .select(this)
            .transition()
            .style('fill', 'teal')
        })
    },
    initBrowserTooltip() {
      this.$d3
        .selectAll('circle')
        .append('title')
        .text(d => `this dot's value is ${d}`)
    },
    initSvgTooltip() {
      const self = this
      this.$d3
        .selectAll('circle')
        .on('mouseover', function(d, i) {
          const valueIndex = i
          const curNode = self.$d3.select(this)
          const x =
            parseFloat(curNode.attr('cx')) + parseFloat(curNode.attr('r'))
          const y =
            parseFloat(curNode.attr('cy')) + parseFloat(curNode.attr('r'))
          self.g
            .append('text')
            .attr('id', 'tooltip')
            .attr('x', x)
            .attr('y', y)
            .text((d, i) => self.values[valueIndex])
        })
        .on('mouseout', function(d, i) {
          self.$d3.select('#tooltip').remove()
        })
    },
    initHtmlTooltip() {
      const self = this
      this.$d3
        .selectAll('circle')
        .on('mouseover', function(d, i) {
          const curNode = self.$d3.select(this)
          const curIndex = i
          console.log(self.$d3.event.pageX)
          console.log(self.$d3.event.pageY)
          self.$d3
            .select('#tooltip')
            .classed('hidden', false)
            .style('left', self.$d3.event.pageX + 10 + 'px')
            .style('top', self.$d3.event.pageY + 10 + 'px')
            .text(self.values[curIndex])
        })
        .on('mouseout', function(d, i) {
          self.$d3.select('#tooltip').classed('hidden', true)
        })
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
        .range([0, 20])
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
    this.g = svg.append('g')

    this.start()
    window.vue = this
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#scatterplot {
  position: relative;
  padding: 30px;
  #scatterplotSvg {
    padding: 30px;
    width: 1000px;
    height: 480px;

    circle {
      fill: teal;
    }

    #tooltip {
      fill: black;
      text-anchor: left;
      font-size: 16px;
      font-weight: bold;
    }
  }

  // this is html tooltip
  .tooltip {
    position: fixed;
    width: 100px;
    height: 60px;
    line-height: 60px;
    background-color: teal;
    color: white;
    border-radius: 10px;
    pointer-events: none;
    text-align: center;
    vertical-align: middle;
  }

  .hidden {
    visibility: hidden;
  }
}
</style>
