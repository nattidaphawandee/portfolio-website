<script setup lang="ts">
import NavItem from '../NavItem/NavItem.vue';
// import Icon from '../../vertical-sidebar/IconSet.vue';
import type { menuModel } from '@/types/MenuType.ts';

const props = defineProps<{ item: menuModel; level: number }>();

</script>

<template  >
  <!---Dropdown  -->
  <a class="navItemLink rounded-md cursor-pointer" >
    <!---Icon  -->
    <i class="navIcon" :class="`mdi ${props.item.icon}`"></i>
    <!-- <i class="navIcon"><Icon :item="props.item.icon" :level="level" /></i> -->
    <!---Title  -->
    <span class="mr-auto">{{ props.item.text }}</span>
    <!---If Caption-->
    <!-- <small v-if="props.item.items" class="text-caption mt-n1 hide-menu">
      {{ props.item.text }}
    </small> -->
    <i class="ddIcon ml-2"><ChevronRightIcon size="15" /></i>
  </a>
  <!---Sub Item-->
  <ul :class="`ddMenu ddLevel-${level + 1}`">
    <li v-for="(subitem, i) in props.item.items" :key="i" class="navItem">
      <NavCollapse v-if="subitem.items.length > 0" :item="subitem" :level="props.level + 1" />
      <NavItem v-else :item="subitem" :level="props.level + 1" />
    </li>
  </ul>
  <!---End Item Sub Header -->
</template>
