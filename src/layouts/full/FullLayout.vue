<script setup lang="ts">
import { RouterView } from 'vue-router';
import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';
import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
import HorizontalHeader from './horizontal-header/HorizontalHeader.vue';
import HorizontalSidebar from './horizontal-sidebar/HorizontalSidebar.vue';
import alertMessage from '@/components/alert/MaAlert.vue';
// import Customizer from './customizer/CustomizerPanel.vue';
import Customizer from '@/components/customizerPanel.vue';
// import FooterPanel from './footer/FooterPanel.vue';
import { useCustomizerStore } from '@/stores/customizer';
// import { useMenuStore } from '@/stores/menu';
// import { useWebsocket } from '@/stores/websocket';
// import { useEventBus } from '@/stores/eventBus';
import { useAuthStore } from '@/stores/authentication';
import { notification } from 'ant-design-vue';


import { useElementSize } from '@vueuse/core';
import { ref } from 'vue';
import { router } from '@/router';
import { useRoute } from 'vue-router';
const route = useRoute();
// const ws = useWebsocket();
const authStore = useAuthStore();

function Logout() {
  authStore.Logout();
  notification.error({
    message: 'Your session has expired because another login was detected.',
    placement: 'bottomRight',
    duration: 5
  });
  // eventBus.clearAllEvents();
  // ws.disconnect();
}
// const eventBus = useEventBus();

// eventBus.on('logout', Logout);

// ws.disconnect();
// ws.connect(import.meta.env.VITE_APP_WS, localStorage.getItem('AccessToken') ?? '');

const toolBar = ref(null);
const toolBarSize = useElementSize(toolBar);
const hegihtToolBar = toolBarSize.height;

// TODO get profile user signin
import { useProfileStore } from '@/stores/profile';
const profile = useProfileStore();
await profile.GetProfile();

const customizer = useCustomizerStore();
const menu = useMenuStore();

function returnPermissionHighest(permissions: string[]) {
  if (permissions.includes('0')) {
    return '0';
  } else if (permissions.includes('1')) {
    return '1';
  } else if (permissions.includes('2')) {
    for (let index = 0; index < profile.Profile.methods.length; index++) {
      if (profile.Profile.methods[index].provider === 'oneid') {
        return '5';//for costsheet
      }
    }
    return '2';
  } else {
    return '2';
  }
}

// await menu.GetMenusNavigation(parseInt(returnPermissionHighest(profile.Profile.permissions)));
await menu.GetMenusNavigation(0);

if (route.name === 'FullLayout') {
  router.push(menu.menusNavigation[0].to);
}
</script>

<template>
  <v-locale-provider>
    <v-app
      :theme="customizer.actTheme"
      :class="[
        customizer.actTheme,
        customizer.fontTheme,
        customizer.mini_sidebar ? 'mini-sidebar' : '',
        customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
        customizer.inputBg ? 'inputWithbg' : ''
      ]"
    >
      <alert-message></alert-message>
      <Customizer />
      <VerticalSidebarVue v-if="!customizer.setHorizontalLayout" :items="menu.MenusNavigation" />
      <VerticalHeaderVue ref="toolBar" v-if="!customizer.setHorizontalLayout" />
      <HorizontalHeader v-if="customizer.setHorizontalLayout" />
      <HorizontalSidebar v-if="customizer.setHorizontalLayout" :items="menu.MenusNavigation" />

      <v-main>
        <v-container
          fluid
          class="page-wrapper"
          :style="`width: 100%; height: calc(100% - ${hegihtToolBar + 20}px); min-height: calc(100vh - ${hegihtToolBar + 20}px);`"
        >
          <div :class="customizer.boxed ? 'maxWidth' : ''" style="width: 100%; height: 100%">
            <RouterView />
            <!-- <v-btn
              class="customizer-btn"
              size="large"
              icon
              variant="flat"
              color="secondary"
              @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)"
            >
              <SettingsIcon class="icon" />
            </v-btn> -->
          </div>
        </v-container>
        <!-- <v-container fluid class="pt-0">
          <div :class="customizer.boxed ? 'maxWidth' : ''">
            <FooterPanel />
          </div>
        </v-container> -->
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
