<template>
  <div id="app">
    <map></map>
    <panel></panel>
  </div>
</template>

<script>
import Map from './map.vue'
import Panel from './panel.vue'

export default {
  components: {
    map: Map,
    panel: Panel
  }
}
</script>

<style>
  *, *:before, *:after {
    box-sizing: border-box;
  }

  html, body, #app {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  #app {
    > .map {
      height: 100%;
      width: 100%;
      z-index: 0;

      &.-reduced {
        height: 200px;
      }
    }

    > .panel {
      width: 100%;
      height: 80px;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 1;
      transition: height .3s;
      transition-timing-function: ease-in-out;

      &.-expanded {
        height: calc(100% - 200px);
      }
    }
  }
</style>
