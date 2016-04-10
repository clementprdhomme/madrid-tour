<template>
  <div :class="['panel', !initialState && !minimized ? '-expanded' : '']">
    <div class="splash" v-if="initialState"><p>Touchez un marqueur</p></div>
    <div v-else transition="offset">
      <div :class="['poi-icon', 'icon-' + poi.category, '-border']">
        <svg :class="'icon-' + poi.category">
          <use :xlink:href="poiIcon"></use>
        </svg>
      </div>
      <div :class="['reduce-button', minimized ? '-flipped' : '']"
           @click="this.toggleMinimize()">
      </div>
      <h1 class="title">{{poi.name}}</h1>
      <h2 class="subtitle">
        <span class="highlight">{{poi.isOpened ? 'Ouvert' : 'Fermé'}}</span>
        {{activeRatesListName ? '- ' + activeRatesListName : ''}}
      </h2>
      <card v-if="poi.openingHours">
        <tabs :list="this.week()"
              :active.sync="activeTab">
        </tabs>
          <div class="content">
            <timeline :configuration="timelineData" :timecursor="selectedDay === today"></timeline>
            <div class="row">
              <div class="col"><h2 class="title -small">Ouverture</h2></div>
              <div class="col">
                <div v-for="range in poi.getOpeningHoursFor(this.selectedDay)">
                  {{this.prettyHour(range[0])}}-{{this.prettyHour(range[1])}}
                </div>
              </div>
            </div>
            <h2 class="title -separator">Tarifs</h2>
            <div class="row"
                 v-for="rate in poi.getRatesFor(this.selectedDay, false)">
              <div class="col">
                <h2 class="title -small">
                  <span class="bullet"
                        :style="'background-color: ' + this.ratesScale($index) + ';'"
                  ></span>
                  {{rate.name}}
                </h2>
              </div>
              <div class="col">
                <div>{{rate.amount}}</div>
              </div>
            </div>
          </div>
      </card>
      <template v-if="poi.link">
        <h2 class="title -small">Site web</h2>
        <a href="{{poi.link}}">{{poi.link}}</a>
      </template>
      <a class="direction-button"
         href="citymapper://x-callback-url/directions?endcoord={{poi.coords[0]}}%2C{{poi.coords[1]}}&endname={{encodeURIComponent(poi.name)}}&x-source=Visite%20%C3%A0%20Madrid"
      >
        <svg class="icon">
          <use :xlink:href="directionIcon"></use>
        </svg>
        Obtenir l'itinéraire
      </a>
      <div class="button-credits">
        Avec <a href="https://citymapper.com"><svg class="icon"><use :xlink:href="citymapperIcon"></use></svg></a>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../vuex/store.js';
