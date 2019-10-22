<template>
  <div class="form-box">
    <div class="form">
      <label class="form__label" for>Логин:</label>
      <input type="text" v-model="login" size="16" maxlength="16" />
      <label class="form__label" for>Пароль:</label>
      <input type="password" v-model="password" size="16" maxlength="16" />
      <label class="form__label" for>Повторите пароль:</label>
      <input type="password" v-model="repeatPassword" size="16" maxlength="16" />
      <input class="form__submit" type="submit" @click="submitRegistration" value="Зарегистрироваться" />
    </div>
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