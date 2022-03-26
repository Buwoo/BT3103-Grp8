import { createStore } from "vuex";

const state = {
  auth: false, //Changed to e.g. formSaved
  formSaved: true,
  fields: [0,0,0,0],
  numOfFilled: 0
};

const getters = {
  getFormStatus() {
    return state.formSaved
  },

  getFilled() {
    return state.numOfFilled
  }
  
};

const actions = {};

const mutations = {
  setAuth(state, status) {
    state.auth = status;
  },
  setFormUnsaved(state) {
    state.formSaved = false;

  },
  setFormSavedHawker(state, hawkerCentre) {
    state.formSaved = true;
    if (hawkerCentre == "") {
      if (state.fields[0] != 0) {
        state.fields[0] = 0
        state.numOfFilled -= 1
      }
    } else {
      if (state.fields[0] == 0) {
        state.fields[0] = 1
        state.numOfFilled += 1
      }
    }
  },

  setFormSavedFood(state, food) {
    state.formSaved = true;
    if (food == "") {
      if (state.fields[1] != 0) {
        state.fields[1] = 0
        state.numOfFilled -= 1
      }
    } else {
      if (state.fields[1] == 0) {
        state.fields[1] = 1
        state.numOfFilled += 1
      }
    }
  },
  setFormSavedOpen(state, open) {
    state.formSaved = true;
    if (open == "") {
      if (state.fields[2] != 0) {
        state.fields[2] = 0
        state.numOfFilled -= 1
      }
    } else {
      if (state.fields[2] == 0) {
        state.fields[2] = 1
        state.numOfFilled += 1
      }
    }
  },
  setFormSavedClose(state, close) {
      state.formSaved = true;
      if (close == "") {
        if (state.fields[3] != 0) {
          state.fields[3] = 0
          state.numOfFilled -= 1
        }
      } else {
        if (state.fields[3] == 0) {
          state.fields[3] = 1
          state.numOfFilled += 1
        }
      }
  },

  initHawker (state, hawker) {
    if (hawker != "") {
      state.formSaved = true
      state.numOfFilled = 0
      state.fields[0] = 1
      state.numOfFilled += 1
    }
  },
  initFood (state, food) {
    if (food != "") {
      console.log("food")
      state.fields[1] = 1
      state.numOfFilled += 1
    }
  },
  initOpen(state, open) {
    if (open != "") {
      console.log("open")
      state.fields[2] = 1
      state.numOfFilled += 1
    }
  },
  initClose(state, close) {
    if (close != "") {
      console.log("close")
      state.fields[3] = 1
      state.numOfFilled += 1
    }
  }
}

  


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
