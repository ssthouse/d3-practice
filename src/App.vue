<template>
  <div id="app">
    <div class="menu">
      <v-btn to="root">Root</v-btn>
      <v-btn to="horizontalTree">Horizontal Tree</v-btn>
      <v-btn to="tooltip">Tooltip</v-btn>
      <v-btn to="scatterplot">Scatterplot</v-btn>
      <v-btn to="lineChart">Line Chart</v-btn>
      <v-btn to="areaChart">Area Chart</v-btn>
      <v-btn to="stackChart">Stack Chart</v-btn>
      <v-btn to="tree">Tree</v-btn>
      <v-btn to="pie">Pie</v-btn>
      <v-btn to="forceLayout">ForceLayout</v-btn>
      <v-btn to="geoLayout">GeoLayout</v-btn>
      <v-btn to="fancyBtn">FancyBtn</v-btn>
      <v-btn to="movingWord">Moving Word</v-btn>
    </div>
    <div class="router-view">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,
body {
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.menu {
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.router-view {
  width: 100%;
  height: 100%;
}
</style>
