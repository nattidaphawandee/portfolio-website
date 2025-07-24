<template>
  <div>
    <div class="d-flex justify-center">
        <AppBarMenu></AppBarMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppBarMenu from './landingpage/AppBarMenu.vue';
import { Spin } from 'ant-design-vue';
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
