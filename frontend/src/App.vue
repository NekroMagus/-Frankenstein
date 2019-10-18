<template>
  <div class="container">
    <section-header></section-header>
    <search-section></search-section>
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
