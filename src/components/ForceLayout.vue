<template>
  <div id="force-layout" style="position: rkelative; width: 100%; height: 100%;">
    <svg id="force-layout-svg"></svg>
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
        .select('#force-layout-svg')
        .append('g')
        .attr('transform', `translate(100, 100)`)
    },
    start() {
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
