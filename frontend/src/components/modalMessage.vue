<template>
  <div class="modalMessage" v-if="visibility">
    <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    message: String,
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