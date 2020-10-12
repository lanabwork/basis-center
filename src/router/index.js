import Vue from 'vue';
import VueRouter from 'vue-router';
import UserList from '@/pages/UserList.vue';
import UserCard from '@/pages/UserCard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'UserList',
    component: UserList,
  },
  {
    path: '/user/:id',
    name: 'UserCard',
    component: UserCard,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
