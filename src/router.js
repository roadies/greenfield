import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Profile from './views/Profile.vue';
import NewTrip from './views/NewTrip.vue';
import Journal from './views/Journal.vue';

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
      // beforeEnter: (to, from, next) => {
      //   if (store.state.isUserLoggedIn === false) {
      //     next({
      //       path: '/',
      // query: {
      //   redirectFrom: to.Home,
      // },
      //   });
      // } else {
      //   next();
      // }
      // },
    },
    {
      path: '/newtrip',
      name: 'NewTrip',
      component: NewTrip,
    },
    {
      path: '/journal',
      name: 'Journal',
      component: Journal,
    },
  ],
  // mode: 'history',
});
