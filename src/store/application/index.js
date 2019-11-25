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
  },
  eligibleForG2Date({ G1Date, driverSchoolG1 }) {
    if (G1Date) {
      const requiredMonthsWait = driverSchoolG1 ? 8 : 12;

      return Moment(G1Date)
        .startOf("day")
        .add(requiredMonthsWait, "months")
        .toDate();
    }
  }
};

const mutations = {
  updateBirthday(state, birthday) {
    state.birthday = birthday;
  },
  updateG1Date(state, date) {
    state.G1Date = date;
  },
  setDriverSchoolG1(state, value) {
    state.driverSchoolG1 = value;
  },
  updateG2Date(state, date) {
    state.G2Date = date;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
