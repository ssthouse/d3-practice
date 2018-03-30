<template>
  <div style="position: relative; width: 100%; height: 100%;">
    <v-btn style="position: absolute; left: 100px; top: 100px;" @click="start">Start</v-btn>
    <svg id="svg"></svg>
  </div>
</template>

<script>
export default {
  name: 'Root',
  data () {
    return {
      alphabet: 'abcdefghijklmnopqrstuvwxyz'.split(''),
      g: null,
      transition: null
    }
  },
  methods: {
    getRandomStr () {
      return this.$d3.shuffle(this.alphabet)
        .slice(0, Math.floor(Math.random() * 16 + 10))
        .sort()
    },
    getTransition () {
      return this.$d3.transition()
        .duration(2000)
    },
    update (charArray) {
      const selection = this.g.selectAll('text')
        .data(charArray, d => d)

      selection.transition(this.getTransition())
        .duration(2000)
        .attr('class', 'update')
        .attr('x', (d, i) => i * 42)

      selection.enter()
        .append('text')
        .attr('class', 'enter')
        .transition(this.getTransition())
        .attr('x', (d, i) => i * 42)
        .attr('dy', '1em')
        .text(d => d)

      selection.exit()
        .attr('class', 'exit')
        .transition(this.getTransition())
        .attr('y', 0)
        .style('fill-opacity', 1e-6)
        .remove()
    },
    start () {
      const self = this
      this.update(this.alphabet)
      this.$d3.interval(function () {
        self.update(self.getRandomStr())
      }, 3000)
    }
  },
  mounted () {
    const mainSvg = this.$d3.select('svg')
    this.g = mainSvg.append('g')
      .attr('transform', 'translate(32, 200)')
    this.transition = this.$d3.transition()
      .duration(1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  text {
    font: bold 48px monospace;
  }

  .enter {
    fill: green;
  }

  .update {
    fill: black;
  }

  #svg {
    width: 100%;
    height: 100%;
  }
</style>
