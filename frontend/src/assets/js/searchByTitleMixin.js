export default {
  data() {
    return {
      searchedResult: [],
      searchTitle: ""
    };
  },
  computed: {
    filteredDyTitleResults() {
      return this.searchedResult.filter(item => {
        return item.title.indexOf(this.searchTitle) !== -1;
      });
    }
  }
};
