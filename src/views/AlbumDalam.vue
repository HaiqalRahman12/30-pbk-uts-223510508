<template>
    <q-page class="q-pa-md" style="background-color: #1a1a1a;">
      <q-spinner v-if="isLoading" size="lg" color="primary" />
      <q-card v-else-if="photo" class="q-pa-md">
        <center>
        <q-img :src="photo.url" class="q-mb-md" :alt="photo.title" />
        <q-badge color="black" text-color="white">{{ photo.id }}</q-badge>
        <p>{{ photo.title }}</p>
        <q-btn @click="goBack" color="black" class="q-mt-md"
          >Kembali</q-btn></center>
      </q-card>
    </q-page>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  
  const route = useRoute();
  const router = useRouter();
  const photo = ref(null);
  const isLoading = ref(false);
  
  const fetchPhoto = async (id) => {
    try {
      isLoading.value = true;
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos/${id}`
      );
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      photo.value = await response.json();
    } catch (error) {
      console.error("Error fetching photo:", error);
    } finally {
      isLoading.value = false;
    }
  };
  
  const goBack = () => {
    router.push("/albums");
  };
  
  onMounted(() => {
    fetchPhoto(route.params.photoId);
  });
  </script>