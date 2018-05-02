<template>
  <div id="geoLayoutSvgContainer">
    <svg id="geoLayoutSvg"></svg>
  </div>
</template>

<script>
import geoJsonData from './us-states.json'

export default {
  name: 'GeoLayout',
  data() {
    return {
      geoJsonData,
      g: null
    }
  },
  props: [],
  methods: {
    start() {
      const pathGenerator = this.$d3
        .geoPath()
        .projection(this.$d3.geoAlbersUsa())
      const features = this.g
        .selectAll('path')
        .data(this.geoJsonData.features)
        .enter()
        .append('path')
        .attr('d', pathGenerator)
      const self = this
      features
        .on('mouseover', function() {
          self.$d3.select(this).attr('fill', 'teal')
        })
        .on('mouseout', function() {
          self.$d3.select(this).attr('fill', 'black')
        })
    }
  },
  computed: {},
  mounted() {
    const svg = this.$d3.select('#geoLayoutSvg')
    this.g = svg.append('g').attr('transform', 'translate(30, 30)')
    this.start()
  }
}
</script>

<style lang="less">
#geoLayoutSvgContainer {
  width: 100%;
  height: 100%;
  #geoLayoutSvg {
    width: 100%;
    height: 100%;
  }
}
</style>
