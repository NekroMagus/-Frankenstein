<template>
  <div>
    <input v-model.number="userId" type="number" placeholder="userid" size="5" />
    <input v-model="title" type="text" placeholder="введите не менее трех символов" size="50" />
    <input @click="submitComment" type="submit" value="post comment" />
    <br />
    <textarea v-model="body" type="text" placeholder="введите не менее пяти символов" rows="7"></textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: 1,
      title: "",
      body: "",
      errors: []
    };
  },
  props: {
    // placeholder: String,
    // btncaption: String
  },
  methods: {
    submitComment: function() {
      if (this.isValidData()) {
        this.$emit("submitcomment", {
          userId: this.userId,
          title: this.title,
          body: this.body
        });
      } else {
        this.userId = 1;          
        this.$emit("error", this.errors);
      }
    },
    isValidData: function() {
      this.errors = [];

      if (this.userId < 1) {
        this.errors.push("userId не может быть меньше 1");
      }
      if (this.title.length < 3) {
        this.errors.push("заголовок не может быть короче трех символов");
      }
      if (this.body.length < 3) {
        this.errors.push("комментарий не может быть короче пяти символов");
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