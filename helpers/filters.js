import Vue from 'vue';

Vue.filter('truncate', function (string, until) {
  return string.slice(0, until);
})
