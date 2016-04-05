<template>
  <div :class="['panel', !initialState ? '-expanded' : '']">
    <div class="splash" v-if="initialState"><p>Touchez un marqueur</p></div>
    <div v-else transition="offset">
      <h1 class="title">{{poi.name}}</h1>
      <card v-if="poi.opening_hours">
        <tabs v-if="poi.opening_hours"
              :list="this.week()"
              :active.sync="activeTab">
        </tabs>
          <div class="content">
            <timeline :configuration="timelineData" :timecursor="selectedDay === today"></timeline>
          </div>
      </card>
    </div>
  </div>
</template>

<script>
import store from '../vuex/store.js';
import Card from './card.vue';
import Tabs from './tabs.vue';
import Timeline from './timeline.vue';

export default {

  store,

  components: {
    card: Card,
    tabs: Tabs,
    timeline: Timeline
  },

  data() {
    return {
      today: (new Date()).getDay(),
      week() {
        const names = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

        let res = names.slice(this.today + 1).concat(names.slice(0, this.today));
        res = ['Auj.'].concat(res);

        return res;
      },
      activeTab: 'Auj.'
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
    selectedDay() {
      if(this.activeTab === 'Auj.') return this.today;
      return ['D', 'L', 'M', 'X', 'J', 'V', 'S'].indexOf(this.activeTab);
    },
    openingHours() { return this.poi.opening_hours[this.selectedDay]; },
    prices() {
      if(!this.poi.prices) return;
      if(!this.poi.prices.rates) return this.poi.prices;
      return this.poi.prices.rates.map(function(rate) {
        if(rate.default) return rate;
        return {
          name: rate.name,
          amount: rate.amount,
          periods: rate.periods && rate.periods[this.selectedDay]
        };
      }.bind(this));
    },
    timelineData() {
      const data = [];
      const pricesColorScale = ['#078D07', '#0AD20A', '#8FFA8F'];
      const getColor = index => pricesColorScale[index % 3];

      /* By default, the whole timeline is greyed */
      data.push({
        color: '#D6D6D6',
        ranges: [
          [0, 100]
        ]
      });

      /* true if all the prices are not based on hours */
      const notHourBasedPrices = !this.prices.filter(price => price.periods).length;

      if(!this.prices || this.prices.always_free || notHourBasedPrices) {
        /* We add the opening hours data */
        const openingHoursData = {
          color: '#0AD20A',
          ranges: []
        };
        for(let i = 0, j = this.openingHours.length; i < j; i++) {
          openingHoursData.ranges.push(this.openingHours[i]);
        }
        data.push(openingHoursData);
      } else {
        /* Hour based prices or the default one */
        const hourBasedPrices = this.prices.filter(price => price.periods || price.default);
        /* We add the detailed prices to the timeline */
        for(let i = 0, j = hourBasedPrices.length; i < j; i++) {
          if(hourBasedPrices[i].default) {
            const defaultPrice = {
              color: hourBasedPrices.length === 1 ? '#0AD20A' : getColor(i),
              ranges: []
            };
            for(let i = 0, j = this.openingHours.length; i < j; i++) {
              defaultPrice.ranges.push(this.openingHours[i]);
            }
            data.push(defaultPrice);
          } else {
            data.push({
              color: getColor(i),
              ranges: hourBasedPrices[i].periods
            })
          }
        }
      }

      return data;
    }
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

    .tabs {
      margin-bottom: 15px;
    }
  }
</style>
