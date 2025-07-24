<script setup lang="ts">
import NavItem from '../NavItem/NavItem.vue';
import type { menuModel } from '@/types/MenuType.ts';

// import Icon from '../IconSet.vue';

// [x] PASS customs props for submenu
const props = defineProps<{ item: menuModel; level: number }>();
const emit = defineEmits<{
  (e: 'clickSub', value: string): void;
}>();
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!---Item Children -->
  <!-- ---------------------------------------------- -->
  <v-list-group no-action>
    <!-- ---------------------------------------------- -->
    <!---Dropdown  -->
    <!-- ---------------------------------------------- -->
    <template #activator="{ props }">
      <v-list-item v-bind="props" :value="item.text" rounded class="mb-1" color="secondary">
        <!---Icon  -->
        <template #prepend>
          <!-- <Icon :item="item.icon" :level="level" /> -->
          <!-- <i :class="`mdi ${item.icon}`" style="font-size: 20px"></i> -->
          <v-icon class="iconClass ml-1" size="20">{{ item.icon }}</v-icon>
        </template>

        <div class="d-flex align-center">
          <v-list-item-title class="pl-0"> {{ item.text }}</v-list-item-title>
        </div>
      </v-list-item>
    </template>
    <!-- ---------------------------------------------- -->
    <!---Sub Item-->
    <!-- ---------------------------------------------- -->
    <template v-for="(subitem, i) in props.item.items" :key="i">
      <NavCollapse v-if="subitem.items.length > 0" :item="subitem" :level="props.level + 1" />
      <NavItem v-else class="ml-3" :item="subitem" :level="props.level + 1" @click="emit('clickSub', props.item.name)" />
    </template>
  </v-list-group>

  <!-- ---------------------------------------------- -->
  <!---End Item Sub Header -->
  <!-- ---------------------------------------------- -->
</template>
