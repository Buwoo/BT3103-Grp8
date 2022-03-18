import { createStore } from "vuex";

const state = {
  auth: false, //Changed to e.g. formSaved
  formSaved: false,
};

const getters = {
  getFormStatus() {
    return state.formSaved
  }
  
};

const actions = {};

const mutations = {
  setAuth(state, status) {
    state.auth = status;
  },
  setFormSaved(state) {
    state.formSaved = true;
  },
  setFormUnsaved(state) {
    state.formSaved = false;
  },

  

};
  // @jon something like this
  // setFormSaved(state, status) {
  //   state.formSaved = status;
  // },


export default createStore({
  state,
  getters,
  actions,
  mutations,
});
