<template>
  <Suspense>
    <div>
      <alert-message></alert-message>
      <RouterView />
    </div>
  </Suspense>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import alertMessage from '@/components/alert/MaAlert.vue';
</script>
<style>
.v-overlay-container {
  /* font-family: 'Noto Sans Thai', sans-serif !important; */
  font-family: "IBM Plex Sans Thai", sans-serif;
}
</style>
