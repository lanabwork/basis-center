import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/constants/config';
import httpClient from '@/utils/httpClient';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
  },
  mutations: {
    getUsers(state, users) {
      state.users = users;
    },
  },
  actions: {
    async getUsers({ commit }) {
      try {
        const { data } = await httpClient.get(api.users);
        commit('getUsers', data);
      } catch (e) {
        console.error(e);
      }
    },
  },
});
