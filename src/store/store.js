import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: null,
    isUserLoggedIn: false,
    userName: '',
    userId: '',
<<<<<<< HEAD
    newestFileUpload: '',
    tripCalculated: false,
=======
    imageLink: '',
>>>>>>> 5299558... (add) images upload to remote location and return
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
