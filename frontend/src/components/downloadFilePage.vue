<template>
  <div>
    <h2>download file</h2>
    <button @click="downloadFile">download file</button>
  </div>
</template>

<script>
export default {
  methods: {
    downloadFile() {
      axios.get("http://localhost:3000/downloadFiles").then(response => {
        console.log(response);
      });
    }
  }
};
</script>

<style>
</style>