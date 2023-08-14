import { Todo } from '@/types/todo';
import { v4 as uuidv4 } from 'uuid';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { FilterBy } from '@/types/filterBy';

export const useTodosStore = defineStore(
  'todos',
  () => {
    const todos = ref<Todo[]>([]);

    const todoFilter = ref<FilterBy>(FilterBy.ALL);

    const isFilteredByActive = () => todoFilter.value === FilterBy.ACTIVE;

    const isFilteredByCompleted = () => todoFilter.value === FilterBy.COMPLETED;

    const getTodos = (filterBy: string = todoFilter.value) => {
      return todos.value.filter((todo) => {
        switch (filterBy) {
        case FilterBy.ACTIVE:
          return !todo.completed;

        case FilterBy.COMPLETED:
          return todo.completed;

        default:
          return true;
        }
      });
    };

    const addTodo = (title: string) => {
      const newTodo = {
        id: uuidv4(),
        title,
        completed: false,
      };

      if (title) {
        todos.value.push(newTodo);
      }
    };

    const deleteTodo = (id: string) => {
      todos.value = todos.value.filter((todo) => todo.id !== id);
    };

    const editTodo = (newTitle: string, id: string) => {
      todos.value = todos.value.map((todo) =>
        todo.id === id
          ? { ...todo, title: newTitle }
          : todo
      );
    };

    const getTodosCount = () => {
      return todos.value.length;
    };

    const getActiveTodosCount = () => {
      return todos.value.filter((todo) => !todo.completed).length;
    };

    const getCompletedTodosCount = () => {
      return todos.value.filter((todo) => todo.completed).length;
    };

    return {
      todos,
      addTodo,
      deleteTodo,
      editTodo,
      getActiveTodosCount,
      getTodos,
      todoFilter,
      getTodosCount,
      getCompletedTodosCount,
      isFilteredByActive,
      isFilteredByCompleted,
    };
  },
  {
    persist: true,
  }
);
