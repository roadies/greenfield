/* eslint-disable no-param-reassign */
import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(Vuex);

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueGoogleMaps, {
  load: {
    // key: '',
    libraries: [
      'directions',
      'places',
    ],
  },
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');

export default store;
