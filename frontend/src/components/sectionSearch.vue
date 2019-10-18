<template>
  <div>
    <input type="search" size="50" name id />
    <input type="submit" @click="getSerchResult" value="search" />
    <div class="search-result"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: null
    };
  },
  methods: {
    getSerchResult: function() {
      axios.get("http://localhost:3000/json").then(response => {
        this.info = response;
        console.log(this.info);
      });
    }
  }
};
</script>

<style>
</style>