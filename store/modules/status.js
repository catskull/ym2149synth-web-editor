import store from '@/../store';
import Vue from 'vue';

const state = {
  synthConnected: false,
  synthId: ''
};

// getters
const getters = {
  connected: state => state.synthConnected,
  id: state => state.synthId,
};

// actions
const actions = {
  registerDeviceId({ commit, state }, { id }) {
    commit('setConnected', { connected: true });
    commit('setId', { id });
  },
  resetStatus({ commit, state }) {
    commit('setConnected', { connected: false });
    commit('setId', { id: '' });
  }
};

// mutations
const mutations = {
  setConnected(state, { connected }) {
    Vue.set(state, 'synthConnected', connected);
  },
  setId(state, { id }) {
    Vue.set(state, 'synthId', id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};