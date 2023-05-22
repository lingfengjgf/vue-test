import { createStore } from "vuex";

const store = createStore({
  state: {
    count: 1,
  },
  mutations: {
    add(state) {
      state.count++;
    },
  },
  getters: {
    doubleCounter(state) {
      return state.count * 2;
    },
  },
  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit("add");
      }, 2000);
    },
  },
});

export default store;
