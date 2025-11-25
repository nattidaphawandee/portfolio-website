<template>
  <div class="logo">
    <svg width="85" height="189" viewBox="0 0 85 189" fill="none" xmlns="http://www.w3.org/2000/svg">
<g style="mix-blend-mode:multiply">
<path d="M49.3147 49.4846C39.4304 47.9678 32.5297 45.1384 28.6126 40.9964C24.8603 36.8796 23.5782 30.9499 24.7663 23.2072C25.9797 15.2998 28.9934 9.9449 33.8074 7.14265C38.7862 4.36567 46.2178 3.73555 56.1021 5.25229C65.9864 6.76903 72.8047 9.58578 76.5571 13.7025C80.4741 17.8446 81.826 23.8693 80.6126 31.7768C79.4245 39.5195 76.341 44.7793 71.3622 47.5563C66.5482 50.3585 59.199 51.0013 49.3147 49.4846ZM72.6042 64.1871L53.6449 187.741L3.72918 180.081L22.6884 56.5275L72.6042 64.1871Z" 
:fill="secondary"/>
</g>
</svg>

  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const primary = ref('rgb(var(--v-theme-primary))');
const secondary = ref('rgb(var(--v-theme-secondary))');

</script>
