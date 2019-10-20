<template>
  <div>
    <hr />

    <input v-model="searchedUserId" name="userId" type="text" placeholder="userid" size="5" />
    <input v-model="currentTitle" name="title" type="text" placeholder="title" size="50" />
    <input @click="postComment" type="submit" value="post comment" />
    <br />
    <textarea v-model="currentBody" name="body" type="text" placeholder="body" rows="7"></textarea>

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

    <hr>

    <div class="search-result">
      <div
        class="search-result__item rounded"
        v-for="(item, index) in searchedResult"
        v-bind:key="index"
      >
        <span class="search-result__Id">Id: {{ item.id }}</span>
        <span class="search-result__title">title: {{ item.title }}</span>
        <br>
        <textarea class="search-result__body" type="text" :value="`${item.body}`" rows="5"></textarea>
        <div class="search_item-footer">
          <button>Put changes</button>
          <span class="search-result__user-id">userId: {{item.userId}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchedResult: [],
      searchedUserId: null,
      currentTitle: "",
      currentBody: ""
    };
  },
  methods: {
    getAllResults: function() {
      axios.get("http://localhost:3000/users").then(response => {
        this.searchedResult = response.data;
      });
    },
    getResultsById: function() {
      axios
        .get("http://localhost:3000/users", {
          params: { userId: this.searchedUserId }
        })
        .then(response => {
          this.searchedResult = response.data;
        });
    },
    postComment: function() {
      let obj = {
        userId: this.searchedUserId,
        title: this.currentTitle,
        body: this.currentBody
      };

      axios.post("http://localhost:3000/users", obj);
    }
  }
};
</script>

<style>
.search-result__item {
  border: 1px solid #000;
  margin: 5px 0;
  cursor: pointer;
  transition: transform 0.2s;
  background-color: #fff;
}
.search-result__item:hover {
  transform: scale(1.1);
}

.search-result__Id {
  background-color: cornflowerblue;
  color: white;
  padding: 2px 4px;
}
.search-result__title {
  padding-left: 15px;
  font-weight: 600;
}
.search_item-footer {
  display: flex;
  justify-content: flex-end;
  padding: 5px;
}
.search-result__user-id {
  padding: 0 9px;
  font-style: italic;
}

/* .search-result__body {
  width: 100%;
} */

textarea {
  width: 100%;
  resize: none;
}
</style>
