<template>
  <v-form ref="formAddEdit" v-model="validate">
    <div class="d-flex justify-center mt-5">
      <v-avatar size="80" class="avatar-bg">
        <v-icon size="60" color="primary"> mdi-email-newsletter </v-icon>
      </v-avatar>
    </div>
    <div class="title-forgot-email my-3">
      กรอกอีเมลของคุณเพื่อส่งฟอร์มเปลี่ยนรหัสผ่าน !
    </div>
    <div class="mb-5 mt-3">
      <v-text-field
        v-model="email"
        label="Email Address"
        placeholder="กรอก Email Address"
        variant="outlined"
        color="primary"
        base-color="primary"
        :readonly="props.loading"
        :rules="[rule.noInPut, rule.noSpace, rule.englishOnly, rule.emailOnly]"
        class="ct-show-detail"
        hide-details
      ></v-text-field>
    </div>
    <v-btn color="primary" :loading="props.loading" block flat class="mt-2 text-none" :disabled="!validate" @click="SentMail()">Sent</v-btn>
  </v-form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
type propsModel = {
  loading?: boolean;
};
const props = withDefaults(defineProps<propsModel>(), {
  loading: false
});
let validate = ref<boolean>(false);
const email = ref('');

import { rule } from '@/utils/rule';

const emit = defineEmits<{
  (e: 'sentMail', value: string): void;
}>();

function SentMail() {
  emit('sentMail', email.value);
}
</script>
<style lang="scss">
.avatar-bg {
  background-color: rgb(var(--v-theme-primary), 0.13);
}
.title-forgot-email{
  font-size: 16px;
  text-align: center;
  color: rgb(var(--v-theme-primary));
}
</style>
