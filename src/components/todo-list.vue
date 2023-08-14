<template>
  <v-container class='rounded todo-list mt-4 elevation-10'>
    <transition-group name='list' tag='v-row' no-gutters mode='out-in'>
      <TodoCard
        v-for='todo in store.getTodos()'
        :key='todo.id'
        :todo='todo'
        @deleteTodo='handleDeleteTodo'
        @editTodo='handleEditTodo'
      />
    </transition-group>

    <div class='text-h4 text-center' v-if='!store.getTodosCount()'>
      Add a todo
    </div>

    <TodoListFooter />
  </v-container>
</template>

<script setup lang='ts'>
import TodoListFooter from './todo-list-footer.vue';
import { useTodosStore } from '@/store/todos';
import TodoCard from './todo-card.vue';
const store = useTodosStore();

const handleDeleteTodo = (id: string) => {
  store.deleteTodo(id);
};

const handleEditTodo = (newTitle: string, id: string) => {
  store.editTodo(newTitle, id);
};
</script>

<style scoped>
.todo-list {
  background-color: #e0e0e0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
