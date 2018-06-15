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
      svg: null
    }
  },
  methods: {
    start() {
      this.analyzeTexts()
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
