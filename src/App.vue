<template>
  <Suspense>
    <div class="main-layout">
      <RouterView />
    </div>
  </Suspense>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>
<style>
.v-overlay-container {
  font-family: 'Noto Sans Thai', sans-serif !important;
  /* font-family: 'IBM Plex Sans Thai', sans-serif; */
}
/* .main-layout{
  background: red;
  padding-left: 96px;
  padding-right: 96px;
} */
</style>
