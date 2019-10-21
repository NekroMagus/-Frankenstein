<template>
  <div class="modalMessage" v-if="visibility">
    <p v-for="(message, index) in messages" v-bind:key="index">{{message}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    messages: Array,
    visibility: Boolean
  }
};
</script>

<style>
.modalMessage {
  position: fixed;
  background: #fff;
  border: 3px solid red;
  padding: 9px;
  left: 0;
  top: 0;
}
</style>