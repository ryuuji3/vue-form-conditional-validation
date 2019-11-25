import Moment from "moment";

const state = {
  birthday: null,
  G1Date: null,
  G2Date: null,
  GDate: null,
  driverSchoolG1: null,
  driverSchoolG2: null,
};

const getters = {
  age({ birthday }) {
    return birthday ? Moment().diff(birthday, "years") : null;
  }
};

const mutations = {
  updateBirthday(state, birthday) {
    state.birthday = birthday;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
