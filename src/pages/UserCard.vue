<template>
  <div class="user-card container">
    <!-- Route -->
    <router-link to="/" class="button user-card__back">Вернуться к списку</router-link>

    <div class="user-card__toolbar">
      <!-- Search -->
      <div class="search">
        <input type="text" class="search__field" placeholder="Поиск по заголовку" v-model="search"/>
        <Transition name="fade">
          <button v-if="search" @click="clearSearchQuery">Очистить фильтр</button>
        </Transition>
      </div>

      <!-- Sort -->
      <div class="sort">
        <input type="checkbox" v-model="isSort" id="sort">
        <label for="sort">Сортировать по статусу</label>
      </div>
    </div>

    <!-- User info -->
    <User
      v-if="currentUser"
      :id="currentUser.id"
      :name="currentUser.name"
      :phone="currentUser.phone"
      :email="currentUser.email">
    </User>

    <!-- Todos -->
    <Transition name="fade">
      <div v-if="search && !filteredTodos.length" class="search__empy-result">Ничего не найдено</div>
    </Transition>
    <Task
      v-for="(task, index) in filteredTodos"
      :key="index"
      :id="task.id"
      :title="task.title"
      :completed="task.completed">
    </Task>
  </div>
</template>

<script>
import api from '@/constants/config';
import httpClient from '@/utils/httpClient';
import User from '@/components/User.vue';
import Task from '@/components/Task.vue';

export default {
  name: 'UserCard',
  components: {
    User,
    Task,
  },
  data() {
    return {
      todos: null,
      search: '',
      isSort: false,
    };
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
    currentUser() {
      return this.$store.state.users.find((user) => user.id === parseInt(this.userId, 10));
    },
    filteredTodos() {
      if (this.todos) {
        if (this.isSort) {
          const sortedTodos = [...this.todos].sort((a, b) => a.completed - b.completed);
          return sortedTodos.filter((item) => item.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
        }
        return this.todos.filter((item) => item.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
      }
      return this.todos;
    },
  },
  methods: {
    async getUserTodo() {
      try {
        const { data: todos } = await httpClient(`/${api.users}/${this.userId}/${api.todos}`);
        const newLocalStorageTodos = localStorage.getItem('todos')
          ? JSON.parse(localStorage.getItem('todos'))
          : [];

        if (!newLocalStorageTodos.find((user) => user.id === this.userId)) {
          const tasks = [];

          todos.forEach((task) => {
            tasks.push({ id: task.id, isImportant: false });
          });

          newLocalStorageTodos.push({ id: this.userId, tasks });
          this.setImportantStates(newLocalStorageTodos);
        }

        this.todos = todos;
      } catch (e) {
        console.error(e);
      }
    },
    clearSearchQuery() {
      this.search = '';
    },
    setImportantStates(newTodos) {
      localStorage.setItem('todos', JSON.stringify(newTodos));
    },
  },
  created() {
    this.getUserTodo();
  },
};
</script>

<style scoped lang="scss">
  .user-card {
    display: flex;
    flex-direction: column;

    &__back {
      align-self: flex-end;
      margin-bottom: 16px;
    }

    &__toolbar {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      margin-bottom: 16px;

      @include breakpoint(lg) {
        flex-direction: row;
        align-items: center;
      }
    }

    .search {
      margin-bottom: 16px;

      @include breakpoint(lg) {
        margin-bottom: 0;
      }
    }

    .user {
      margin-bottom: 16px;
    }
  }
</style>
