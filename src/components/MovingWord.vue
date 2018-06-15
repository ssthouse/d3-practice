<template>
  <div id="moving-word-container">
    <div id="text-area-panel">
      <textarea id="text-field" v-model="texts" label="Message" full-width multi-line single-line>
      </textarea>
    </div>

    <div id="summary-panel">
      <svg id="svg-moving-word"></svg>
      <v-btn id="start-btn" @click="start">Start</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovingWord',
  data() {
    return {
      texts: 'hi, this is me: ssthouse',
      charMap: null,
      svg: null
    }
  },
  methods: {
    start() {
      this.analyzeTexts()
      this.drawSvg()
    },
    analyzeTexts() {
      if (this.texts === undefined) {
        return
      }
      const charArry = this.texts.split('')
      const charMap = new Map()
      charArry.forEach(element => {
        if (charMap.get(element) !== undefined) {
          charMap.set(element, charMap.get(element) + 1)
        } else {
          charMap.set(element, 1)
        }
      })
      charMap.forEach((value, key) => {
        console.log(`key: ${key}: ${value}`)
      })
      this.charMap = charMap
    },
    drawSvg() {
      const keyValueArray = Array.from(this.charMap.entries())
      const textSizeScale = this.$d3
        .scaleSqrt()
        .domain(this.$d3.extent(keyValueArray, data => data[1]))
        .range([30, 80])

      const textSelection = this.svg
        .selectAll('text')
        .data(Array.from(this.charMap.entries()), data => data[0])
      textSelection
        .enter()
        .append('text')
        .attr('x', 0)
        .attr('y', 400)
        .transition()
        .attr('x', 100)
        .attr('y', (data, index) => (index + 1) * 80)
        .text(data => data[0])
        .style('font-size', data => `${textSizeScale(data[1])}px`)
    }
  },
  mounted() {
    this.svg = this.$d3.select('#svg-moving-word')
  }
}
</script>

<style lang="less">
#moving-word-container {
  height: 100%;
  display: flex;

  #text-area-panel {
    width: 50%;
    height: 100%;
    position: relative;

    #text-field {
      width: 100%;
      height: 100%;
      background-color: aliceblue;
    }
  }

  #summary-panel {
    width: 50%;
    height: 100%;
    position: relative;

    #svg-moving-word {
      width: 100%;
      height: 100%;
    }

    #start-btn {
      position: absolute;
      left: 50%;
      text-align: center;
      bottom: 16px;
    }
  }
}
</style>
