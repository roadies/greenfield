import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Profile from './views/Profile.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },

  ],
  // mode: 'history',
});
