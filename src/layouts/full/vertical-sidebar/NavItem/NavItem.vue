<script setup lang="ts">
import type { menuModel } from '@/types/MenuType.ts';
const emit = defineEmits<{
  (e: 'click' ): void;
}>();
const props = defineProps<{ item: menuModel; level: number }>();
function toMenu(item: menuModel) {
  if (item.type !== undefined) {
    if (item.type === 'datasource') {
      return {
        name: 'menuWidget',
        params: {
          menuId: item.menuId
        }
      };
    } else if (item.type === 'iframe') {
      return {
        name: 'menuIframe',
        params: {
          menuId: item.menuId
        }
      };
    } else if (item.type === 'alert') {
      return {
        name: 'menuAlert',
        params: {
          menuId: item.menuId
        }
      };
    } else {
      return {
        name: item.name,
        params: {
          menuId: item.menuId
        }
      };
    }
  } else {
    return {
      name: item.name
    };
  }
}
</script>
<template>
  <v-list-item rounded class="mb-1" color="secondary" :to="toMenu(props.item)" @click="emit('click')">
    <template #prepend>
      <v-icon v-if="props.level === 0" :icon="props.item.icon" size="20" class="ml-1"></v-icon>
      <!-- <v-icon v-else icon="mdi-circle-outline" size="8" class="mr-n5"></v-icon> -->
      <div v-else><v-icon icon="mdi-circle" size="5" class="mr-1"></v-icon></div>
    </template>
    <div>
      <!-- <i :class="`mdi ${props.item.icon}`" style="font-size: 20px;"></i> -->
      <!-- <v-icon :icon="props.item.icon"></v-icon> -->
      <v-list-item-title class="pl-0">{{ props.item.text }}</v-list-item-title>
    </div>
  </v-list-item>
</template>
