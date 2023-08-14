<template>
  <v-container class='rounded todo-list mt-4 elevation-10' v-if='store.getTodosCount()'>
      <TodoCard
        v-for='todo in store.getTodos()'
        :key='todo.id'
        :todo='todo'
        @deleteTodo='handleDeleteTodo'
        @editTodo='handleEditTodo'
      />

    <div class='d-flex align-center justify-center pa-2 text-h5' v-if="!store.getActiveTodosCount() && store.isFilteredByActive()">
      There are no active tasks.
    </div>

    <div class='d-flex align-center justify-center pa-2 text-h5' v-if="!store.getCompletedTodosCount() && store.isFilteredByCompleted()">
      There are no completed tasks.
    </div>

    <TodoListFooter />
  </v-container>

  <div class='d-flex align-center justify-center empty-todo-list text-h4 mt-10' v-else>
    Nothing to do. Try to add a new ToDo
  </div>
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
</style>
