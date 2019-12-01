<template>
  <div class="accounts-box">
    <div class="accont-card__box" v-for="(item, index) in accountList" :key="index">
      <div class="account-card">
        <div class="account-card__header">
          <span class="account-card__number">{{ index + 1 }}</span>
          <img
            class="account-card__btn-delete"
            src="../assets/images/delete.svg"
            title="удалить пользователя"
          />
        </div>
        <label>email:</label>
        <p class="account-email">{{ item.email }}</p>
      </div>
    </div>
  </div>
</template>

<script>
//
//
export default {
  data() {
    return {};
  },
  props: {
    accountList: Array
  }
};
</script>

<style>
.accounts-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.accont-card__box {
  padding: 5px;
}

.account-card {
  width: 200px;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 5px;
}

.account-card__header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 3px;
  border-bottom: 1px solid #999;
}

.account-card__btn-delete {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
</style>