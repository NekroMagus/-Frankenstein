import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App.vue";

import sectionSearch from "./components/sectionSearch.vue";
import sectionSearchDb from "./components/sectionSearchDb.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes: [
    { path: "/work-with-json", component: sectionSearch },
    { path: "/work-with-database", component: sectionSearchDb }
  ]
});

new Vue({
  el: "#app",
  router: router,
  components: {
    App
  },
  render: h => h(App)
});
