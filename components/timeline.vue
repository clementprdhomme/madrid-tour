<template>
  <svg class="timeline" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
    <template v-for="group in configuration">
      <rect v-for="range in group.ranges"
            :x="hoursScale(range[0])"
            :width="hoursScale(range[1]) - hoursScale(range[0])"
            y="0"
            height="100"
            :fill="group.color">
      </rect>
    </template>
  </svg>
</template>

<script>
export default {

  props: {
    configuration: {
      type: Array,
      required: true
    }
  },

  methods: {
    /* Scale [0, 24] -> [0, 100] */
    hoursScale(value) {
      return value * 100 / 24;
    }
  }

}
</script>

<style>
  @import "../css/settings.css";

  .timeline {
    width: 100%;
    height: 5px;
  }
</style>
