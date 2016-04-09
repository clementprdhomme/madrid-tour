<template>
  <div class="map">
  </div>
</template>

<script>
import store from '../vuex/store.js';
import { updateActiveMarker } from '../vuex/actions'
import { debounce } from '../helpers/utils';

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
    this.addPositionMarker();
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
          html: `<svg><use xlink:href="${iconId}"></use></svg>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
          className: `icon-${marker.category}`
        });

        return L.marker(marker.coords, {icon, ref: marker.name})
          .on('click', this.markerOnClick.bind(this));
      });

      this.markerLayer = L.layerGroup(leafletMarkers).addTo(this.map);
    },

    addPositionMarker() {
      if(!!navigator.geolocation) {
        const success = debounce(this.positionOnUpdate, 5000, true).bind(this);
        navigator.geolocation.watchPosition(success,
          () => {},
          {
            enableHighAccuracy: true,
            maximumAge        : 30000,
            timeout           : 27000
          });
      }
    },

    markerOnClick(e) {
      const ref = e.target.options.ref;
      this.setActiveMarker(ref);

      if(this.defaultMapSize) {
        this.defaultMapSize = false;
        /* We delay by 500ms to make sure the 300ms of the panel is done */
        setTimeout(() => {
          /* We can't use Vue to add dynamically the class because the DOM
           * update is asynchronous and we need the change now to invalidate the
           * map's size */
          this.$el.classList.add('-reduced');
          this.map.invalidateSize();
          this.map.setView(this.info[0].coords);
        }, 500);
      } else {
        this.map.setView(this.info[0].coords);
      }
    },

    positionOnUpdate({ coords: position }) {
      const coords = [ position.latitude, position.longitude ];

      if(!this.positionMarker) {
        const icon = L.divIcon({
          html: `<div></div>`,
          className: 'position-marker'
        });
        this.positionMarkerAccuracy = L.circle(coords, position.accuracy, { className: 'position-marker-accuracy'})
          .addTo(this.map);
        this.positionMarker = L.marker(coords, { icon })
          .addTo(this.map);
      } else {
        this.positionMarkerAccuracy.setLatLng(coords);
        this.positionMarker.setLatLng(coords);
      }
    }

  }
}
</script>

<style>
  @import "../css/icons.css";

  .map {
    .leaflet-marker-icon {
      cursor: pointer;

      > svg {
        width: 20px;
        height: 20px;
      }

    }

    .position-marker {
      width: 20px;
      height: 20px;
      transform: translate(-50%, -50%);
      border-radius: 100%;
      background-color: $color-7;
    }

    .position-marker-accuracy {
      fill: rgba($color-7, .9);
      stroke-width: 0;
      animation-name: contract;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
      transform-origin: center;
    }
  }

  @keyframes contract {
    0%   { transform: scale(1); }
    50%  { transform: scale(.8); }
    100% { transform: scale(1); }
  }

  @-webkit-keyframes contract {
    0%   { transform: scale(1); }
    50%  { transform: scale(.8); }
    100% { transform: scale(1); }
  }

</style>
