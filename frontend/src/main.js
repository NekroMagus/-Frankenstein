import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import router from './routes.js' 

import App from "./App.vue";

import modalMessage from "./components/modalMessage.vue";

Vue.component("modal-message", modalMessage);

Vue.use(VueRouter);
Vue.use(Vuelidate);

if (localStorage.getItem("mytoken") !== null) {
  axios.defaults.headers["Authorization"] = `Token ${localStorage.getItem(
    "mytoken"
  )}`;
}

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
});
