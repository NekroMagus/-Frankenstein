<template>
  <div>
    <h2>download file</h2>
    <button @click="downloadFile">download file</button>
    <a href="http://localhost:3000/downloadFiles">dowload</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      response: {}
    };
  },
  methods: {
    downloadFile() {
      axios
        .get("http://localhost:3000/downloadFiles", { responseType: "blob" })
        .then(response => {
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(response.data);
          link.download = "Download.md";
          link.click();
          console.log(response);
        });
    }
  }
};
</script>

<style>
</style>