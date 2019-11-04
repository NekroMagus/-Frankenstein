import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";

import App from "./App.vue";

import jsonSearchPage from "./components/jsonSearchPage.vue";
import databaseSearchPage from "./components/databaseSearchPage.vue";
import registrationPage from "./components/registrationPage.vue";
import downloadFilePage from "./components/downloadFilePage.vue";
import modalMessage from "./components/modalMessage.vue";

Vue.component("modal-message", modalMessage);

Vue.use(VueRouter);
Vue.use(Vuelidate);

if (localStorage.getItem("mytoken") !== null) {
  axios.defaults.headers["Authorization"] = `Token ${localStorage.getItem(
    "mytoken"
  )}`;
}

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes: [
    { path: "/work-with-json", component: jsonSearchPage },
    { path: "/work-with-database", component: databaseSearchPage },
    { path: "/registration", component: registrationPage },
    { path: "/download-file", component: downloadFilePage }
  ]
});

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
});
