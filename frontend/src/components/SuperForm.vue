<template>
  <div class="form-box">
    <div class="form" @input="checkErrors">
      <div class="form__item" v-if="mode==='REG_EMAIL' || mode==='AUTH_EMAIL'">
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
      </div>

      <div class="form__item" v-if="mode==='REG_LOGIN' || mode==='AUTH_LOGIN'">
        <label class="form__label" for>Логин:</label>
        <input
          type="text"
          v-model="login"
          size="16"
          maxlength="16"
          @blur="$v.login.$touch"
          :class="{'validation-error': $v.login.$error}"
        />
      </div>

      <div class="form__item">
        <label class="form__label" for>Пароль:</label>
        <input
          type="password"
          v-model="password"
          size="16"
          maxlength="16"
          @blur="$v.password.$touch"
          :class="{'validation-error': $v.password.$error}"
        />
      </div>

      <div class="form__item" v-if="mode==='REG_EMAIL' || mode==='REG_LOGIN'">
        <label class="form__label" for>Повторите пароль:</label>
        <input
          type="password"
          v-model="confirmPassword"
          size="16"
          maxlength="16"
          @blur="$v.confirmPassword.$touch"
          :class="{'validation-error': $v.confirmPassword.$error}"
        />
      </div>

      <input class="form__submit" type="submit" @click="submitFormData" :value="btnCaption" />
    </div>
  </div>
</template>

<script>
import { email, required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  props: {
    mode: {
      type: String,
      required: true,
      default: "REG_EMAIL"
    }
  },
  data() {
    return {
      email: "",
      login: "",
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
    login: {
      required,
      minLength: minLength(5)
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

      if (this.mode === "REG_LOGIN" || this.mode === "AUTH_LOGIN") {
        if (!this.$v.login.required) errors.push("Введите логин");
        if (!this.$v.login.minLength)
          errors.push(`Логин должен быть не менее ${5} символов`);
      }

      if (this.mode === "REG_EMAIL" || this.mode === "AUTH_EMAIL") {
        if (!this.$v.email.required) errors.push("Введите почту");
        if (!this.$v.email.email) errors.push("Почта введена не корректно");
        if (!this.$v.email.minLength)
          errors.push(`Почта должна быть не менее ${5} символов`);
      }

      if (this.mode === "REG_EMAIL" || this.mode === "REG_LOGIN") {
        if (!this.$v.confirmPassword.sameAs)
          errors.push(`Повторный пароль не совпадает`);
      }

      if (!this.$v.password.required) errors.push(`Введите пароль`);
      if (!this.$v.password.minLength)
        errors.push(`Пароль должен быть не менее ${5} символов`);

      this.errorList = errors;
    },
    submitFormData: function() {
      if (this.errorList.length === 0) {
        this.$emit("onsubmit", this.getFormData());
      } else {
        this.$emit("error", this.errorList);
      }
    },
    getFormData() {
      let formData = {};
      if (this.login) formData.login = this.login;
      if (this.email) formData.email = this.email;
      if (this.password) formData.password = this.password;
      return formData;
    }
  },
  computed: {
    btnCaption() {
      if (this.mode.split("_")[0] === "REG") {
        return "Зарегистрироваться";
      } else {
        return "Авторизироваться";
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

.form__item {
    display: flex;
    flex-direction: column;
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