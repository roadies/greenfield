import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: null,
    isUserLoggedIn: false,
  },
  getters: {
    token: (state) => state.status,
  },
  mutations: {
    updateStatus(state, token) {
      Vue.set(state, 'token', token);
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
  },
});

export default store;
