<template>
<div>
  <svg id="horizontalTreeSvg"></svg>
  <h1>hi this is test component</h1>
</div>
</template>

<script>
export default {
  name: 'HorizontalTree',
  data () {
    return {
      g: null
    }
  },
  methods: {

  },
  mounted () {
    const svg = this.$d3.select('horizontalTreeSvg')
    this.g = svg.append('g')
      .attr('transform', 'translate(100, 100)')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
