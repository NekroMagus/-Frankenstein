<template>
  <transition name="modal-message">
    <div class="modalMessage" v-show="visibility">
      <p v-for="(message, index) in messages" v-bind:key="index">{{message}}</p>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    messages: Array,
    visibility: Boolean
  },
  mounted: function() {
    console.log('mounted');
    
  },
  watch: {}
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

.modal-message-enter-active,
.modal-message-leave-active {
  transition: all 0.3s;
}
.modal-message-enter,
.modal-message-leave-to {
  opacity: 0;
  transform: scale(0.2);
}
</style>