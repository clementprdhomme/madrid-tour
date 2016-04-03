<template>
  <div :class="['panel', !initialState ? '-expanded' : '']">
    <div class="splash" v-if="initialState"><p>Touchez un marqueur</p></div>
    <div v-else transition="offset">
      <h1 class="title">{{poi.name}}</h1>
      <div class="card" v-if="displayCard">
        <ul class="tabs" v-if="poi.opening_hours">
          <li class="-active">Aujourd'hui</li>
          <li v-for="day in this.week()">{{day | truncate 1}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../vuex/store.js';

export default {

  store,

  data() {
    return {
      week() {
        const today = (new Date()).getDay(); /* 0 = Sunday */
        const names = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi',
          'Vendredi', 'Samedi'];
        return names.slice(today + 1).concat(names.slice(0, today));
      }
    };
  },

  vuex: {
    getters: {
      info: state => state.poi.filter(poi => poi.name === state.activeMarker)
    }
  },

  computed: {
    initialState() { return !this.info.length; },
    poi() { return this.info.length ? this.info[0]: {}; },
    displayCard() { return this.poi.opening_hours; }
  }

}
</script>

<style>
  @import "../css/settings.css";

  .panel {
    background-color: $color-1;
    box-shadow: 0 -2px 10px 1px rgba($color-2, .2);
    font-family: $font-1;
    color: $color-2;
    padding: 15px;

    > .splash {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      > p {
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 700;
        color: $color-3;
      }
    }

    .offset-transition {
      transition: transform .3s ease-out, opacity .8s ease-out;
      transition-delay: .2s;
      transform: translateY(0);
      opacity: 1;
    }

    .offset-enter, .offset-leave {
      transform: translateY(100%);
      opacity: 0;
    }

    .title {
      margin-top: 0;
      font-family: $font-1;
      font-size: 22px;
      font-weight: 500;
      color: $color-2;
    }

    .card {
      box-shadow: 0 1px 3px 1px rgba($color-2, .2);
      border-radius: 3px;
      padding: 15px;

      > .tabs {
        margin: 0;
        padding: 0;
        list-style-type: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
</style>
