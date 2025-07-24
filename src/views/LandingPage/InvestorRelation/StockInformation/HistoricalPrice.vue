<template>
  <div>
    <div class="d-flex justify-center">
        ราคาย้อนหลัง (Historical Price)
    </div>
  </div>
</template>

<script setup lang="ts">
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
