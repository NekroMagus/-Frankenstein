<template>
  <div>
    <div class="form-box">
      <registration-form v-on:submitregistration="submitRegistration" v-on:error="showErrorMessage"></registration-form>
      <registration-form-with-email
        v-on:submitRegistrationWithEmail="submitRegistrationWithEmail"
        v-on:error="showErrorMessage"
      ></registration-form-with-email>
      <authorization-form v-on:submitAuthorization="submitAuthorization"></authorization-form>
    </div>
    <hr />
    <button @click="showAllUsers">show all users</button>
    <button @click="currentGet">show current user</button>
    <modal-message :visibility="isVisibleModalMessage" :messages="errorMessages"></modal-message>
  </div>
</template>

<script>
import registrationForm from "./registrationForm.vue";
import registrationFormWithEmail from "./registrationFormWithEmail.vue";
import authorizationForm from "./authorizationForm.vue";
import modalMessage from "./modalMessage";

let token;

export default {
  data() {
    return {
      isVisibleModalMessage: false,
      errorMessages: []
    };
  },
  methods: {
    currentGet: function() {
      console.log(token);

      // axios.defaults.headers.common["Authorization"] = token;

      axios({
        url: "http://localhost:3000/current",
        method: "get",
        headers: { Authorization: `Token ${token}` }
      })
        .then(response => {
          console.log("response");
          console.log(response);
        })
        .catch(error => {
          console.log("oshibka");
          console.log(error);
        });
    },
    submitAuthorization: function(obj) {
      console.log(obj);
      axios
        .post("http://localhost:3000/login", obj)
        .then(response => {
          console.log(response);
          token = response.data.user.token;
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitRegistration: function(obj) {
      console.log(obj);

      axios
        .post("http://localhost:3000/registration", obj)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitRegistrationWithEmail: function(obj) {
      console.log(obj);
      axios
        .post("http://localhost:3000/rega", obj)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    showAllUsers: function() {
      console.log("showAllUsers");

      axios
        .get("http://localhost:3000/registration")
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);

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
    registrationFormWithEmail,
    authorizationForm,
    modalMessage
  }
};
</script>

<style>
.form-box {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
</style>