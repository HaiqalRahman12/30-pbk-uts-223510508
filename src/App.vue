<script setup>
import { ref, computed } from 'vue'

let id = 0

const newTodo = ref('')
const hideCompleted = ref(false)
const todos = ref([
  { id: id++, text: 'Ibadah', done: true },
  { id: id++, text: 'Olahraga', done: true },
  { id: id++, text: 'Belajar', done: false }
])

const filteredTodos = computed(() => {
  return hideCompleted.value
    ? todos.value.filter((t) => !t.done)
    : todos.value
})

function addTodo() {
  todos.value.unshift({ id: id++, text: newTodo.value, done: false })
  newTodo.value = ''
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo)
}
</script>

<template>
  <div id="app">
    <form @submit.prevent="addTodo">
    <input v-model="newTodo" required placeholder="new todo">
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <input type="checkbox" v-model="todo.done">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
  <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
  </button>
  </div>
</template>

<style>
.done {
  text-decoration: line-through;
}
</style>

<style>
.done {
  text-decoration: line-through;
}

#app {
  max-width: 600px;
  margin: 50px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

body {
  font-family: Arial, sans-serif;
  background-color: #d9dad4;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 600px;
  margin: 20px auto;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
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

button {
  padding: 8px 16px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

/* List styling */
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

/* Checkbox styling */
input[type="checkbox"] {
  margin-right: 8px;
}

/* Button styling */
button {
  margin-left: auto;
  background-color: #a38458;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
}

button:hover {
  background-color: #916f40;
}

/* Text styling */
.done {
  text-decoration: line-through;
  color: #666;
}

</style>