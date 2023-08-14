<template>
  <v-col
    cols='12'
    class='d-flex mb-2 align-center justify-space-between pa-2 rounded todo-card'
    :class='{ completed: todo.completed }'
    no-gutters
  >
    <div class='d-flex align-center flex-grow-1'>
      <v-checkbox
        class='mr-4 flex-0-0'
        hide-details
        v-model='todo.completed'
      ></v-checkbox>

      <div class='text-h5 ml-2' v-if='!isBeingEdited'>
        {{ props.todo.title }}
      </div>

      <form v-else class='w-100' @submit.prevent='onSubmitEdit'>
        <input
          class='edit-input pa-2 w-100'
          v-model='editedTitle'
          ref='inputRef'
          @blur='handleBlur'
          @keydown='handleKeyDown'
        />

        <button type='submit'></button>
      </form>
    </div>

    <div v-if='!isBeingEdited' class='action-icons'>
      <v-icon
        icon='mdi-pencil'
        class='delete-icon mr-4'
        @click='handleEdit'
      ></v-icon>

      <v-icon icon='mdi-close' class='delete-icon' @click='onDelete'></v-icon>
    </div>
  </v-col>
</template>

<script setup lang='ts'>
import { Todo } from '@/types/todo';
import { nextTick, ref } from 'vue';

type Props = {
  todo: Todo;
};

const props = defineProps<Props>();
const todo = props.todo;

const emit = defineEmits(['deleteTodo', 'editTodo']);

const onDelete = () => emit('deleteTodo', props.todo.id);

const onSubmitEdit = () => {
  emit('editTodo', editedTitle.value, props.todo.id);
  isBeingEdited.value = false;
};

const isBeingEdited = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const editedTitle = ref(props.todo.title);

const handleEdit = () => {
  isBeingEdited.value = !isBeingEdited.value;

  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus();
    }
  });
};

const handleBlur = () => {
  isBeingEdited.value = false;
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    isBeingEdited.value = false;
    editedTitle.value = todo.title;
  }
};
</script>

<style scoped>
.todo-card {
  background-color: #fff;
  transition: background-color 0.3s linear;
}

.completed {
  background-color: rgba(39, 184, 46, 0.466);
}

.todo-card:last-child {
  margin-bottom: 0 !important;
}

.delete-icon {
  cursor: pointer;
  color: #0000007c;
  transition: color 0.2s linear;
}

.delete-icon:hover {
  color: #000000ad;
}

.delete-icon:active {
  color: #000;
}

.edit-input {
  font-size: 24px;
  font-family: 'Roboto';
}

.action-icons {
  opacity: 0;
  transition: opacity 0.2s linear;
}
.todo-card:hover .action-icons {
  opacity: 1;
}
</style>
