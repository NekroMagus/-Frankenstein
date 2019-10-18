<template>
  <div>
    <hr />
    <input type="submit" @click="getAllResults" value="search all users" />
    <hr />
    <input
      type="search"
      name="userId"
      v-model="searchedUserId"
      size="10"
      placeholder="enter user id"
    />
    <input type="submit" @click="getResultsById" value="search by id" />
    <div class="search-result">
      <div class="search-result__item rounded" v-for="(item, index) in searchedResult" v-bind:key="index">
        <span class="search-result__userId">Id: {{ item.id }}</span>
        <span class="search-result__title">title: {{ item.title }}</span>
        <p class="search-result__body">{{ item.body }}</p>
        <p class="search-result__user-id">userId: {{item.userId}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchedResult: [],
      searchedUserId: null
    };
  },
  methods: {
    getAllResults: function() {
      axios.get("http://localhost:3000/json").then(response => {
        this.searchedResult = response.data;
      });
    },
    getResultsById: function() {
      axios.get("http://localhost:3000/json/getuser").then(response => {
        this.info = response.data;
        console.log(this.searchedResult);
      });
    }
  },
  watch: {
    searchedUserId: function(value) {
      console.log(value);
    }
  }
};
</script>

<style>
.search-result__item {
  border: 1px solid #000;
  margin: 5px 0;
  cursor: pointer;
  transition: transform .2s;
  background-color: #fff;
}
.search-result__item:hover {
  transform: scale(1.1);
}

.search-result__userId {
  background-color: cornflowerblue;
  color: white;
  padding: 2px 4px;
}
.search-result__title {
  padding-left: 15px;
  font-weight: 600;
}

.search-result__user-id {
  text-align: right;
  padding-right: 9px;
  font-style: italic;
}
</style>
