<template>
  <div id="app">
    <div class="menu">
      <v-btn to="root">Root</v-btn>
      <v-btn to="horizontalTree">Horizontal Tree</v-btn>
      <v-btn to="tooltip">Tooltip</v-btn>
      <v-btn to="scatterplot">Scatterplot</v-btn>
      <v-btn to="lineChart">Line Chart</v-btn>
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
