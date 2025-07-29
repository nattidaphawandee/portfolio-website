<script setup lang="ts">
import { ref } from 'vue';

const languages = [
  { title: 'TH', value: 'th' },
  { title: 'EN', value: 'en' }
];
</script>

<template>
  <div class="d-flex ga-2">
    <v-btn
      v-for="(lang, index) in languages"
      :key="index"
      :color="$i18n.locale === lang.value ? 'primary' : 'grey'"
      @click="$i18n.locale = lang.value"
      variant="outlined"
      size="small"
    >
      {{ lang.title }}
    </v-btn>
  </div>
</template>
