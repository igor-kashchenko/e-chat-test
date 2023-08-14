<template>
  <v-form class='d-flex mt-4 w-100' @submit.prevent='onTodo'>
    <v-text-field
      class='mr-4'
      label='Enter a todo'
      hide-details
      v-model='todoTitle'
    ></v-text-field>

    <v-btn class='h-auto' variant='tonal' type='submit'>Add todo</v-btn>
  </v-form>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

const emit = defineEmits(['addTodo']);

const onTodo = () => {
  emit('addTodo', todoTitle.value);

  todoTitle.value = '';
};

const todoTitle = ref('');
</script>

<style scoped></style>
