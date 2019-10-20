<template>
  <div class="modalWindow" v-if="visibility">
    <div class="container">
      <span class="search-result__Id">Id: {{ data.id }}</span>
      <span class="modal__title">title: {{ data.title }}</span>
      <br />
      <textarea v-model="data.body"></textarea>
      <div class="search_item-footer">
        <button @click="putChanges">Put</button>
        <button @click="$emit('close')">Close</button>
        <span class="search-result__user-id">userId: {{data.userId}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    data: {},
    visibility: Boolean
  },
  methods: {
    putChanges: function() {
      let obj = {
        id: this.data.id,
        title: this.data.title,
        body: this.data.body
        // userId: this.data.userId
      };

      axios.put("http://localhost:3000/users", obj).then(response => {
        console.log(response.data);
      });
    }
  }
};
</script>

<style scoped>
.modalWindow {
  width: 100%;
  /* height: 50%; */
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
textarea {
  height: 200px;
  padding: 9px;
}
.modal__title {
    font-weight: 600;
    color: white;
    text-shadow: 0 0 5px black;
}
</style>