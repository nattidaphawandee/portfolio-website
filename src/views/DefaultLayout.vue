<template>
  <v-app>
    <!-- เมนูด้านบน -->
    <AppBarMenu />

    <!-- เนื้อหาหลักของแต่ละหน้า -->
    <v-main>
      <!-- <v-container fluid class="page-wrapper"> -->
        <router-view />
      <!-- </v-container> -->
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppBarMenu from '@/components/landingpage/AppBarMenu.vue';
</script>

<style scoped>
.page-wrapper {
  padding-top: 20px;
  /* ปรับแต่งเพิ่มตามต้องการ */
}
</style>
