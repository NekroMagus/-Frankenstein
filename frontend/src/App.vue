<template>
  <div class="container">
    <section-header></section-header>
    <hr>
    <h2 class="text-center">CRUD</h2>
    <search-section></search-section>
    <hr>
  </div>
</template>

<script>
import searchSection from './components/sectionSearch.vue'
import sectionHeader from './components/sectionHeader.vue'

export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  components: {
    searchSection,
    sectionHeader
  }
}
</script>

<style>
</style>
