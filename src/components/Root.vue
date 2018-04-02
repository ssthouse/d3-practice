<template>
  <div style="position: relative; width: 100%; height: 100%;">
    <v-btn style="position: absolute; left: 100px; top: 50px;" @click="start">Start</v-btn>
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
        .duration(750)
    },
    update (charArray) {
      const selection = this.g.selectAll('text')
        .data(charArray, d => d)

      selection.transition(this.getTransition())
        .attr('class', 'update')
        .attr('x', (d, i) => i * 42)

      selection.enter()
        .append('text')
        .attr('class', 'enter')
        .attr('y', '-60')
        .attr('x', (d, i) => i * 42)
        .transition(this.getTransition())
        .attr('y', '0')
        .text(d => d)

      selection.exit()
        .attr('class', 'exit')
        .attr('dy', '0em')
        .transition(this.getTransition())
        .attr('y', '60')
        .style('fill-opacity', 1e-6)
        .remove()
    },
    start () {
      const self = this
      this.update(this.alphabet)
      this.$d3.interval(function () {
        self.update(self.getRandomStr())
      }, 1000)
    }
  },
  mounted () {
    const mainSvg = this.$d3.select('#svg')
    this.g = mainSvg.append('g')
      .attr('transform', 'translate(32, 200)')
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
