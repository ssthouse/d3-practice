<template>
  <div id=stack-chart style="position: relative; width: 100%; height: 100%;">
    <svg id="stack-chart-svg"></svg>
    <div>
      <v-btn @click="useAreaStyle">Use area</v-btn>
      <v-btn @click="useRectStyle">Use rect style</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StackChart',
  data() {
    return {
      padding: 40,
      width: 600,
      height: 600,
      g: null,
      series: null,
      values: [
        {
          month: new Date(2015, 0, 1),
          apples: 3840,
          bananas: 1920,
          cherries: 960,
          dates: 400
        },
        {
          month: new Date(2015, 1, 1),
          apples: 1600,
          bananas: 1440,
          cherries: 960,
          dates: 400
        },
        {
          month: new Date(2015, 2, 1),
          apples: 640,
          bananas: 960,
          cherries: 640,
          dates: 400
        },
        {
          month: new Date(2015, 3, 1),
          apples: 320,
          bananas: 480,
          cherries: 640,
          dates: 400
        }
      ],
      formatTime: this.$d3.timeFormat('%B-%e'),
      xScale: null,
      yScale: null,
      stackClassNameList: ['stackOne', 'stackTwo', 'stackThree']
    }
  },
  methods: {
    start() {
      this.initScales()
      this.useRectStyle()
    },
    initScales() {
      const stack = this.$d3
        .stack()
        .keys(['apples', 'bananas', 'cherries'])
        .order(this.$d3.stackOrderNone)
        .offset(this.$d3.stackOffsetNone)
      this.series = stack(this.values)
      this.xScale = this.$d3
        .scaleLinear()
        .domain([0, this.values.length])
        .range([this.padding, this.width - 2 * this.padding])
      const maxYDomain = this.$d3.max(
        this.series[this.series.length - 1],
        d => d[1]
      )
      this.yScale = this.$d3
        .scaleLinear()
        .domain([0, maxYDomain])
        .range([400, 0])
    },
    initAxis() {
      const xAxis = this.$d3.axisBottom().scale(this.xScale)
      this.g
        .append('g')
        .attr('transform', `translate(0, 400)`)
        .attr('class', 'xAxisContainer')
        .call(xAxis)
      const yAxis = this.$d3
        .axisLeft()
        .scale(this.yScale)
        .ticks(5)
      this.g
        .append('g')
        .attr('transform', `translate(${this.padding}, 0)`)
        .call(yAxis)
    },
    initStackChart() {
      const stackContainer = this.g
        .selectAll('.stackContainer')
        .data(this.series)
        .enter()
        .append('g')
        .attr('class', (d, i) => {
          return this.stackClassNameList[i] + ' stackContainer'
        })
      stackContainer
        .selectAll('rect')
        .data(d => d)
        .enter()
        .append('rect')
        .attr('x', (d, i) => this.xScale(i))
        .attr('y', (d, i) => this.yScale(d[1]))
        .attr('width', 100)
        .attr('height', d => Math.abs(this.yScale(d[1]) - this.yScale(d[0])))
    },
    initStackArea() {
      const areaFunc = this.$d3
        .area()
        .x((d, i) => this.xScale(i))
        .y0(d => this.yScale(d[0]))
        .y1(d => this.yScale(d[1]))
      this.g
        .selectAll('.stackContainer')
        .data(this.series)
        .enter()
        .append('path')
        .attr('class', (d, i) => {
          return this.stackClassNameList[i] + ' stackContainer'
        })
        .attr('d', areaFunc)

      this.g
        .selectAll('stackContainer')
        .exit()
        .remove()
    },
    useAreaStyle() {
      this.initChartContainer()
      this.initStackArea()
      this.initAxis()
    },
    useRectStyle() {
      this.initChartContainer()
      this.initStackChart()
      this.initAxis()
    },
    initChartContainer() {
      this.$d3
        .select('#stack-chart-svg')
        .attr('width', this.width)
        .attr('height', this.height)
      this.$d3.select('.chartContainer').remove()
      this.g = this.$d3
        .select('#stack-chart-svg')
        .append('g')
        .attr('transform', `translate(0, 0)`)
        .attr('class', 'chartContainer')
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
#stack-chart {
  padding: 40px;

  .axis path,
  .axis line {
    fill: none;
    stroke: grey;
    stroke-width: 1;
    shape-rendering: crispEdges;

    font-size: 122;
  }
  .axis {
    font-size: 12px;
  }

  #stack-chart-svg {
    padding-left: 30px;
    padding-top: 30px;
  }

  .chartContainer {
    padding: 40px;
  }

  .stackOne {
    fill: teal;
  }

  .stackTwo {
    fill: paleturquoise;
  }

  .stackThree {
    fill: navajowhite;
  }
}
</style>
