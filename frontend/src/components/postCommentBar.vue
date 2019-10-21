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
      body: ""
    };
  },
  props: {
    // placeholder: String,
    // btncaption: String
  },
  methods: {
    submitComment: function() {
      this.$emit("submitcomment", {
        userId: userId,
        title: title,
        body: body
      });
    }
  }
};
</script>

<style>
</style>