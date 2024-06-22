<template>
    <q-card class="my-card">
      <div class="photo-grid">
      <q-img 
      v-for="photo in photos"
          :key="photo.id"
          :src="photo.thumbnailUrl"
          :alt="photo.title"
          class="photo cursor-pointer"
          @click="selectPhoto(photo.id)">
        <div class="absolute-bottom text-subtitle2 text-center">
          {{ photo.id }}
        </div>
      </q-img>
    </div>
    </q-card>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const photos = ref([]);
  const isLoading = ref(false);
  
  const fetchPhotos = async (albumId = 1) => {
    try {
      isLoading.value = true;
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
      ); // Directly fetch filtered data
      const data = await response.json();
      photos.value = data.map((photo) => ({
        id: photo.id,
        thumbnailUrl: photo.thumbnailUrl,
        url: photo.url,
        title: photo.title,
      }));
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      isLoading.value = false;
    }
  };
  
  const selectPhoto = (photoId) => {
    router.push({ path: `/albums/${photoId}` });
  };
  
  onMounted(() => {
    fetchPhotos();
  });

  const Lorem ='Lorem adalah'
  </script>
  
  <style>
  .q-page {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
  }
  
  .photo-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .photo {
    width: 150px;
    height: 150px;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .photo:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }
  
  .cursor-pointer {
    cursor: pointer;
  }
  
  .q-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  