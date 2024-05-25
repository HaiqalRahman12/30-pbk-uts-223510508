<template>
  <header>
    <nav>
      <ul>
        <li @click="$emit('menu-click', 'todos')">{{ todoLabel }}</li>
        <li @click="$emit('menu-click', 'posts')">{{ postLabel }}</li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  todoLabel: {
    type: String,
    default: 'Todos'
  },
  postLabel: {
    type: String,
    default: 'Posts'
  }
});

const emit = defineEmits(['menu-click']);

const handleMenu = (menu) => {
  emit('menu-click', menu);
};
</script>

<style >
nav ul {
  display: 0;
  list-style-type: none;
}

nav ul li {
  margin-right: 20px;
  cursor: pointer;
  margin-bottom: 8px;
    background-color: #fff;
    border-radius: 4px;
    padding: 12px;
    display: flex;
    align-items: center;
}
</style>