import { togglePanelSize } from '../vuex/actions'
import { prettyHour } from '../helpers/utils.js';
import { green, greenScale } from '../helpers/colors.js';
import Card from './card.vue';
import Tabs from './tabs.vue';
import Timeline from './timeline.vue';
import PoiCollection from '../helpers/poi_collection.js';

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
      activeTab: 'Auj.',
      minimized: false
    };
  },

  vuex: {
    getters: {
      poi: state => state.activeMarker ?
        (new PoiCollection(state.poi)).models.filter(poi => {
          return poi.name === state.activeMarker;
        })[0] :
        null
    },
    actions: {
      updatePanelSize: togglePanelSize
    }
  },

  computed: {
    initialState() { return !this.poi; },
    selectedDay() {
      if(this.activeTab === 'Auj.') return this.today;
      return ['D', 'L', 'M', 'X', 'J', 'V', 'S'].indexOf(this.activeTab);
    },
    timelineData() {
      const data = [];

      /* By default, the whole timeline is greyed */
      data.push({
        color: '#D6D6D6',
        ranges: [
          [0, 100]
        ]
      });

      const allRatesNonHourBased = !this.poi.getRatesFor(this.selectedDay, false).length;

      if(this.poi.alwaysFree || allRatesNonHourBased) {
        /* We add the opening hours data */
        const openingHoursData = {
          color: green,
          ranges: []
        };
        for(let i = 0, j = this.poi.openingHours.length; i < j; i++) {
          openingHoursData.ranges.push(this.openingHours[i]);
        }
        data.push(openingHoursData);
      } else {
        /* Hour based prices */
        const hourBasedPrices = this.poi.getRatesFor(this.selectedDay, false);

        /* We add the detailed prices to the timeline */
        for(let i = 0, j = hourBasedPrices.length; i < j; i++) {
          data.push({
            color: greenScale[i % greenScale.length],
            ranges: hourBasedPrices[i].periods
          })
        }
      }

      return data;
    },
    activeRatesListName() {
      return this.poi.activeHourBasedRates.map(rate => rate.name).join(', ');
    },
    poiIcon() {
      return require(`../imgs/icons/${this.poi.category}.svg`);
    },
    directionIcon() {
      return require('../imgs/icons/direction.svg');
    },
    citymapperIcon() {
      return require('../imgs/icons/citymapper.svg');
    }
  },

  methods: {
    prettyHour,
    ratesScale: i => greenScale[i % greenScale.length],
    toggleMinimize() {
      if(!this.minimized) {
        this.updatePanelSize();
        /* We delay by 500ms to make sure the 300ms of animation of the panel is
         * finished */
        setTimeout(() => this.minimized = !this.minimized, 350);
      } else {
        this.minimized = !this.minimized;
        setTimeout(() => this.updatePanelSize(), 350);
      }
    }
  }

}
</script>

<style>
  @import "../css/settings.css";
  @import "../css/icons.css";

  .panel {
    background-color: $color-1;
    box-shadow: 0 -2px 10px 1px rgba($color-2, .2);
    font-family: $font-1;
    color: $color-2;
    font-size: 15px;
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
      margin: 0;
      font-family: $font-1;
      font-size: 22px;
      font-weight: 500;
      color: $color-2;

      &.-small {
        color: $color-8;
        font-size: 11px;
        font-weight: 700;
        line-height: 2;
        text-transform: uppercase;
        margin-bottom: 0;
      }

      &.-separator {
        margin-top: 15px;
        margin-bottom: 10px;
        padding-bottom: 2px;
        border-bottom: 1px solid rgba($color-2, 0.1);
        font-size: 19px;
        font-weight: 500;
      }
    }

    .subtitle {
      font-size: 15px;
      font-weight: 500;
      color: $color-3;
      margin-top: 2px;
      margin-bottom: 20px;

      > .highlight {
        font-weight: 700;
        color: $color-7;
      }
    }

    a {
      color: $color-2;
      text-decoration: none;
    }

    .tabs {
      margin-bottom: 15px;
    }

    .timeline {
      margin-bottom: 15px;
    }

    .bullet {
      display: inline-block;
      height: 8px;
      width: 8px;
      border-radius: 100%;
      margin-right: 5px;
    }

    .poi-icon {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;
      border-width: 2px;
      border-style: solid;
      border-radius: 100%;

      > svg {
        width: 30px;
        height: 30px;
      }
    }

    .direction-button {
      display: block;
      width: 100%;
      margin-top: 20px;
      padding: 10px 0;
      text-align: center;
      color: $color-1;
      background-color: $color-7;
      font-weight: 700;
      text-decoration: none;
      letter-spacing: .3px;

      > .icon {
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: 2px;

        > use { fill: $color-1; }
      }
    }

    .button-credits {
      margin-top: 5px;
      font-size: 12px;
      color: $color-3;

      .icon {
        display: inline-block;
        height: 12px;
        width: 70px;
        vertical-align: bottom;
      }
    }

    .reduce-button {
      position: absolute;
      top: 0;
      right: 2px;
      width: 15px;
      height: 15px;
      border-top:  2px solid rgba($color-3, .3);
      border-left: 2px solid rgba($color-3, .3);
      transform: rotate(-135deg);

      &.-flipped { transform: rotate(45deg) translate(15px, 15px); }
    }
  }
</style>
