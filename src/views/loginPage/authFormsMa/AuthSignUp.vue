<template>
  <v-form ref="formAddEdit" v-model="validate">
    <div class="my-5">
      <v-text-field
        v-model="itemsForm.firstName"
        label="*ชื่อ"
        placeholder="กรอกชื่อ"
        variant="outlined"
        color="primary"
        base-color="primary"
        :readonly="props.loading"
        :rules="[rule.noInPut, rule.noSpace]"
        class="ct-show-detail"
      ></v-text-field>
    </div>
    <div class="my-5">
      <v-text-field
        v-model="itemsForm.lastName"
        label="*นามสกุล"
        placeholder="กรอกนามสกุล"
        variant="outlined"
        color="primary"
        base-color="primary"
        :readonly="props.loading"
        :rules="[rule.noInPut, rule.noSpace]"
        class="ct-show-detail"
      ></v-text-field>
    </div>
    <div class="my-5">
      <v-text-field
        v-model="itemsForm.username"
        label="*ชื่อผู้ใช้งาน(อีเมล)"
        placeholder="กรอกชื่อผู้ใช้งาน(อีเมล)"
        variant="outlined"
        color="primary"
        base-color="primary"
        :readonly="props.loading"
        :rules="[rule.noInPut, rule.noSpace, rule.englishOnly, rule.emailOnly]"
        class="ct-show-detail"
      ></v-text-field>
    </div>

    <v-btn color="primary" :loading="props.loading" block flat class="mt-2 text-none" :disabled="!validate" @click="SignUp"
      >Sign up</v-btn
    >
  </v-form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
// TODO Rule สำหรับ Validate Value Username
import { rule } from '@/utils/rule';
import type { userCreateModel } from '@/types/UserType';
type propsModel = {
  loading?: boolean;
  errorText?: string;
};
const props = withDefaults(defineProps<propsModel>(), {
  loading: false,
  errorText: ''
});
let validate = ref<boolean>(false);

const itemsForm = ref<userCreateModel>({
  // nameTitle: '',
  firstName: '',
  lastName: '',
  username: '',
  permissions: ['2']
  // phone: '0000000000',
  // gender: '',
  // image: '',
  // dateOfBirth: '',
  // permissions: [],
  // street: '',
  // zipCode: '',
  // city: '',
  // countryCode: '',
  // country: '',
  // description: '',
  // timeZone: ''
});
const emit = defineEmits<{
  (e: 'signup', value: userCreateModel): void;
}>();

function SignUp() {
  emit('signup', {
    username: itemsForm.value.username,
    firstName: itemsForm.value.firstName,
    lastName: itemsForm.value.lastName,
    permissions: itemsForm.value.permissions
    
  });
}
</script>
<style lang="scss"></style>
