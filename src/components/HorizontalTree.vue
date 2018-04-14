<template>
  <div id="horizontal-tree">
    <svg id="horizontalTreeSvg"></svg>
    <div class="menu-container">
      <v-btn @click="add">add bar</v-btn>
      <v-btn @click='remove'>remove bar</v-btn>
      <v-btn @click="random">random bar</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorizontalTree',
  data() {
    return {
      barValues: [27, 5, 9, 33, 5, 9, 7, 5, 9, 7, 5, 3, 2],
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
      this.initParams()
      this.startBarSelection()
      this.startLabelSelection()
    },
    startBarSelection() {
      const barSelection = this.g.selectAll('.bar').data(this.barValues)
      barSelection
        .transition()
        .attr('width', this.xScale.bandwidth())
        .attr('height', d => this.yScale(d))
        .attr('x', (d, i) => this.xScale(i))
        .attr('y', d => this.height - this.yScale(d))
        .attr('fill', 'teal')
      barSelection
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .transition()
        .attr('width', this.xScale.bandwidth())
        .attr('height', d => this.yScale(d))
        .attr('x', (d, i) => this.xScale(i))
        .attr('y', d => this.height - this.yScale(d))
        .attr('fill', 'teal')

      barSelection
        .exit()
        .transition()
        .attr('width', 0)
        .remove()

      // TODO test on listener
      const self = this
      this.g
        .selectAll('.bar')
        .on('mouseover', function(d, i) {
          const curNode = self.$d3.select(this)
          curNode.attr('fill', 'red')
        })
        .on('mouseout', function(d, i) {
          self.$d3.select(this).attr('fill', 'teal')
        })
    },
    startLabelSelection() {
      const labelSelection = this.g.selectAll('.label').data(this.barValues)
      labelSelection
        .text(d => d)
        .transition()
        .attr('x', (d, i) => this.xScale(i) + this.xScale.bandwidth() / 2)
        .attr('y', d => this.height - this.yScale(d) - this.labelChartPadding)
      labelSelection
        .enter()
        .append('text')
        .transition()
        .attr('class', 'label')
        .text(d => d)
        .attr('x', (d, i) => this.xScale(i) + this.xScale.bandwidth() / 2)
        .attr('y', d => this.height - this.yScale(d) - this.labelChartPadding)

      labelSelection.exit().remove()
    },
    initParams() {
      this.xScale = this.$d3
        .scaleBand()
        .domain(this.$d3.range(this.barValues.length))
        .rangeRound([0, this.width])
        .paddingInner(0.1)

      this.yScale = this.$d3
        .scaleLinear()
        .domain([0, this.$d3.max(this.barValues)])
        .range([0, this.height])
    },
    add() {
      this.barValues.push(Math.floor(Math.random() * 20 + 5))
      this.start()
    },
    remove() {
      this.barValues.pop()
      this.start()
    },
    random() {
      const newData = []
      for (let i = 0; i < 13; i++) {
        newData.push(Math.floor(Math.random() * 20 + 1))
      }
      this.barValues = newData
      this.start()
    },
    getTransition() {
      return this.$d3.transition().duration(750)
    }
  },
  created() {
    this.initParams()
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

  .label {
    fill: teal;
    text-anchor: middle;
  }

  .menu-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 600px;
  }
}
</style>
