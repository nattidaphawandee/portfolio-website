<template>
  <v-navigation-drawer
    v-model="customizer.Sidebar_drawer"
    left
    elevation="0"
    rail-width="75"
    mobile-breakpoint="lg"
    app
    class="leftSidebar"
    :rail="customizer.mini_sidebar"
    expand-on-hover
  >
    <!---Logo part -->

    <div class="pa-5 pl-3">
      <Logo />
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <PerfectScrollbar class="scrollnavbar">
      <v-list class="px-3 pb-4 pt-0">
        <!---Menu Loop -->
        <!-- v-for="item of menu.Menu" :key="item" -->
        <!-- <template v-for="(item, i) in menu.Menu" :key="i"> -->
        <!-- -Item Sub Header -->
        <!-- <NavGroup v-if="item.header" :key="item.title" :item="item" /> -->
        <!---Item Divider -->
        <!-- <v-divider v-else-if="item.divider" class="my-3" /> -->
        <!---If Has Child -->
        <!-- <NavCollapse v-else-if="item.children" class="leftPadding" :item="item" :level="0" /> -->
        <!---Single Item-->
        <!-- <NavItem v-else :item="item" class="leftPadding" /> -->
        <!---End Single Item -->
        <!-- </template> -->

        <template v-for="(item, i) in props.items" :key="i">
          <!-- {{ item.text }} -->
          <NavCollapse v-if="item?.items.length > 0" class="leftPadding" :item="item" :level="0" @clickSub="checkClickSub" />
          <NavItem v-else :item="item" class="leftPadding" :level="0" @click="checkClearSubmenu()" />
        </template>
      </v-list>
      <div class="text-center">
        <v-chip color="primary" size="small" class="px-3"> {{ version }} </v-chip>
      </div>
    </PerfectScrollbar>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
// import sidebarItems from './sidebarItem';
// import NavGroup from './NavGroup/NavGroup.vue';
import NavItem from './NavItem/NavItem.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import Logo from '../logo/LogoMain.vue';
const customizer = useCustomizerStore();
import type { menuModel, clearMenuItemsModel } from '@/types/MenuType.ts';
import { useMenuStore } from '@/stores/menu';
const menu = useMenuStore();

const version = ref<string>(import.meta.env.VITE_APP_VERSION || 'v0.0.0');
// [x] PASS Customs Props
const props = defineProps<{
  items: menuModel[];
}>();
function checkClickSub(val: string) {
  if (val !== 'projectPage') {
    checkClearSubmenu();
  }
}
function checkClearSubmenu() {
  let menuProjectId: string = '';
  for (let index = 0; index < menu.MenusNavigation.length; index++) {
    if (menu.MenusNavigation[index].name === 'projectPage') {
      menuProjectId = menu.MenusNavigation[index].menuId;
    }
  }
  const payload: clearMenuItemsModel = {
    parentID: menuProjectId,
    menusAll: menu.MenusNavigation
  };
  menu.clearSubMenu(payload);
}
</script>
