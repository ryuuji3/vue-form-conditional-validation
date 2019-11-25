import Moment from "moment";

const state = {
  birthday: null,
  G1Date: null,
  G2Date: null,
  GDate: null,
  driverSchoolG1: null,
  driverSchoolG2: null
};

const getters = {
  age({ birthday }) {
    return birthday ? Moment().diff(birthday, "years") : null;
  },
  eligibleForG1Date() {
    return Moment()
      .startOf("day")
      .subtract(16, "years")
      .toDate();
  }
};

const mutations = {
  updateBirthday(state, birthday) {
    state.birthday = birthday;
  },
  updateG1Date(state, date) {
    state.G1Date = date;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
