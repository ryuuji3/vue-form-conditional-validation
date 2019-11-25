import Vue from "vue";
import Vuex from "vuex";
// modules
import application from "./application";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    application
  }
});
