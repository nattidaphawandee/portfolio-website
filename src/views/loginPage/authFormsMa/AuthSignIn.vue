<template>
  <v-form ref="formAddEdit" v-model="validate">
    <div class="my-5">
      <v-text-field
        v-model="username"
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
    <div class="my-5">
      <v-text-field
        v-model="password"
        label="Password"
        placeholder="กรอก Password"
        variant="outlined"
        color="primary"
        base-color="primary"
        :readonly="props.loading"
        :rules="[rule.noInPut, rule.noSpace]"
        class="ct-show-detail"
        :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        @click:append-inner="show1 = !show1"
        hide-details
      ></v-text-field>
    </div>

    <div class="d-sm-flex align-center mt-2 mb-7 mb-sm-0">
      <v-checkbox
        v-model="checkbox"
        :rules="[(v) => !!v || 'You must agree to continue!']"
        label="I accept the terms and conditions"
        required
        color="primary"
        class="ms-n2"
        hide-details
        :readonly="props.loading"
      ></v-checkbox>
    </div>
    <div class="text-error">
      {{ props.errorText }}
    </div>
    <v-btn color="primary" :loading="props.loading" block flat class="mt-2 text-none" :disabled="!validate" @click="SignIn()"
      >Sign in</v-btn
    >
  </v-form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
// const model = defineModel<string>('error', { default: '' });
type propsModel = {
  loading?: boolean;
  errorText?: string;
};
const props = withDefaults(defineProps<propsModel>(), {
  loading: false,
  errorText: ''
});
let validate = ref<boolean>(false);
const checkbox = ref(false); // TODO สำหรับ accept term and condition
const show1 = ref(false); // TODO สำหรับ show password
const password = ref(''); // TODO สำหรับเก็บ Username
const username = ref(''); // TODO สำหรับเก็บ Password

// TODO Rule สำหรับ Validate Value Username
import { rule } from '@/utils/rule';

type logInModel = {
  username: string;
  password: string;
};
const emit = defineEmits<{
  (e: 'signin', value: logInModel): void;
}>();

function SignIn() {
  emit('signin', { username: username.value, password: password.value });
}
</script>
<style lang="scss">
.v-checkbox {
  .v-label {
    font-size: 14px;
  }
}
</style>
