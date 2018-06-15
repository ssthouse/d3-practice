<template>
  <div id="container">
    <span id="title" align="center">Fancy Buton</span>
    <svg id="svg"></svg>
  </div>
</template>

<script>
export default {
  name: 'FancyBtn',
  data() {
    return {
      svg: null,
      width: 0,
      height: 0
    }
  },
  methods: {
    init() {
      this.width = this.svg.attr('width')
      this.height = this.svg.attr('height')
    }
  },
  mounted() {
    this.svg = this.$d3.select('#svg')
    this.init()
  }
}
</script>

<style lang="less">
#container {
  position: relative;
  width: 100px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#svg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

#title {
  text-align: center;
}
</style>
