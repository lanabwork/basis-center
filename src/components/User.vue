<template>
  <div class="user">
    <div class="user__id"> id: {{ id }}</div>
    <div class="user__name"> Имя: {{ name }}</div>
    <div class="user__email"> Email: {{ email }}</div>
    <div v-if="isUserCard" class="user__phone"> Телефон: {{ phone }}</div>
  </div>
</template>

<script>

export default {
  name: 'User',
  props: {
    id: {
      type: Number,
    },
    name: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
  },
  computed: {
    isUserCard() {
      return this.$route.name === 'UserCard';
    },
  },
};
</script>

<style scoped lang="scss">
  .user {
    border-radius: 4px;
    border: 1px solid $borderColor;
    padding: 16px;
    color: $black;
  }
</style>
