<template>
  <div class="modalWindow">
    <span class="search-result__Id">Id: {{ data.id }}</span>
    <span class="search-result__title">title: {{ data.title }}</span>
    <br />
    <textarea rows="5" v-model="data.body"></textarea>
    <div class="search_item-footer">
      <button @click="putChanges">Put</button>
      <span class="search-result__user-id">userId: {{data.userId}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["data"],
  methods: {
    putChanges: function() {
      let obj = {
        id: this.data.id,
        title: this.data.title,
        body: this.data.body,
        // userId: this.data.userId
      };
      console.log(obj);
      
      // title, body, id
      axios.put("http://localhost:3000/users", obj).then(response => {
          console.log(response.data);
        });;
    }
  }
};
</script>

<style>
.modalWindow {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>