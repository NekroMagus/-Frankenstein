<template>
  <div class="container">
    <section-header></section-header>
    <hr />
    <nav class="nav nav-pills nav-fill">
      <router-link to="/" class="nav-item nav-link" exact>main page</router-link>
      <router-link to="/work-with-json" class="nav-item nav-link">work with json</router-link>
      <router-link to="/work-with-database" class="nav-item nav-link">work with database</router-link>
      <router-link to="/registration" class="nav-item nav-link">registration</router-link>
    </nav>
    <h2 class="text-center">CRUD</h2>
    <!-- вывод маршрута -->
    <router-view></router-view>

    <hr />
  </div>
</template>

<script>
import sectionHeader from "./components/sectionHeader.vue";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    sectionHeader
  }
};
</script>

<style>
.router-link-active {
  background-color: lightgreen;
}
</style>
