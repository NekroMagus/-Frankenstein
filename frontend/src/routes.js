import VueRouter from "vue-router";

import jsonSearchPage from "./pages/jsonSearchPage.vue";
import databaseSearchPage from "./pages/databaseSearchPage.vue";
import registrationPage from "./pages/registrationPage.vue";
import downloadFilePage from "./pages/downloadFilePage.vue";

export default new VueRouter({
  mode: "history",
  base: "/",
  routes: [
    { path: "/work-with-json", component: jsonSearchPage },
    { path: "/work-with-database", component: databaseSearchPage },
    { path: "/registration", component: registrationPage },
    { path: "/download-file", component: downloadFilePage }
  ]
});
