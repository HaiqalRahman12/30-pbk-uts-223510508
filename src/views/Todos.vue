<template>
  <div class="todos">
    <center>
      <h3>{{ title }}</h3>
      <h3>{{ subtitle }}</h3>
      <form @submit.prevent="addNewTodo">
        <input v-model="newTodoText" required placeholder="new todo">
        <button>Add Todo</button>
      </form>
      <ul>
        <li v-for="todo in filteredTodos" :key="todo.id">
          <input type="checkbox" v-model="todo.done">
          <span :class="{ done: todo.done }">{{ todo.text }}</span>
          <button @click="removeTodo(todo)">X</button>
        </li>
      </ul>
      <button @click="toggleHideCompleted">
        {{ hideCompleted ? 'Show all' : 'Hide completed' }}
      </button>
    </center>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTodoStore } from '../stores/todoStore';
import { storeToRefs } from 'pinia';

const todoStore = useTodoStore();
const { todos } = storeToRefs(todoStore);

const newTodoText = ref('');
const hideCompleted = ref(false);

const addNewTodo = () => {
  if (newTodoText.value.trim() === '') {
    return;
  }

  const newTodo = {
    id: Date.now(),
    text: newTodoText.value,
    done: false,
  };

  todoStore.addTodo(newTodo);
  newTodoText.value = '';
};

const removeTodo = (todo) => {
  todoStore.deleteTodo(todo);
};

const updateTodoStatus = (todo) => {
  todoStore.updateTodo({ ...todo, done: !todo.done });
};

const toggleHideCompleted = () => {
  hideCompleted.value = !hideCompleted.value;
};

const filteredTodos = computed(() => {
  return hideCompleted.value ? todos.value.filter(todo => !todo.done) : todos.value;
});
</script>

<style scoped>
.done {
  text-decoration: line-through;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 4px;
  padding: 12px;
  display: flex;
  align-items: center;
}

li:hover {
  box-shadow: 0 4px 8px #a38458;
}

input[type="checkbox"] {
  margin-right: 8px;
}

button {
  padding: 8px 16px;
  font-size: 16px;
  background-color: #a38458;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: auto;
}

button:hover {
  background-color: #856a44;
}

/* Form styling */
form {
  margin-bottom: 20px;
}

input[type="text"] {
  width: calc(100% - 80px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

.todos {
  max-width: 600px;
  margin: 50px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
}
</style>
