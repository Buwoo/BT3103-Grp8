import { createStore } from "vuex";

const state = {
  auth: false, //Changed to e.g. formSaved
};

const getters = {};

const actions = {};

const mutations = {
  setAuth(state, status) {
    state.auth = status;
  },
  // @jon something like this
  // setFormSaved(state, status) {
  //   state.formSaved = status;
  // },
};

export default createStore({
  state,
  getters,
  actions,
  mutations,
});
