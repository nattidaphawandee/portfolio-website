<template>
  <v-navigation-drawer v-model="customizer.Customizer_drawer" app temporary elevation="10" location="right" width="350" class="z-index">
    <div class="pa-5" style="overflow-y: auto; height: 100%">
      <div class="d-flex justify-space-between align-center mb-5">
        <div class="text-primary font-weight-medium">Theme customizer</div>
        <v-btn size="small" variant="outlined" color="primary" @click="customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)"
          >close</v-btn
        >
      </div>
      <div class="d-flex align-center py-3 px-2">
        <v-icon color="primary" size="20" class="mr-1">mdi-brightness-6</v-icon>
        <div class="text-primary">Mode {{ customizer.modeDarkLight ? 'Dark' : 'Light' }}<span class="px-1">:</span></div>
        <SwitchTheme v-model="customizer.modeDarkLight" @change="changeMode"  />
      </div>
      <hr class="preset-hr" />
      <div class="d-flex align-center py-3 px-2">
        <v-icon color="primary" size="20" class="mr-1">mdi-palette-swatch-variant</v-icon>
        <div class="text-primary">{{ customizer.modeDarkLight ? 'Dark' : 'Light' }} Preset Color</div>
      </div>
      <div v-if="!customizer.modeDarkLight" class="list-preset">
        <v-item-group v-model="customizer.actTheme" mandatory class="box-preset-wrap" @update:modelValue="setTheme(customizer.actTheme)">
          <v-item v-for="theme in themeColors" v-slot="{ isSelected, toggle }" :key="theme.name" :value="theme.name">
            <div class="box-color-theme pa-2">
              <v-btn :class="theme.bg" class="elevation-0" size="40" @click="toggle" block min-height="40px" rounded="md" >
                <v-icon v-if="isSelected" color="white" size="40">mdi-check</v-icon>
              </v-btn>
            </div>
          </v-item>
        </v-item-group>
      </div>
      <div v-else class="list-preset">
        <v-item-group v-model="customizer.actTheme" mandatory class="box-preset-wrap" @update:modelValue="setTheme(customizer.actTheme)">
          <v-item v-for="theme in DarkthemeColors" v-slot="{ isSelected, toggle }" :key="theme.name" :value="theme.name">
            <div class="box-color-theme pa-2">
              <v-btn :class="theme.bg" class="elevation-0" size="40" @click="toggle" block min-height="40px" rounded="md" >
                <v-icon v-if="isSelected" color="white" size="40">mdi-check</v-icon>
              </v-btn>
            </div>
          </v-item>
        </v-item-group>
      </div>
    </div>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import SwitchTheme from '@/components/switchTheme.vue';
import { useProfileStore } from '@/stores/profile';
import { notification } from 'ant-design-vue';
const profile = useProfileStore();
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

// themes color options
const themeColors = ref([
  { name: 'MaTheme', bg: 'themeLightMaPreset' },
  {
    name: 'PurpleTheme',
    bg: 'themeBluePurplePreset'
  },
  {
    name: 'GreenTheme',
    bg: 'themeGreenDarkPreset'
  },
  {
    name: 'PinkTheme',
    bg: 'themePinkPreset'
  },
  {
    name: 'YellowTheme',
    bg: 'themeYellowPreset'
  },
  {
    name: 'SeaGreenTheme',
    bg: 'themeSeaGreenPreset'
  },
  {
    name: 'OliveGreenTheme',
    bg: 'themeOliveGreenPreset'
  },
  {
    name: 'SpeechBlueTheme',
    bg: 'themeSpeechBluePreset'
  }
]);

// Dark Theme Colors
const DarkthemeColors = ref([
  { name: 'DarkMaTheme', bg: 'themeDarkMaPreset' },
  { name: 'DarkPurpleTheme', bg: 'themeDarkPurplePreset' },
  { name: 'DarkGreenTheme', bg: 'themeDarkGreenPreset' },
  { name: 'DarkPinkTheme', bg: 'themeDarkPinkPreset' },
  { name: 'DarkYellowTheme', bg: 'themeDarkYellowPreset' },
  { name: 'DarkSeaGreenTheme', bg: 'themeDarkSeaGreenPreset' },
  { name: 'DarkOliveGreenTheme', bg: 'themeDarkOliveGreenPreset' },
  { name: 'DarkSpeechBlueTheme', bg: 'themeDarkSpeechBluePreset' }
]);

// let loading = ref<boolean>(false);
async function setTheme(theme: string) {
  if (theme !== profile.profile.theme) {
    // loading.value = true;
    let res = await profile.UpdateThemeUser(theme);
    // loading.value = false;
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
<style scoped lang="scss">
.z-index {
  z-index: 3000 !important;
}
.list-preset {
  max-height: 82%;
  overflow-y: auto;
  width: 100%;
  .box-preset-wrap {
    display: flex !important;
    flex-wrap: wrap !important;
    .box-color-theme {
      width: 50%;
    }
  }
}
.preset-hr {
  border: 1px solid rgb(var(--v-theme-lightprimary));
  margin: 15px 0 15px 0;
}
</style>
