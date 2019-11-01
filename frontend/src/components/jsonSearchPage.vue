<template>
  <div>
    <post-comment-bar v-on:submitcomment="postComment" v-on:error="showErrorMessage"></post-comment-bar>

    <hr />
    <!-- searc all users -->
    <input type="submit" @click="getAllResults" value="search all users" />

    <hr />
    <div class="get-results-box">
      <search-number-bar
        v-on:mysubmit="getResultsByUserId"
        v-on:error="showErrorMessage"
        placeholder="1"
        btncaption="search by userId"
      ></search-number-bar>

      <search-number-bar
        v-on:mysubmit="getResultsById"
        v-on:error="showErrorMessage"
        placeholder="1"
        btncaption="search by Id"
      ></search-number-bar>
    </div>

    <hr />

    <input
      type="text"
      v-model="searchTitle"
      v-show="searchedResult.length > 0"
      placeholder="search by title"
    />

    <hr />

    <!-- show search result -->
    <div class="search-result">
      <div
        class="search-result__item rounded"
        v-for="(item, index) in filteredDyTitleResults"
        v-bind:key="index"
        @click="selectedItem=item"
      >
        <span class="search-result__Id">Id: {{ item.id }}</span>
        <span class="search-result__title">title: {{ item.title }}</span>
        <br />
        <p class="search-result__body">{{item.body}}</p>
        <div class="search_item-footer">
          <button @click="deleteComment(item.id)">Delete</button>
          <button @click="isVisibleModalEdit = true">Edit</button>
          <span class="search-result__user-id">userId: {{item.userId}}</span>
        </div>
      </div>
    </div>

    <!-- modals -->
    <modal-window
      v-on:close="isVisibleModalEdit=false"
      :data="selectedItem"
      :visibility="isVisibleModalEdit"
    ></modal-window>

    <modal-message :visibility="errorMessageIsVisible" :messages="errorMessages"></modal-message>
  </div>
</template>

<script>
import searchNumberBar from "./searchNumberBar.vue";
import postCommentBar from "./postCommentBar.vue";

import modalWindow from "./modal.vue";

import searchByTitleMixin from "../assets/js/searchByTitleMixin.js";

export default {
  data() {
    return {
      selectedItem: {},
      isVisibleModalEdit: false,
      errorMessages: [],
      errorMessageIsVisible: false
    };
  },
  mixins: [searchByTitleMixin],
  methods: {
    testMethod: function(value) {
      console.log("test method");
      console.log(value);
    },
    getAllResults: function() {
      axios.get("http://localhost:3000/users").then(response => {
        this.searchedResult = response.data;
      });
    },
    getResultsById: function(id) {
      axios
        .get("http://localhost:3000/users", {
          params: { id: id }
        })
        .then(response => {
          this.searchedResult = response.data;
        });
    },
    getResultsByUserId: function(id) {
      axios
        .get("http://localhost:3000/users", {
          params: { userId: id }
        })
        .then(response => {
          this.searchedResult = response.data;
        });
    },
    postComment: function(obj) {
      axios
        .post("http://localhost:3000/users", obj)
        .then(response => {
          console.log("response");
        })
        .catch(error => {
          this.errorMessages.push("ТАКОЙ ЗАГОЛОВОК УЖЕ СУЩЕСТВУЕТ!");
        });
    },
    deleteComment: function(ind) {
      axios
        .delete("http://localhost:3000/users", {
          params: { id: ind }
        })
        .then(response => {
          console.log(response.data);
        });
    },
    showErrorMessage: function(errors = []) {
      this.errorMessages = errors;
      this.errorMessageIsVisible = true;

      setTimeout(() => {
        this.errorMessageIsVisible = false;
      }, 4000);
    }
  },
  watch: {},
  components: {
    searchNumberBar,
    postCommentBar,
    modalWindow
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

.get-results-box {
  display: flex;
  justify-content: space-around;
}

textarea {
  width: 100%;
  resize: none;
}
</style>
