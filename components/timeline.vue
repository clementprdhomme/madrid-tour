<template>
  <svg class="timeline">
    <template v-for="group in configuration">
      <rect v-for="range in group.ranges"
            :x="hoursScale(range[0])"
            :width="hoursScale(range[1]) - hoursScale(range[0])"
            y="0"
            height="5"
            :fill="group.color">
      </rect>
    </template>
    <g v-for="n in 24"
       :transform="'translate(' + hoursScale(n) + ', 8)'" class="tick">
      <line x="0" x2="0" y="0" y2="3"></line>
      <text x="0" y="5" dy=".91em" style="text-anchor: middle;" v-if="n % 2">{{n}}</text>
    </g>
    <g v-for="n in 24"
       :transform="'translate(' + hoursScale(currentTime) + ', 9.5)'"
       class="cursor"
       v-if="timecursor">
      <circle x="0" y="0" r="1.5"></circle>
    </g>
  </svg>
</template>

<script>
import { debounce} from '../helpers/utils.js';

export default {

  props: {
    configuration: {
      type: Array,
      required: true
    },
    timecursor: {
      type: Boolean
    }
  },

  data() {
    return {
      width: 0,
      currentTime: 0
    };
  },

  ready() {
    this.width = this.$el.getBoundingClientRect().width;
    /* We're not able to add any other listener after that */
    window.onresize = debounce(() => this.width = this.$el.getBoundingClientRect().width, 50);

    this.setCurrentTime();
  },

  methods: {
    /* Scale [0, 24] -> [0, this.width] */
    hoursScale(value) {
      return value / 24 * this.width;
    },

    /* We set the current time every minute */
    setCurrentTime() {
      const updateCurrentTime = () => {
        const date = new Date();
        this.currentTime = date.getHours() + date.getMinutes() / 60;
      };

      setInterval(updateCurrentTime, 60 * 1000);
      updateCurrentTime();
    }

  }

}
</script>

<style>
  @import "../css/settings.css";

  .timeline {
    width: 100%;
    height: 21px;

    .tick {
      > line { stroke: #D6D6D6; }
      > text {
        font-size: 9px;
        fill: rgba($color-2, .7);
      }
    }

    .cursor { fill: #219CE4; }
  }
</style>
