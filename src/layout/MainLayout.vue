<template>
  <q-layout view="hHh LpR fff">
    <q-header elevated class="bg-black text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title align="center">
          Muhammad Haiqal Rahman
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/todos" label="Todo list" />
        <q-route-tab to="/posts" label="Post" />
        <q-route-tab to="/albums" label="Album" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-black text-white">
      <q-toolbar>
        <q-toolbar-title style="display: flex;justify-content: center;">
          Copyright © M. Haiqal Rahman®. All rights reserved.
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  }
};
</script>

<style>
body {
  background-color: #1a1a1a;
}
</style>
