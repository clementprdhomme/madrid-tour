import Vue from 'vue';
import Vuex from 'vuex';
import store from './vuex/store.js';
import filters from './helpers/filters.js';

import App from './components/app.vue';

Vue.use(Vuex);

Vue.config.debug = true;

new Vue({
  el: 'body',
  store,
  components: {
    app: App
  }
});
