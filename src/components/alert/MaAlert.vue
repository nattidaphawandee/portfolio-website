<template>
  <v-dialog v-model="alert.model" max-width="450" :persistent="alert.optionsAlert.persistent" @animateClick="close()">
    <v-card>
      <div class="card-alert" :class="customizer.fontTheme">
        <div class="alert-icon">
          <v-icon :color="alert.optionsAlert.colorIcon" :size="alert.optionsAlert.sizeIcon">
            {{ alert.optionsAlert.icon }}
          </v-icon>
        </div>
        <div class="alert-title">{{ alert.optionsAlert.title }}</div>
        <div class="alert-description">{{ alert.optionsAlert.description }}</div>
        <div class="alert-btn">
          <v-btn
            v-if="alert.optionsAlert.btnConfirm"
            @click="submit()"
            height="40"
            :color="alert.optionsAlert.btnConfirmColor"
            class="elevation-0 mx-1"
            >{{ alert.optionsAlert.btnConfirmText }}</v-btn
          >
          <v-btn
            v-if="alert.optionsAlert.btnCancel"
            @click="close()"
            height="40"
            :color="alert.optionsAlert.btnCancelColor"
            class="elevation-0 mx-1"
            variant="outlined"
            >{{ alert.optionsAlert.btnCancelText }}</v-btn
          >
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useCustomizerStore } from '@/stores/customizer';
const customizer = useCustomizerStore();
import { useAlertStore } from '@/stores/alert';
const alert = useAlertStore();

function submit() {
  alert.submitAlert();
}
function close() {
  alert.closeAlert();
}
</script>

<style scoped></style>
