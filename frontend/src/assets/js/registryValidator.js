class RegistryValidator {
  constructor() {
    this.loginMinLength = 5;
    this.emailMinLength = 5;
    this.passwordMinLength = 5;
    this.errors = [];
  }

  isValidLogin(login) {
    this.errors = [];

    if (login.length < this.loginMinLength) {
      this.errors.push(
        `Validator: логин не может быть меньее ${this.loginMinLength} символов`
      );
    }
    if (Number.isInteger(+login[0])) {
      this.errors.push("Validator: логин не может начинаться с числа");
    }

    if (this.errors.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  isValidEmail(email) {
    this.errors = [];

    if (email.length < this.emailMinLength) {
      this.errors.push(
        `Validator: почта не может быть меньее ${this.emailMinLength} символов`
      );
    }
    if (Number.isInteger(+email[0])) {
      this.errors.push("Validator: почта не может начинаться с числа");
    }

    if (this.errors.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  isValidRepeatPassword(password, repeatPassword) {
    if (password !== repeatPassword) {
      this.errors.push("Validator: повторный пароль введен неверно");
    }

    if (this.errors.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  isValidPassword(password) {
    this.errors = [];

    if (password.length < this.passwordMinLength) {
      this.errors.push(
        `Validator: пароль не может быть меньее ${this.passwordMinLength} символов`
      );
    }

    if (this.errors.length > 0) {
      return false;
    } else {
      return true;
    }
  }
}

module.exports = new RegistryValidator();
