<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { useCustomizerStore } from '@/stores/customizer';
// import HorizontalItems from './horizontalItems';
import NavItem from './NavItem/NavItem.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import VerticalSidebar from '../vertical-sidebar/VerticalSidebar.vue';

import type { menuModel } from '@/types/MenuType.ts';

// [x] PASS Customs Props
const props = defineProps<{
  items: menuModel[];
}>();

// [x] PASS Receiver data from props
const menus = props.items;


const customizer = useCustomizerStore();
// const sidebarMenu = shallowRef(HorizontalItems);
const { mdAndUp } = useDisplay();
</script>

<template>
  
  <template v-if="mdAndUp">
    <div class="horizontalMenu">
      <ul class="gap-1 horizontal-navbar px-0" :class="customizer.boxed ? 'maxWidth' : ''">
        <!---Menu Loop -->
        <li v-for="(menu, i) in menus" :key="i" class="navItem">
          <!---If Has Child -->
          <NavCollapse v-if="menu.items.length > 0" :item="menu" :level="0" />
          <!---Single Item-->
          <NavItem v-else :item="menu" :level="0" />
          <!---End Single Item-->
        </li>
      </ul>
    </div>
  </template>
  <div v-else class="mobile-menu">
    <VerticalSidebar :items="menus" />
  </div>
</template>
<style lang="scss"></style>
