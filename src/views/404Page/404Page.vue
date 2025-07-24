<template>
  <div class="px-5">
    <div>
      <v-img :src="image" max-width="300px" class="mx-auto"></v-img>
    </div>
    <div class="title">Something is wrong</div>
    <div class="sub-title mt-3">The page you are looking was moved, removed, renamed, or might never exist!</div>
    <div class="text-center mt-5">
      <v-btn class="elevation-0" density="comfortable" color="primary" @click="router.push({ name: 'LoginPage' }).catch(() => {})"
        >Home</v-btn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import image from '@/assets/images/auth/404.svg';
import { router } from '@/router';
</script>
<style scoped lang="scss">
.title {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}
.sub-title {
  text-align: center;
}
</style>
