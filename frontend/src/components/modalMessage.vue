<template>
  <transition name="modal-message">
    <div class="modal-box" v-show="visibility">
      <div class="modal-message">
        <b>Внимание ошибка:</b>
        <hr />
        <p v-for="(message, index) in messages" v-bind:key="index">{{message}}</p>
      </div>
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
  mounted: function() {},
  watch: {}
};
</script>

<style>
.modal-box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-message {
  /* position: fixed; */
  background: #fff;
  border: 3px solid red;
  border-radius: 5px;
  box-shadow: 0 0 15px #333;
  padding: 9px;
  /* left: 0;
  top: 0; */
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