<template>
  <div>
    <hr />
    <button @click="showModalMessage">test button</button>
    <!-- post comment -->
    <input v-model="searchedUserId" name="userId" type="text" placeholder="userid" size="5" />
    <input v-model="postedTitle" name="title" type="text" placeholder="title" size="50" />
    <input @click="postComment" type="submit" value="post comment" />
    <br />
    <textarea v-model="postedBody" name="body" type="text" placeholder="body" rows="7"></textarea>

    <hr />
    <!-- searc all users -->
    <input type="submit" @click="getAllResults" value="search all users" />

    <hr />
    <!-- search by user id -->
    <input
      type="search"
      name="userId"
      v-model="searchedUserId"
      size="10"
      placeholder="enter user id"
    />
    <input type="submit" @click="getResultsByUserId" value="search by userId" />

    <hr />
    <!-- search by id -->
    <input type="search" name="Id" v-model="searchedId" size="10" placeholder="enter id" />
    <input type="submit" @click="getResultsById" value="search by Id" />

    <hr />
    <!-- show search result -->
    <div class="search-result">
      <div
        class="search-result__item rounded"
        v-for="(item, index) in searchedResult"
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

    <modal-message :visibility="isVisibleModalMessage" :message="modalMessage"></modal-message>
  </div>
</template>

<script>
import modalWindow from "./modal.vue";
import modalMessage from "./modalMessage";

export default {
  data() {
    return {
      searchedResult: [],
      searchedId: null,
      searchedUserId: null,
      postedTitle: "",
      postedBody: "",
      selectedItem: {},
      editableTitle: "",
      editableBody: "",
      isVisibleModalEdit: false,
      isVisibleModalMessage: true,
      modalMessage: ""
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
          params: { id: this.searchedId }
        })
        .then(response => {
          this.searchedResult = response.data;
        });
    },
    getResultsByUserId: function() {
      axios
        .get("http://localhost:3000/users", {
          params: { userId: this.searchedUserId }
        })
        .then(response => {
          this.searchedResult = response.data;
        })
        .then(response => {
          console.log(response.data);
        });
    },
    postComment: function() {
      let obj = {
        userId: this.searchedUserId,
        title: this.postedTitle,
        body: this.postedBody
      };

      axios
        .post("http://localhost:3000/users", obj)
        .then(response => {
          console.log("response");
        })
        .catch(function(error) {
          console.log("oshibka");
          // this.modalMessage = "ОШИБКА";
        });
    },
    deleteComment: function(ind) {
      console.log(ind);

      axios
        .delete("http://localhost:3000/users", {
          params: { id: ind }
        })
        .then(response => {
          console.log(response.data);
        });
    },
    showModalMessage: function() {
      console.log(modalMessage);
      this.isVisibleModalMessage = true;
    }
  },
  watch: {
    showModal: function() {
      console.log(this.showModal);
    }
  },
  components: {
    modalWindow,
    modalMessage
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
