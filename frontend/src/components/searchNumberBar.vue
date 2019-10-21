<template>
  <div>
    <input type="number" v-model.number="inputValue" size="10" :placeholder="placeholder" />
    <input type="submit" @click="submitNumber" :value="btncaption" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: 1,
      errors: []
    };
  },
  props: {
    placeholder: String,
    btncaption: String
  },
  methods: {
    submitNumber: function() {
      if (this.isValidData()) {
        this.$emit("mysubmit", this.inputValue);
      } else {
        this.inputValue = 1;
        this.$emit("error", this.errors);
      }
    },
    isValidData: function() {
      this.errors = [];

      if (this.inputValue < 1) {
        this.errors.push("значение не может быть меньше 1");
      }

      if (this.errors.length > 0) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style>
</style>