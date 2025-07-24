<script setup lang="ts">
// import Icon from '../../vertical-sidebar/IconSet.vue';
import type { menuModel } from '@/types/MenuType.ts';

const props = defineProps<{ item: menuModel; level?: number }>();
</script>

<template>
  <!---Single Item-->
  <router-link :to="props.item.to" class="navItemLink rounded-md" :disabled="props.item.disabled">
    <!---If icon-->
    <!-- <i class="navIcon"> 
      <Icon :item="props.item.icon" :level="props.level" />
    </i> -->
    <i class="navIcon" :class="`mdi ${item.icon}`" ></i>
    <span class="mr-auto">{{ props.item.text }}</span>
    <!---If Caption-->
    <!-- <small v-if="item.text" class="text-caption mt-n1 hide-menu">
      {{ item.text }}
    </small> -->
    <!---If any chip or label-->
    <!-- <template v-if="props.item.chip">
      <v-chip
        :color="item.chipColor"
        class="sidebarchip hide-menu ml-auto"
        :size="item.chipIcon ? 'small' : 'small'"
        :variant="item.chipVariant"
        :prepend-icon="item.chipIcon"
      >
        {{ item.chip }}
      </v-chip>
    </template> -->
  </router-link>
</template>
