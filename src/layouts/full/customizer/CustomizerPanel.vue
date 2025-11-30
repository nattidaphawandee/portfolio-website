<script setup lang="ts">
import { ref } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import { ChecksIcon } from 'vue-tabler-icons';

const customizer = useCustomizerStore();

// themes color options
const themeColors = ref([
  { name: 'MaTheme', bg: 'themeLightMa' },
  {
    name: 'PurpleTheme',
    bg: 'themeBluePurple'
  },
  {
    name: 'GreenTheme',
    bg: 'themeGreenDark'
  },
  {
    name: 'PinkTheme',
    bg: 'themePink'
  },
  {
    name: 'YellowTheme',
    bg: 'themeYellow'
  },
  {
    name: 'SeaGreenTheme',
    bg: 'themeSeaGreen'
  },
  {
    name: 'OliveGreenTheme',
    bg: 'themeOliveGreen'
  },
  {
    name: 'SpeechBlueTheme',
    bg: 'themeSpeechBlue'
  }
]);

// Dark Theme Colors
const DarkthemeColors = ref([
  { name: 'DarkMaTheme', bg: 'themeDarkMa' },
  { name: 'DarkPurpleTheme', bg: 'themeDarkPurple' },
  { name: 'DarkGreenTheme', bg: 'themeDarkGreen' },
  { name: 'DarkPinkTheme', bg: 'themeDarkPink' },
  { name: 'DarkYellowTheme', bg: 'themeDarkYellow' },
  { name: 'DarkSeaGreenTheme', bg: 'themeDarkSeaGreen' },
  { name: 'DarkOliveGreenTheme', bg: 'themeDarkOliveGreen' },
  { name: 'DarkSpeechBlueTheme', bg: 'themeDarkSpeechBlue' }
]);

// themes font Family options
const fontFamily = ref(['Noto', 'Roboto', 'Poppins', 'Inter']);
// themes font Family options

function clearoptions() {
  customizer.actTheme = 'MaTheme';
  customizer.setHorizontalLayout = false;
  customizer.inputBg = false;
  customizer.boxed = false;
  customizer.fontTheme = 'Noto';
}
</script>

<!------------------------------------->
<!-- Customizer -->
<!------------------------------------->
<template>
  <v-dialog
    v-model="customizer.Customizer_drawer"
    max-width="420"
    persistent
  >
    <v-card class="py-5 px-4">
      <div class="d-flex align-center justify-space-between mb-2">
        <v-card-title class="text-subtitle-1 font-weight-medium mb-0 px-0">Preset Color</v-card-title>
        <v-btn
          icon="mdi-close"
          variant="text"
          color="secondary"
          @click="customizer.SET_CUSTOMIZER_DRAWER(false)"
        />
      </div>
      <v-card-text class="pa-0">
        <v-item-group v-model="customizer.actTheme" mandatory>
          <v-item v-for="theme in themeColors" v-slot="{ isSelected, toggle }" :key="theme.name" :value="theme.name">
            <v-avatar rounded="circle" :class="theme.bg" class="mr-2 cursor-pointer ma-2" size="40" @click="toggle">
              <ChecksIcon v-if="isSelected" color="white" />
            </v-avatar>
          </v-item>
        </v-item-group>
      </v-card-text>
      <v-card-actions class="justify-end mt-2 px-0">
        <v-btn
          variant="text"
          color="secondary"
          @click="customizer.SET_CUSTOMIZER_DRAWER(false)"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style lang="scss">
.custom-radio {
  .v-selection-control-group {
    flex-direction: row;

    .v-selection-control {
      width: 48px;
      height: 48px;
      align-items: center;
      justify-content: center;
      flex: unset;
      border: 2px solid rgba(var(--v-theme-borderLight), 0.36);
      border-radius: 4px;

      &.v-selection-control--dirty {
        border: 2px solid rgba(var(--v-theme-primary), 1);
      }

      .v-selection-control__wrapper {
        .v-selection-control__input {
          opacity: 0;
        }

        img {
          position: absolute;
        }
      }

      .v-label {
        width: unset;
        height: unset;
      }
    }
  }
}

.input-bg {
  background-color: rgb(var(--v-theme-gray100)) !important;
}

.input-radio {
  .v-selection-control-group {
    .v-selection-control {
      height: 30px;
    }
  }
}

.custom-font {
  .v-selection-control-group {
    .v-selection-control__wrapper {
      display: none;
    }

    .v-selection-control {
      border: 2px solid rgba(var(--v-theme-borderLight), 0.36);
      outline: 6px solid rgba(var(--v-theme-borderLight), 0.1);
      border-radius: 4px;
      margin: 6px;
      padding: 12px 16px;

      &.v-selection-control--dirty {
        border: 1px solid rgba(var(--v-theme-primary), 1);
        outline: 6px solid rgba(var(--v-theme-primary), 0.1);
      }
    }
  }
}
</style>
