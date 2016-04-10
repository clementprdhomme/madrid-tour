import Vue from 'vue';
import Vuex from 'vuex';

import poi from './poi.js';

Vue.use(Vuex);

const state = {
  poi,
  activeMarker: null,
  panelMinimized: false
};

const mutations = {
  UPDATE_ACTIVE_MARKER(state, name) {
    state.activeMarker = name;
  },
  TOGGLE_PANEL_SIZE(state) {
    state.panelMinimized = !state.panelMinimized;
  }
};

export default new Vuex.Store({
  state,
  mutations
});
