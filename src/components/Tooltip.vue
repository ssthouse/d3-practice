<template>
  <div style="position: relative; width: 100%; height: 100%;">
    <v-btn style="position: absolute; left: 100px; top: 50px;" @click="start">Start</v-btn>
    <svg id="tooltipSvg"></svg>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  data () {
    return {
      g: null
    }
  },
  methods: {
  },
  mounted () {
    const mainSvg = this.$d3.select('svg')
    this.g = mainSvg.append('g')
      .attr('transform', 'translate(32, 200)')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
