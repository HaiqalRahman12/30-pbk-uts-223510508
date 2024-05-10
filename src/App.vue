<template>
  <div>
    <header>
      <nav>
        <ul>
          <li @click="showTodos">Todos</li>
          <li @click="showPosts">Posts</li>
        </ul>
      </nav>
    </header>
    <div v-if="showingTodos" id="todos">
      <h1>Todo-list</h1>
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
    <div v-else id="posts">
      <h1>Postingan Pengguna</h1>
      <select v-model="selectedUser" @change="fetchPosts">
        <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
      </select>
      <div v-if="isLoading">
        <span class="loading-message">Loading posts...</span>
      </div>
      <div v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted,watch } from 'vue';

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

const showingTodos = ref(true);
const selectedUser = ref(null);
const isLoading = ref(false); 
const users = ref([]);
const posts = ref([]);

const fetchUser = async () => {
  try {
    isLoading.value = true; 
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    console.log('User yang di fetch:', data); 
    users.value = data;
  } catch (error) {
    console.error('Error Fetch User:', error);
  } finally {
    isLoading.value = false; 
  }
};

const fetchPosts = async () => {
  if (!selectedUser.value) return;
  isLoading.value = true;
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
    const data = await response.json();
    console.log('Post yang di fetch:', data); 
    posts.value = data;
  } catch (error) {
    console.error('Error Fetch Post:', error);
  } finally {
    isLoading.value = false; 
  }
};


watch(selectedUser, () => {
  posts.value = []; 
  fetchPosts();
}, { immediate: true }); 




const addTodo = () => {
  todos.value.unshift({ id: id++, text: newTodo.value, done: false });
  newTodo.value = '';
};

const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
};

const showTodos = () => {
  showingTodos.value = true;
};

const showPosts = () => {
  showingTodos.value = false;
  fetchUser();
};

onMounted(() => {
  fetchUser();
});
</script>

<style scoped>
.done {
  text-decoration: line-through;
}

#todos,
#posts {
  max-width: 600px;
  margin: 50px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

body {
  font-family: Arial, sans-serif;
  background-color: blue;
  margin: 0;
  padding: 0;
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
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
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
</style>
