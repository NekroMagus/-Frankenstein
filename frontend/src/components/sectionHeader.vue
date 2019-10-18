<template>
  <header class="container header" :style="{ backgroundImage: `url(${backgroundUrl})`}"></header>
</template>

<script>
import backgroundUrl from '../assets/images/frankenstein.jpg'
export default {
  data() {
    return {
      backgroundUrl
    };
  }
};
</script>

<style scoped>
.header {
  height: 400px;
  background-repeat: no-repeat;
}
</style>