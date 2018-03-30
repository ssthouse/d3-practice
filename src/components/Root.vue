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
      g: null
    }
  },
  methods: {
    getRandomStr () {
      return this.$d3.shuffle(this.alphabet)
        .slice(0, Math.floor(Math.random() * 26))
        .sort()
    },
    update (charArray) {
      const selection = this.g.selectAll('text')
        .data(charArray, d => d)

      selection.attr('class', 'update')

      selection.enter()
        .append('text')
        .attr('class', 'enter')
        .merge(selection)
        .attr('x', (d, i) => i * 32)
        .attr('dy', '.35em')
        .text(d => d)

      selection.exit()
        .remove()
    },
    start () {
      const self = this
      this.update(this.alphabet)
      this.$d3.interval(function () {
        self.update(self.getRandomStr())
      }, 1500)
    }
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

  .text {
    font: bold 120px monospace;
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
