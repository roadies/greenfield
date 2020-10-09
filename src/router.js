import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Profile from './views/Profile.vue';
import NewTrip from './views/NewTrip.vue';
import Journal from './views/Journal.vue';
import Login from './views/Login.vue';
import store from './store/store';

Vue.use(Router);

const router = new Router({
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
      beforeEnter: (to, from, next) => {
        if (!router.app.$store.state.isUserLoggedIn) {
          next({ name: 'Home' });
        } else {
          next();
        }
      },
    },
    {
      path: '/newtrip',
      name: 'NewTrip',
      component: NewTrip,
      beforeEnter: (to, from, next) => {
        if (!router.app.$store.state.isUserLoggedIn) {
          next({ name: 'Home' });
        } else {
          next();
        }
      },
    },
    {
      path: '/journal',
      name: 'Journal',
      component: Journal,
      beforeEnter: (to, from, next) => {
        if (!router.app.$store.state.isUserLoggedIn) {
          next({ name: 'Home' });
        } else {
          next();
        }
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    // {
    //   path: '/',
    //   redirect: (to) => {
    //     const { hash, params, query } = to;
    //     if (query.to === '/profile') {
    //       return { path: '/profile', query: null };
    //     }
    //   },
    // },
  ],
  // mode: 'history',
});
export default router;
