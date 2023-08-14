<template>
  <AppContainer>
    <div class='text-h2 text-center'>To-Do List</div>

    <TodoAddform @addTodo='handleAddTodo' />

    <TodoList />
  </AppContainer>
</template>

<script setup lang='ts'>
import AppContainer from './components/app-container.vue';
import TodoAddform from './components/todo-addform.vue';
import TodoList from './components/todo-list.vue';
import { useTodosStore } from './store/todos';

const store = useTodosStore();

const handleAddTodo = (title: string) => {
  store.addTodo(title);
};
</script>
