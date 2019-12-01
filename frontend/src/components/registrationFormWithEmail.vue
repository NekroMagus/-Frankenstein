<template>
  <div class="form-box">
    <div class="form">
      <label class="form__label" for>Почта:</label>
      <input type="email" v-model="email" size="16" maxlength="16" placeholder="name@email.com" />
      <label class="form__label" for>Пароль:</label>
      <input type="password" v-model="password" size="16" maxlength="16" />
      <label class="form__label" for>Повторите пароль:</label>
      <input type="password" v-model="repeatPassword" size="16" maxlength="16" />
      <input
        class="form__submit"
        type="submit"
        @click="submitRegistration"
        value="Зарегистрироваться"
      />
    </div>
  </div>
</template>

<script>
import RegistryValidator from "../assets/js/registryValidator.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      repeatPassword: ""
    };
  },
  methods: {
    isValidData: function() {
      if (!RegistryValidator.isValidEmail(this.email)) {
        return false;
      }
      if (!RegistryValidator.isValidPassword(this.password)) {
        return false;
      }
      if (
        !RegistryValidator.isValidRepeatPassword(
          this.password,
          this.repeatPassword
        )
      ) {
        return false;
      }
      return true;
    },
    submitRegistration: function() {
      if (this.isValidData()) {
        this.$emit("submitRegistrationWithEmail", {
          user: { email: this.email, password: this.password }
        });
      } else {
        this.$emit("error", RegistryValidator.errors);
      }
    }
  }
};
</script>

<style>
.form-box {
  display: flex;
  justify-content: center;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 5px #333;
  padding: 15px 25px;
  border-radius: 5px;
}

.form__label {
  padding: 10px 0 0px 0;
}

.form__submit {
  margin: 20px 0 5px;
}
</style>