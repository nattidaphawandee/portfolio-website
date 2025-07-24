<template>
  <div>
    <div class="d-flex justify-center">
      <MenuPage></MenuPage>
      <homelandingpage></homelandingpage>
    </div>
    <div class="text-loading">homePage s...</div>
  </div>
</template>

<script setup lang="ts">
import { Spin } from 'ant-design-vue';
import MenuPage from '@/components/MenuPage.vue';
import homelandingpage from '../LandingPage/HomeLandingPage.vue';
</script>
<style scoped lang="scss">
.icon-loading {
  font-size: 70px;
  color: rgba(var(--v-theme-primary));
}
.text-loading {
  text-align: center;
  color: rgba(var(--v-theme-primary));
}
</style>
