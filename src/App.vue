<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    getUserList() {
      this.$store.dispatch('getUsers');
    },
  },
  created() {
    this.getUserList();
  },
};
</script>
