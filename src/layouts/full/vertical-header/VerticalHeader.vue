<script setup lang="ts">
import { ref, watch } from 'vue';
import { router } from '@/router';
import { useCustomizerStore } from '../../../stores/customizer';
// Icon Imports
// import { AccessPointIcon, BellIcon, SettingsIcon, LanguageIcon, SearchIcon, Menu2Icon } from 'vue-tabler-icons';
import { BellIcon, SettingsIcon, Menu2Icon } from 'vue-tabler-icons';

// dropdown imports
// import LanguageDD from './LanguageDD.vue';
// import NotificationDD from './NotificationDD.vue';
import ProfileDD from './ProfileDD.vue';
// import MegaMenuDD from './MegaMenuDD.vue';
// import Searchbar from './SearchBarPanel.vue';
import { type projectMenuModel } from '@/types/ProjectType';
import type { clearMenuItemsModel } from '@/types/MenuType.ts';
import { useProjectStore } from '@/stores/project';
import { useMenuStore } from '@/stores/menu';
import { useRoute } from 'vue-router';
const project = useProjectStore();
const menu = useMenuStore();
const route = useRoute();

import { useFileStore } from '@/stores/file';
const file = useFileStore();
import { useProfileStore } from '@/stores/profile';
const profile = useProfileStore();

const customizer = useCustomizerStore();
// const showSearch = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);
// function searchbox() {
//   showSearch.value = !showSearch.value;
// }
watch(priority, (newPriority) => {
  // yes, console.log() is a side effect
  priority.value = newPriority;
});

type filterMenuText = {
  items: projectMenuModel[];
  menuId: string | string[];
};
function returnMenuText(items: filterMenuText) {
  const found = items.items.find((item) => item.menuId === items.menuId);
  if (found) {
    return `/ ${found.text}`;
  } else {
    return '';
  }
}
function toProjectsPage() {
  router.push({
    name: 'projectPage'
  });
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
function returnHeight(width: number) {
  if (route.params.menuId && route.params.menuId !== '' && width <= 573) {
    return 120;
  } else {
    return 80;
  }
}
</script>

<template>
  <v-app-bar elevation="0" :priority="priority" :height="returnHeight($vuetify.display.width)" class="wrap-items">
    <div class="btn-menu-nav">
      <v-btn
        class="hidden-md-and-down text-secondary"
        color="lightsecondary"
        icon
        rounded="sm"
        variant="flat"
        size="small"
        @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
      >
        <Menu2Icon size="20" stroke-width="1.5" />
      </v-btn>
      <v-btn
        class="hidden-lg-and-up text-secondary ms-3"
        color="lightsecondary"
        icon
        rounded="sm"
        variant="flat"
        size="small"
        @click.stop="customizer.SET_SIDEBAR_DRAWER"
      >
        <Menu2Icon size="20" stroke-width="1.5" />
      </v-btn>
    </div>

    <div v-if="route.params.menuId && route.params.menuId !== ' '" class="breadcrumbs">
      <div>
        <v-btn color="primary" variant="text" class="px-0" @click="toProjectsPage()">โปรเจค</v-btn>
      </div>
      <div class="sub-level">
        <span class="pr-2">/</span>{{ project.ProjectInfo.name
        }}<span class="px-2">{{ returnMenuText({ items: project.ProjectMenus, menuId: route.params.menuId }) }}</span>
      </div>
    </div>

    <v-spacer />
    <!-- ---------------------------------------------- -->
    <!---right part -->
    <!-- ---------------------------------------------- -->

    <!-- ---------------------------------------------- -->
    <!-- Messages -->
    <!-- ---------------------------------------------- -->
    <!-- <v-menu :close-on-content-click="false">
      <template #activator="{ props }">
        <v-btn
          icon
          class="text-secondary hidden-sm-and-down"
          color="lightprimary"
          rounded="sm"
          size="small"
          variant="flat"
          v-bind="props"
        >
          <AccessPointIcon stroke-width="1.5" size="22" />
        </v-btn>
      </template>
      <v-sheet width="900" height="395" elevation="12" rounded="md" class="pa-4">
        <MegaMenuDD />
      </v-sheet>
    </v-menu> -->
    <!-- ---------------------------------------------- -->
    <!-- translate -->
    <!-- ---------------------------------------------- -->
    <!-- <v-menu :close-on-content-click="false" location="bottom">
      <template #activator="{ props }">
        <v-btn icon class="text-primary ml-3" color="lightprimary" rounded="sm" size="small" variant="flat" v-bind="props">
          <LanguageIcon stroke-width="1.5" size="22" />
        </v-btn>
      </template>
      <v-sheet rounded="md" width="200" elevation="12">
        <LanguageDD />
      </v-sheet>
    </v-menu> -->

    <!-- ---------------------------------------------- -->
    <!-- Notification -->
    <!-- ---------------------------------------------- -->
    <div class="btn-toolbar">
      <v-menu :close-on-content-click="false">
        <template #activator="{ props }">
          <!-- <v-btn icon class="text-secondary mx-3" color="lightsecondary" rounded="sm" size="small" variant="flat" v-bind="props">
            <i :class="`mdi mdi-message-badge-outline`" style="font-size: 20px"></i>
          </v-btn> -->
          <v-btn icon class="text-secondary mx-3" color="lightsecondary" rounded="sm" size="small" variant="flat" v-bind="props">
            <BellIcon stroke-width="1.5" size="22" />
          </v-btn>
        </template>
        <!-- <v-sheet rounded="md" width="330" elevation="12">
        <NotificationDD />
      </v-sheet> -->
      </v-menu>

      <!-- ---------------------------------------------- -->
      <!-- User Profile -->
      <!-- ---------------------------------------------- -->
      <v-menu :close-on-content-click="false">
        <template #activator="{ props }">
          <v-btn class="profileBtn text-secondary" color="lightsecondary" variant="flat" rounded="pill" v-bind="props">
            <v-avatar size="30" class="mr-2" color="primary">
              <span v-if="profile.Profile.image === ''" class="text-uppercase">
                {{ profile.Profile.firstName.charAt(0) }}{{ profile.Profile.firstName.charAt(profile.Profile.firstName.length - 1) }}
              </span>
              <v-img v-else :src="file.ReturnUrlFile(profile.Profile.image)"></v-img>
            </v-avatar>
            <SettingsIcon stroke-width="1.5" />
          </v-btn>
        </template>
        <v-sheet rounded="md" width="330" elevation="12">
          <ProfileDD />
        </v-sheet>
      </v-menu>
    </div>
  </v-app-bar>
</template>
