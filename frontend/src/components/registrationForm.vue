<template>
  <div>
    <label for>Логин:</label>
    <input type="text" v-model="login" size="16" maxlength="16" />
    <label for>Пароль:</label>
    <input type="password" v-model="password" size="16" maxlength="16" />
    <label for>Повторите пароль:</label>
    <input type="password" v-model="repeatPassword" size="16" maxlength="16" />
    <input type="submit" @click="submitRegistration" value="Зарегистрироваться" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: "",
      password: "",
      repeatPassword: "",
      errors: []
    };
  },
  methods: {
    isValidData: function() {
      this.errors = [];

      if (this.login.length < 5 || this.password.length < 5) {
        this.errors.push("логин или пароль не могут быть меньее 5 символов");
      } else if (this.password !== this.repeatPassword) {
        this.errors.push("повторный пароль введен неверно");
      }
        
      if (Number.isInteger(+this.login[0])) {
        this.errors.push("логин не может начинаться с числа");
      }

      if (this.errors.length > 0) {
        return false;
      } else {
        return true;
      }
    },
    submitRegistration: function() {
      if (this.isValidData()) {
        this.$emit("submitregistration", {
          login: this.login,
          password: this.password
        });
      } else {
        this.$emit("error", this.errors);
      }
    }
  }
};
</script>

<style>
</style>