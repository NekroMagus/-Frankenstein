<template>
  <div>
    <input type="number" v-model.number="inputValue" size="10" :placeholder="placeholder" />
    <input type="submit" @click="$emit('mysubmit', inputValue)" :value="btncaption" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: 1
    };
  },
  props: {
      placeholder: String,
      btncaption: String
  }
};
</script>

<style>
</style>