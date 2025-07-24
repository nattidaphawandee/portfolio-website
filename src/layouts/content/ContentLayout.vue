// ===============================|| Content Layout ||=============================== //
<template>
  <div class="blank-full-layout">
    <div class="full-space">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
// import { RouterView } from 'vue-router';
</script>
<style lang="scss" scoped>
.blank-full-layout {
  width: 100%;
  height: 100%;
}

.full-space {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: block;
  overflow-y: auto;
}
</style>
