<template>
  <div class="user-list container">
    <router-link
      class="user-list__item"
      v-for="(user, index) in users"
      :key="index"
      :to="`/user/${user.id}`">
      <User
        :id="user.id"
        :name="user.name"
        :email="user.email">
      </User>
    </router-link>
  </div>
</template>

<script>
import User from '@/components/User.vue';

export default {
  name: 'UserList',
  components: {
    User,
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
  },
};
</script>

<style scoped lang="scss">
.user-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &__item {
    width: 100%;
    flex-shrink: 0;
    transition: box-shadow $base-transition;
    margin-bottom: 16px;

    @include breakpoint(lg) {
      width: calc(50% - 16px);
    }

    @include hover(true) {
      box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.23);
    }
  }
}
</style>
