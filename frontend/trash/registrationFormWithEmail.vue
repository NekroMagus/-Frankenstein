<template>
  <div class="form-box">
    <div class="form" @input="checkErrors">
      <label class="form__label" for>Почта:</label>
      <input
        type="email"
        v-model="email"
        size="16"
        maxlength="16"
        placeholder="name@email.com"
        @blur="$v.email.$touch"
        :class="{'validation-error': $v.email.$error}"
      />

      <label class="form__label" for>Пароль:</label>
      <input
        type="password"
        v-model="password"
        size="16"
        maxlength="16"
        @blur="$v.password.$touch"
        :class="{'validation-error': $v.password.$error}"
      />

      <label class="form__label" for>Повторите пароль:</label>
      <input
        type="password"
        v-model="confirmPassword"
        size="16"
        maxlength="16"
        @blur="$v.confirmPassword.$touch"
        :class="{'validation-error': $v.confirmPassword.$error}"
      />

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
import { email, required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      errorList: []
    };
  },
  validations: {
    email: {
      required,
      email,
      minLength: minLength(5),
      onlyLetterFirst() {
        return true;
      }
    },
    password: {
      required,
      minLength: minLength(5)
    },
    confirmPassword: {
      sameAs: sameAs("password")
    }
  },
  mounted() {
    this.checkErrors();
  },
  methods: {
    checkErrors() {
      let errors = [];
      if (!this.$v.email.required) errors.push("Введите почту");
      if (!this.$v.email.email) errors.push("Почта введена не корректно");
      if (!this.$v.email.minLength)
        errors.push(`Почта должна быть не менее ${5} символов`);
      if (!this.$v.password.required) errors.push(`Введите пароль`);
      if (!this.$v.password.minLength)
        errors.push(`Пароль должен быть не менее ${5} символов`);
      if (!this.$v.confirmPassword.sameAs)
        errors.push(`Повторный пароль не совпадает`);

      this.errorList = errors;
    },
    submitRegistration: function() {
      if (this.errorList.length === 0) {
        this.$emit("submitRegistrationWithEmail", {
          email: this.email,
          password: this.password
        });
      } else {
        this.$emit("error", this.errorList);
      }
    }
  }
};
</script>

<style scoped>
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

.validation-error {
  border: 2px solid red;
}
</style>