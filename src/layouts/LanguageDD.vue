<script setup lang="ts">
import { ref } from 'vue';

const languages = [
  { title: 'TH', value: 'th' },
  { title: 'EN', value: 'en' }
];
</script>

<template>
  <div class="d-flex ga-2">
    <v-btn v-for="(lang, index) in languages" :key="index" :style="{
      background: $i18n.locale === lang.value ? 'black' : 'white',
      color: $i18n.locale === lang.value ? 'white' : 'black'
    }" @click="$i18n.locale = lang.value" class="language-box" size="small">
      {{ lang.title }}
    </v-btn>

  </div>
</template>

<style lang="css" scoped>
.language-box {
  width: 32px;
  height: 32px;
}
</style>
