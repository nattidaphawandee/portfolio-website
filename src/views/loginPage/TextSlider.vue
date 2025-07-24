<script setup lang="ts">
import { useCustomizerStore } from '@/stores/customizer';
const customizer = useCustomizerStore();
import { UsetextAllStore } from '@/stores/textAllPage';

const textAll = UsetextAllStore();
const slides = textAll.slidesLoginContent;
</script>
<template>
  <v-carousel
    color="darkText"
    height="190"
    hide-delimiter-background
    class="customDelimiter"
    :show-arrows="false"
    cycle
    :class="customizer.fontTheme"
  >
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <div class="text-center">
        <h1 class="titleText">
          {{ slide.title }}
        </h1>
        <p class="subtitleText">
          {{ slide.description }}
        </p>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<style lang="scss">
.customDelimiter {
  .v-btn {
    font-size: 0px;
    background-color: rgb(var(--v-theme-primary));
    color: rgb(var(--v-theme-surface));
    width: 7px;
    height: 7px;
    border-radius: 5px;
    margin: 3px;

    &:hover {
      background-color: rgb(var(--v-theme-primary)) !important;
      color: rgb(var(--v-theme-primary)) !important;
    }
  }

  .v-btn--active {
    background-color: rgb(var(--v-theme-primary));
    color: rgb(var(--v-theme-primary));
    width: 30px;
    height: 7px;
    border-radius: 5px;
    margin: 3px;
    font-size: 0px;
  }
}

.titleText {
  white-space: pre-line;
  line-height: 1.2;
  font-size: 24px;
  font-weight: 700;
}

.subtitleText {
  white-space: pre-line;
  margin-top: 10px;
  color: rgb(var(--v-theme-lightText));
  line-height: 1.5;
  font-weight: 400;
}
</style>
