import { createStore } from "vuex";

const state = {
  auth: false, //Changed to e.g. formSaved
  formSaved: true,
  numOfEntry: 0,
  entry: [0, 0, 0, 0]
};

const getters = {
  getFormStatus() {
    return state.formSaved
  },

  getFilled() {
    return state.numOfEntry
  }
  
};

const actions = {};

const mutations = {
  setAuth(state, status) {
    state.auth = status;
  },
  setFormSavedHawker(state, hawker) {
    state.formSaved = true;
    if (hawker == "") {
      if (state.entry[0] == 1) {
        state.entry[0] = 0;
        state.numOfEntry -= 1;
      }
    } else {
      if (state.entry[0] == 0) {
        state.entry[0] = 1;
        state.numOfEntry += 1;
      }

    }
  },
  setFormSavedFood(state, food) {
    state.formSaved = true;
    if (food == "") {
      if (state.entry[1] == 1) {
        state.entry[1] = 0;
        state.numOfEntry -= 1;
      }
    } else {
      if (state.entry[1] == 0) {
        state.entry[1] = 1;
        state.numOfEntry += 1;
      }
    }
  },

  setFormSavedOpen(state, open) {
    state.formSaved = true;
    if (open == "") {
      if (state.entry[2] == 1) {
        state.entry[2] = 0;
        state.numOfEntry -= 1;
      }
    } else {
      if (state.entry[2] == 0) {
        state.entry[2] = 1;
        state.numOfEntry += 1;
      }
    }
  },

  setFormSavedClose(state, close) {
    state.formSaved = true;
    if (close == "") {
      if (state.entry[3] == 1) {
        state.entry[3] = 0;
        state.numOfEntry -= 1;
      }
    } else {
      if (state.entry[3] == 0) {
        state.entry[3] = 1;
        state.numOfEntry += 1;
      }
    }
  },


  setFormUnsaved(state) {
    state.formSaved = false;
  },

  initHawker(state, hawker) {
    state.numOfEntry = 0;
    state.formSaved = true;
    state.entry = [0, 0, 0, 0]
    if (hawker != "") {
      state.entry[0] = 1;
      state.numOfEntry += 1;
    }
  },

  initFood(state, food) {
    if (food != "") {
      state.entry[1] = 1;
      state.numOfEntry += 1;
    }
  },

  initOpen(state, open) {
    if (open != "") {
      state.entry[2] = 1;
      state.numOfEntry += 1;
    }
  },

  initClose(state, close) {
    if (close != "") {
      state.entry[3] = 1;
      state.numOfEntry += 1;
    }
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
