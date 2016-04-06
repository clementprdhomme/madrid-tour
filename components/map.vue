<template>
  <div :class="['map', defaultMapSize ? '' : '-reduced']">
  </div>
</template>

<script>
import store from '../vuex/store.js';
import { updateActiveMarker } from '../vuex/actions'

export default {

  store,

  data() {
    return {
      defaultMapSize: true
    };
  },

  ready() {
    this.createMap();
    this.addMarkers();
  },

  vuex: {
    getters: {
      markers: (state) => state.poi,
      info: state => state.poi.filter(poi => poi.name === state.activeMarker)
    },
    actions: {
      setActiveMarker: updateActiveMarker
    }
  },

  methods: {

    createMap() {
      this.map = L.map(this.$el, {
        zoom: 13,
        center: [40.432416, -3.701031],
        zoomControl: false
      });

      L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png')
        .addTo(this.map);

      L.control.zoom({position: 'topright'}).addTo(this.map);
    },

    addMarkers() {
      const leafletMarkers = this.markers.map((marker) => {
        const iconId = require(`../imgs/icons/${marker.category}.svg`);
        const icon = L.divIcon({
          html: `<svg><use xlink:href="${iconId}"></use>'}}/></svg>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
          className: `icon-${marker.category}`
        });

        return L.marker(marker.coords, {icon, ref: marker.name})
          .on('click', this.markerOnClick.bind(this));
      });

      this.markerLayer = L.layerGroup(leafletMarkers).addTo(this.map);
    },

    markerOnClick(e) {
      const ref = e.target.options.ref;
      this.setActiveMarker(ref);

      if(this.defaultMapSize) {
        this.defaultMapSize = false;
        setTimeout(() => {
          this.map.invalidateSize();
          this.map.setView(this.info[0].coords);
        }, 500);
      } else {
        this.map.setView(this.info[0].coords);
      }
    }

  }
}
</script>

<style>
  @import "../css/icons.css";

  .leaflet-marker-icon {
    cursor: pointer;

    > svg {
      width: 20px;
      height: 20px;
    }

  }

</style>
