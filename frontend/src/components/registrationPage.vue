<template>
  <div>
    <registration-form v-on:submitregistration="submitRegistration" v-on:error="showErrorMessage"></registration-form>
    <modal-message :visibility="isVisibleModalMessage" :messages="errorMessages"></modal-message>
  </div>
</template>

<script>
import registrationForm from "./registrationForm.vue";
import modalMessage from "./modalMessage";

export default {
  data() {
    return {
      isVisibleModalMessage: false,
      errorMessages: []
    };
  },
  methods: {
    submitRegistration: function(obj) {
      // let thisObj = this;
      console.log(obj);

      axios
        .post("http://localhost:3000/registration", obj)
        .then(response => {
          console.log("response");
        })
        .catch(function(error) {
          // thisObj.errorMessages = "ТАКОЙ ЗАГОЛОВОК УЖЕ СУЩЕСТВУЕТ!";
        });
    },
    showErrorMessage: function(errors = []) {
      let thisObj = this;

      this.errorMessages = errors;
      this.isVisibleModalMessage = true;

      setTimeout(() => {
        thisObj.isVisibleModalMessage = false;
      }, 3000);
    }
  },
  components: {
    registrationForm,
    modalMessage
  }
};
</script>

<style>
</style>