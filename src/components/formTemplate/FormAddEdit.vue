<template>
  <div>
    <v-dialog v-model="model" :max-width="props.maxWidth" persistent :fullscreen="props.fullscreen">
      <v-card class="layout-form-add-edit" :class="customizer.fontTheme" :rounded="props.fullscreen ? false : 'md'">
        <div>
          <div class="form-add-edit-title">{{ props.title }}</div>
          <hr class="form-add-edit-hr" />
        </div>

        <div class="form-add-edit-slot">
          <v-form ref="formAddEdit" v-model="valid">
            <slot name="form" :valid="valid"></slot>
          </v-form>
        </div>
        <div class="form-add-edit-btn">
          <!-- v-if="props.btnConfirm" -->
          <v-btn
            v-if="!disabledConfirm"
            @click="emit('submit')"
            :disabled="!valid"
            :loading="props.loading"
            height="30"
            color="primary"
            class="elevation-0 px-3 mr-1"
            >{{ props.textBtnConfirm }}</v-btn
          >
          <!-- v-if="props.btnCancel" -->
          <v-btn
            v-if="!disabledCancel"
            @click="emit('cancel')"
            height="30"
            color="error"
            class="elevation-0 px-3 ml-1"
            variant="outlined"
            :disabled="props.loading"
            >{{ props.textBtnCancel }}</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const model = defineModel<boolean>('model', { default: false });
// const disabledCancel = defineModel<boolean>('disabledCancel', { default: false });
// const disabledConfirm = defineModel<boolean>('disabledConfirm', { default: false });

let valid = ref<boolean>(true);
import { useCustomizerStore } from '@/stores/customizer';
const customizer = useCustomizerStore();
type propsModel = {
  maxWidth?: number;
  title?: string;
  loading?: boolean;
  disabledConfirm?: boolean;
  disabledCancel?: boolean;
  textBtnConfirm?: string;
  textBtnCancel?: string;
  fullscreen?: boolean;
};
const props = withDefaults(defineProps<propsModel>(), {
  maxWidth: 500,
  title: '',
  loading: false,
  textBtnConfirm: 'บันทึก',
  textBtnCancel: 'ยกเลิก',
  disabledConfirm: false,
  disabledCancel: false,
  fullscreen: false,
});

const emit = defineEmits<{
  (e: 'submit'): void;
  (e: 'cancel'): void;
}>();
</script>

<style lang="scss" scoped></style>
