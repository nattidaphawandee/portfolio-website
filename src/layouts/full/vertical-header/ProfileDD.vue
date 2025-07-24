<script setup lang="ts">
import { LogoutIcon, UserIcon } from 'vue-tabler-icons';
import { useAuthStore } from '@/stores/authentication';
import SwitchTheme from '@/components/switchTheme.vue';
import { ref } from 'vue';
import { notification } from 'ant-design-vue';

// const swt2 = ref(false);
const authStore = useAuthStore();

import { useProfileStore } from '@/stores/profile';
const profile = useProfileStore();
import { useCustomizerStore } from '@/stores/customizer';
const customizer = useCustomizerStore();

function changeMode(value: boolean) {
  if (value) {
    customizer.actTheme = `Dark${customizer.actTheme}`;
    setTheme(customizer.actTheme);
  } else {
    let text: string = customizer.actTheme.slice(4);
    customizer.actTheme = text;
    setTheme(customizer.actTheme);
  }
}
let loading = ref<boolean>(false);
async function setTheme(theme: string) {
  if (theme !== profile.profile.theme) {
    loading.value = true;
    let res = await profile.UpdateThemeUser(theme);
    loading.value = false;
    if (!res.status) {
      notification.error({
        message: res.message,
        placement: 'bottomRight',
        duration: 2
      });
    }
  }
}
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- profile DD -->
  <!-- ---------------------------------------------- -->
  <div class="pa-4">
    <h4 class="my-3">
      Good Morning, <span class="font-weight-regular">{{ profile.Profile.firstName }} {{ profile.Profile.lastName }}</span>
    </h4>
    <v-divider />
    <PerfectScrollbar style="height: 100%; max-height: 300px">
      <div class="d-flex align-center py-3">
        <div class="text-primary">{{ customizer.modeDarkLight ? 'Dark' : 'Light' }}<span class="px-1">:</span> </div>
        <SwitchTheme v-model="customizer.modeDarkLight" @change="changeMode" />
        <v-btn @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)" color="primary" icon="mdi-cog" variant="text" size="small"></v-btn>
      </div>
      <v-divider />
      <v-list class="mt-0">
        <v-list-item :to="{ name: 'profilePage' }" color="secondary" rounded="md">
          <template #prepend>
            <UserIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2"> โปรไฟล์ </v-list-item-title>
        </v-list-item>

        <v-list-item color="secondary" rounded="md" @click="authStore.Logout()">
          <template #prepend>
            <LogoutIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2"> ออกจากระบบ </v-list-item-title>
        </v-list-item>
      </v-list>
    </PerfectScrollbar>
  </div>
</template>
