<template>
  <v-container
    class='d-flex align-center justify-space-between'
    v-if='store.getTodosCount()'
  >
    <span class='todos-count'
      >{{ store.getActiveTodosCount() }} items left</span
    >

    <div>
      <v-btn
        class='filter-btn'
        v-for='link of linksText'
        :key='link'
        variant='plain'
        :class='getButtonVariant(link)'
        @click='handleToggleFilter(FilterBy[link as keyof typeof FilterBy])'
      >
        {{ link }}
      </v-btn>
    </div>
  </v-container>
</template>

<script setup lang='ts'>
import { useTodosStore } from '@/store/todos';
import { FilterBy } from '@/types/filterBy';

const store = useTodosStore();

const linksText = Object.keys(FilterBy);

const handleToggleFilter = (filterBy: FilterBy) => {
  store.todoFilter = filterBy;
};

const getButtonVariant = (link: string) => {
  return store.todoFilter === FilterBy[link as keyof typeof FilterBy]
    ? 'is-active-btn'
    : '';
};
</script>

<style scoped>
.todo-list-footer {
  background-color: #fff;
}

.todos-count {
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: #000;
}

.todos-link {
  text-decoration: none;
  color: #000;
  font-size: 20px;
}

.filter-btn {
  border: 1px solid transparent;
}

.is-active-btn {
  border: 1px solid #000;
}
</style>
