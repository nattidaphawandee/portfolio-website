<template>
  <v-card :class="`${props.heightFitContent ? 'card-content-fit-content' : 'card-content'} elevation-0`"><slot></slot></v-card>
</template>

<script setup lang="ts">
type propsModel = {
  heightFitContent?: boolean;
};
const props = withDefaults(defineProps<propsModel>(), {
  heightFitContent: false
});
</script>

<style scoped>
.card-content {
  height: 100%;
  padding-top: 25px;
  padding-bottom: 25px;
}
.card-content-fit-content {
  padding-top: 25px;
  padding-bottom: 25px;
}
</style>
