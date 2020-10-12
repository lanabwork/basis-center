<template>
  <div class="task" :class="{'task--completed': completed}">
    <div
      :class="['task__important-label', {'task__important-label--important': importantState}]">
      {{ importantStateLabel }}
    </div>
    <div class="task__id"> Номер задачи: {{ id }}</div>
    <div class="task__title"> Название задачи: {{ title }}</div>
    <div class="task__state"> Статус задачи: {{ taskState }}</div>
    <button class="task__important" @click="toggleImportant">
      Сменить тип важности
    </button>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: {
    id: {
      type: Number,
    },
    title: {
      type: String,
      default: '',
    },
    completed: {
      type: Boolean,
    },
  },
  data() {
    return {
      importantState: null,
      localStorageTodos: JSON.parse(localStorage.getItem('todos')),
    };
  },
  watch: {
    importantState() {
      this.localStorageTodos = JSON.parse(localStorage.getItem('todos'));
      const currentImportant = this.importantState;
      const newLocalStorageTodos = this.localStorageTodos;
      newLocalStorageTodos.find((user) => user.id === this.userId).tasks.find((task) => task.id === this.id).isImportant = currentImportant;
      localStorage.setItem('todos', JSON.stringify(newLocalStorageTodos));
    },
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
    taskState() {
      return this.completed ? 'Готово' : 'В работе';
    },
    importantStateLabel() {
      return this.importantState ? 'Важное' : 'Обычное';
    },
  },
  methods: {
    toggleImportant() {
      this.importantState = !this.importantState;
    },
    getImportantState() {
      const currentUser = this.localStorageTodos.find((user) => user.id === this.userId);
      this.importantState = currentUser.tasks.find((task) => task.id === this.id).isImportant;
    },
  },
  mounted() {
    this.getImportantState();
  },
};
</script>

<style scoped lang="scss">
  .task {
    background-color: $defaultTaskColor;
    border-radius: 4px;
    padding: 16px;
    display: flex;
    flex-direction: column;

    &:not(:last-child) {
      margin-bottom: 16px;
    }

    &--completed {
      background-color: $completedTaskColor;
    }

    &__important-label {
      border-radius: 16px;
      padding: 8px;
      background-color: $defaultLabelColor;
      align-self: flex-start;

      &--important {
        background-color: $importantLabelColor;
      }
    }

    &__important {
      align-self: flex-start;
    }
  }
</style>
