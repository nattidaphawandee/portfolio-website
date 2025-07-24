<template>
  <div class="btn-upload">
    <div>
      <input ref="fileUpload" type="file" name="pic" :accept="props.accept" hidden @change="chooseFiles" />
      <v-btn
        @click="inputFile()"
        :loading="props.loading"
        :color="props.color"
        class="elevation-0 mx-1"
        :height="props.height"
        :min-width="props.width"
        :variant="props.variant"
        :rounded="props.rounded"
        :class="props.class"
      >
        <v-icon>{{ props.icon }}</v-icon
        >{{ props.text }}
      </v-btn>

      <v-btn
        v-if="chip && props.clearRight"
        @click="clearFile()"
        class="px-1"
        :color="props.color"
        icon="mdi-close"
        variant="tonal"
        size="x-small"
        :min-width="props.width"
      >
      </v-btn>
    </div>
    <div v-if="!hideName" class="text-center">
      <v-chip v-if="chip" class="my-1" :color="props.color" closable size="small" @click:close="clearFile()">
        <div class="chip-file-name">{{ fileName }}</div>
      </v-chip>
    </div>
    <div v-if="!validateType" class="validate-text">{{ validateTypeText }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const validate = defineModel<boolean>('validate', { default: false });
const fileUpload = ref<any>('fileUpload');
const fileName = ref<string>('');
const chip = ref<boolean>(false);
type propsModel = {
  text?: string;
  color?: string;
  icon?: string;
  loading?: boolean;
  hideName?: boolean;
  variant?: 'text' | 'outlined' | 'flat' | 'elevated' | 'tonal' | 'plain' | undefined;
  rounded?: string | number | boolean | undefined;
  height?: string | number | undefined;
  width?: string | number | undefined;
  class?: any;
  clearRight?: boolean;
  type: string[]; //type[]
  accept: string;
};
const props = withDefaults(defineProps<propsModel>(), {
  text: 'อัปโหลดไฟล์',
  color: 'primary',
  icon: 'mdi-image-plus',
  loading: false,
  hideName: false,
  variant: 'outlined',
  height: 35,
  clearRight: false,
  accept: ''
});
const emit = defineEmits<{
  (e: 'chooseFiles', value: any): void;
  (e: 'clear'): void;
}>();
function inputFile() {
  fileUpload.value.click();
}

// validate type props

let validateTypeText = ref<string>('');
let validateType = ref<boolean>(false);
type fileModel = {
  lastModified: string;
  name: string;
  size: string | number;
  type: string;
  webkitRelativePath: string;
};
function validateTypeInput(file: fileModel[]) {
  if (file.length !== 0) {
    let nameSplit = file[0].name.split('.');
    let name = nameSplit[nameSplit.length - 1];
    let nameLowerCase = name.toLowerCase();
    let status: boolean = false;
    for (let index = 0; index < props.type.length; index++) {
      if (props.type[index] === nameLowerCase) {
        status = true;
      }
    }
    if (status) {
      validateType.value = status;
      validate.value = status;
      validateTypeText.value = '';
      return status;
    } else {
      validateType.value = status;
      validate.value = status;
      validateTypeText.value = `กรุณาเลือกไฟล์ชนิด ${props.type.join(',')}`;
      return status;
    }
  } else {
    return false;
  }
}
async function chooseFiles(files: any) {
  const f = files.target.files;
  if (f.length > 0) {
    if (await validateTypeInput(f)) {
      fileName.value = f[0].name;
      chip.value = true;
      emit('chooseFiles', f);
    } else {
      chip.value = false;
      emit('clear');
    }
  }
}
function clearFile() {
  chip.value = false;
  emit('clear');
  validateTypeText.value = '';
  validateType.value = false;
  validate.value = false;
}
</script>

<style lang="scss" scoped>
.btn-upload {
  width: fit-content;
}
.chip-file-name {
  max-width: 83px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.validate-text {
  color: red;
  font-size: 12px;
  margin-top: 10px;
}
</style>
