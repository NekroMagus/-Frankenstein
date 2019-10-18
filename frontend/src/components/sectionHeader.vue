<template>
  <header class="container header" :style="{ backgroundImage: `url(${backgroundUrl})`}"></header>
</template>

<script>
import backgroundUrl from '../assets/images/frankenstein.png'
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
  height: 500px;
  background-repeat: no-repeat;
  background-position: center top;
}
</style>