<template>
  <div class="app">
    <Header @menu-click="handleMenuClick" />
    
    <div v-if="activeMenu === 'todos'">
      <Todos :todos="todos" />
    </div>

    <div v-else-if="activeMenu === 'posts'">
      <Posts :posts="posts" :users="users" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from './components/Header.vue';
import Todos from './components/Todos.vue';
import Posts from './components/Posts.vue';

const activeMenu = ref('todos'); 
const todos = ref([]); 
const posts = ref([]); 
const users = ref([]); 

const handleMenuClick = (menu) => {
  activeMenu.value = menu;
};

// Fetch data on mount
onMounted(() => {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(json => todos.value = json);

  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => posts.value = json);

  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => users.value = json);
});
</script>

<style>
.app {
  padding: 20px;
  
}
bady{
  background-color: black;
}
</style>
