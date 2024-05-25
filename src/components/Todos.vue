<template>
  <div class="todos">
    <h1>{{ title }}</h1>
    <h1>{{ subtitle }}</h1>
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

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'To Do List '
  },
  subtitle: {
    type: String,
    default: 'Tambahkan Kegiatan'
  }
});


let id = 0;
const newTodo = ref('');
const hideCompleted = ref(false);
const todos = ref([
  { id: id++, text: 'Ibadah', done: true },
  { id: id++, text: 'Olahraga', done: true },
  { id: id++, text: 'Belajar', done: false }
]);

const filteredTodos = computed(() => {
  return hideCompleted.value
    ? todos.value.filter((t) => t.done)
    : todos.value;
});

const addTodo = () => {
  todos.value.unshift({ id: id++, text: newTodo.value, done: false });
  newTodo.value = '';
};

const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
};
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

bady{
  background-color: black;
}



.todos{
  max-width: 600px;
  margin: 50px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  
}
</style>
