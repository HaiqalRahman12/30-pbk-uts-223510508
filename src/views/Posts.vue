<template>
  <div class="posts">
    <center><h3>Postingan Pengguna</h3>
    <select v-model="selectedUser" @change="fetchPosts">
      <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
    </select>
    <div v-if="isLoading">
      <span class="loading-message">Loading posts...</span>
    </div>
    <div v-for="post in posts" :key="post.id">
      <h4>{{ post.title }}</h4>
      <p>{{ post.body }}</p>
    </div></center>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  posts: {
    type: Array,
    required: true
  },
  users: {
    type: Array,
    required: true
  }
});



const selectedUser = ref(null);
const isLoading = ref(false); 
const posts = ref([]);
const users = ref([]); 

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

fetchUser();
</script>

<style sc>
.posts{
  max-width: 600px;
  margin: 50px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
}
</style>
