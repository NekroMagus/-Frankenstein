<template>
  <div>
    <registration-form v-on:submitregistration="submitRegistration" v-on:error="showErrorMessage"></registration-form>
    <hr>
    <button @click="showAllUsers">show all users</button>
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
      console.log(obj);

      axios
        .post("http://localhost:3000/registration", obj)
        .then(response => {
          console.log(response);
        })
        .catch((error) => {
          // thisObj.errorMessages = "ТАКОЙ ЗАГОЛОВОК УЖЕ СУЩЕСТВУЕТ!";
        });
    },
    showAllUsers: function() {
      console.log('showAllUsers');
      
      axios
        .get("http://localhost:3000/registration")
        .then(response => {
          console.log(response);
        })
        .catch((error) => {
          // thisObj.errorMessages = "ТАКОЙ ЗАГОЛОВОК УЖЕ СУЩЕСТВУЕТ!";
        });
    },
    showErrorMessage: function(errors = []) {
      this.errorMessages = errors;
      this.isVisibleModalMessage = true;

      setTimeout(() => {
        this.isVisibleModalMessage = false;
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