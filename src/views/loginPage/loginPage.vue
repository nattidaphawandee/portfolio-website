<template>
  <div style="height: 100%">
    <manage-ai-login
      v-model:mode="mode"
      :loading="loading"
      :errorText="errorText"
      @changeMode="errorText = ''"
      @signIn="signIn"
      @signUp="signUp"
      @signInOneIDAccount="signInOneIDAccount"
      @signInProviderIdAccount="signInProviderIdAccount"
      @sentMail="sentMail"
    >
    </manage-ai-login>
  </div>
</template>

<script setup lang="ts">
import ManageAiLogin from '@/views/loginPage/manageaiLogin.vue';

import { ref } from 'vue';
import { router } from '@/router';
import type { payloadLocalSingInModel, payLoadLocalSignUpModel, payLoadSignInProvidAuthorizationCodeModel } from '@/types/AuthenType';
import { useAlertStore } from '@/stores/alert';
const alert = useAlertStore();
import { useUserStore } from '@/stores/user';
const user = useUserStore();
import { useRoute } from 'vue-router';
const route = useRoute();
import { useAuthStore } from '@/stores/authentication';
const authStore = useAuthStore();
import aes from '@/utils/aes';
import { addQueryString } from '@/utils/url';

const mode = ref<'signIn' | 'signUp' | 'forgotPassword'>('signIn');
const data2fa = ref<{ status: boolean; otp: string; sessionId: string }>({ status: false, otp: '', sessionId: '' });
function changeMode(to: 'signIn' | 'signUp' | 'forgotPassword') {
  mode.value = to;
}

// sign in local
let loading = ref<boolean>(false);
let errorText = ref<string>('');
type logInModel = {
  username: string;
  password: string;
};
async function getAESSignatureForLogin(val: logInModel) {
  // ยิง APi ไปเอา AESSignature
  let dataEncryptionAES: logInModel = { username: '', password: '' };
  const res = await authStore.GetAESSignature();
  if (res.status) {
    let signatureKey: string = res.data.signature; //
    const usernameEncryptionAES = aes.AESEncryption(signatureKey, val.username);
    const passwordEncryptionAES = aes.AESEncryption(signatureKey, val.password);
    dataEncryptionAES = {
      username: `encryption-${usernameEncryptionAES}-encryption`,
      password: `encryption-${passwordEncryptionAES}-encryption`
    };
    return dataEncryptionAES;
  } else {
    alert.maAlert({
      icon: 'mdi-information',
      colorIcon: 'error',
      sizeIcon: '100',
      title: 'ผิดพลาด',
      description: res.message,
      persistent: false,
      btnConfirm: false,
      btnCancelText: 'ปิด'
    });
  }
  // บวก UserName + Password
  // *username และ Password สามารส่งใน Format “encryption-AES(username)-encryption”
  // ทำการ Encryption
  // const usernameEncryptionAES = this.EncryptionAES(this.signatureKey, usernameFormatEncrytion)
  // const passwordEncryptionAES = this.EncryptionAES(this.signatureKey, passwordFormatEncrytion)

  // console.log('Encryption : ' + dataFromEncryptionAES)
  // console.log('DecryptionAES : ' + this.DecryptionAES(this.signatureKey, dataFromEncryptionAES))

  // ทำการ ส่ง Data ที่ ทำการ Encryption ไปApi ได้ accesstoken กลับมา
  // console.log('usernameEncryptionAES : ' + usernameEncryptionAES)
  // console.log('passwordEncryptionAES : ' + passwordEncryptionAES)
  // this.accessTokenToLogin = dataFromEncryptionAES
}
async function signIn(items: logInModel) {
  loading.value = true;
  // let dataEncryptionAES: payloadLocalSingInModel | undefined = await getAESSignatureForLogin(items);
  // const payload: payloadLocalSingInModel = {
  //   username: dataEncryptionAES?.username,
  //   password: dataEncryptionAES?.password
  // };
  const res = await authStore.SignInLocal(items);
  loading.value = false;
  if (res.status) {
    if (res.code === 200) {
      // [x] store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('AccessToken', res.data.access_token);
      // [x] redirect to previous url or default to first menu
      errorText.value = '';
      router.push({ name: 'FullLayout' });
    } else if (res.code === 202) {
      // NOTE เปิด Dialog OTP
      data2fa.value.status = true;
      data2fa.value.sessionId = res.data.session_id;
    }
  } else {
    alert.maAlert({
      icon: 'mdi-information',
      colorIcon: 'error',
      sizeIcon: '100',
      title: 'ไม่สำเร็จ',
      description: res.message,
      persistent: false,
      btnConfirm: false,
      btnCancelText: 'ปิด'
    });
  }
}
// NOTE signIn OneIDAccount
async function signInOneIDAccount() {
  // TODO เป็น function สำหรับการ signin ผ่าน Oauth ของ OneID แบบ SSO
  // TODO Edit Here --------------------------
  // COMMENT สำหรับ credential ได้มาจาก dpc.th
  // FIX ต้องแก้เป็นดึงมาจาก Backend แทนการรับ Environment
  const clientID = import.meta.env.VITE_APP_ONEID_CLIENT_ID;

  // TODO สำหรับ Oneid จะเป็นการเก็บข้อมูลลง localstorage เนื่องจาก หากว่า set params DPC จะไม่ใช่ผ่านเพราะ URL ไม่เหมือน
  if (route.query.action !== undefined && route.query.invite_id !== undefined) {
    localStorage.clear();
    localStorage.setItem('invite_id', route.query.invite_id as string);
    localStorage.setItem('action', route.query.action as string);
  }

  // COMMENT สำหรับสร้าง Url สำหรับสั่งใน Oneid Redirect Authorization Code กลับมา
  const redirectUri = `${window.location.origin}${import.meta.env.VITE_APP_BASE_URL}login/oneid`;

  // COMMENT สำหรับกำหนด Response type
  const responseType = 'code';

  // COMMENT สำหรับกำหนดของที่สามารถขอข้อมูลได้จาก OneID
  const scope = 'title+first_name+last_name+birth_date+email+tel+pic';
  // TODO Edit Here --------------------------
  const uri = `${import.meta.env.VITE_APP_ONEID_URL}/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
  location.replace(encodeURI(uri));
}
// NOTE signIn ProviderIdAccount
async function signInProviderIdAccount() {
  // TODO Replace Url and Reload
  const res = await authStore.GetProviderIDCredential();
  const clientID = res.data.clientId;
  const healthId = res.data.url;

  const q = {
    ...{
      action: '',
      invite_id: ''
      // project_id: this.$route.query.project_id,
      // permission_id: this.$route.query.permission_id
    },
    ...route.query
  };
  // const redirectUri = `${window.location.origin}${process.env.VUE_APP_BASE_URL}login/providerid`
  const redirectUri = addQueryString(`${window.location.origin}${import.meta.env.VITE_APP_BASE_URL}login/providerid`, q);
  // const url = `${process.env.VUE_APP_PROVIDER_ID_URL}/oauth/redirect?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=code`
  const url = `${healthId}/oauth/redirect?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=code`;
  window.location.replace(url);
}
// NOTE เป็น Function สำหรับการ Append query string parameters to URL
// function addQueryString(url: string, query: any) {
//   // TODO Parse the input URL
//   const parsedUrl = new URL(url);

//   // TODO Iterate over the JSON data and append each key-value pair to the query string
//   for (const key of Object.keys(query)) {
//     parsedUrl.searchParams.append(key, query[key]);
//   }

//   // TODO Return the new URL with the appended query string
//   return parsedUrl.toString();
// }

// sign up
async function signUp(items: payLoadLocalSignUpModel) {
  alert
    .maAlert({
      icon: 'mdi-information',
      colorIcon: 'warning',
      sizeIcon: '100',
      title: `ลงทะเบียน`,
      description: `คุณต้องการลงทะเบียนใช่หรือไม่`
    })
    .then(async (value) => {
      if (value.status === 'submit') {
        loading.value = true;
        const res = await authStore.SignUpLocal({
          firstName: items.firstName,
          lastName: items.lastName,
          phone: items.phone,
          username: items.username
        });
        loading.value = false;
        if (!res.status) {
          alert.maAlert({
            icon: 'mdi-information',
            colorIcon: 'error',
            sizeIcon: '100',
            title: 'ไม่สำเร็จ',
            description: res.message,
            persistent: false,
            btnConfirm: false,
            btnCancelText: 'ปิด'
          });
        } else {
          alert
            .maAlert({
              icon: 'mdi-check-circle',
              colorIcon: 'success',
              sizeIcon: '100',
              title: `ลงทะเบียนสำเร็จ`,
              description: '',
              btnCancel: false,
              btnConfirmText: 'ปิด'
            })
            .then(async (value) => {
              if (value.status === 'submit') {
                changeMode('signIn');
              }
            });
        }
      }
    });
}
// sent email
async function sentMail(mail: string) {
  alert
    .maAlert({
      icon: 'mdi-information',
      colorIcon: 'warning',
      sizeIcon: '100',
      title: `ส่งฟอร์มเปลี่ยนรหัสผ่าน`,
      description: `คุณต้องการส่งฟอร์มเปลี่ยนรหัสผ่านไปยัง ${mail} นี้ใช่หรือไม่`
    })
    .then(async (value) => {
      if (value.status === 'submit') {
        loading.value = true;
        let res = await user.SentFormResetPasswordLocal(mail);
        loading.value = false;
        if (!res.status) {
          alert.maAlert({
            icon: 'mdi-information',
            colorIcon: 'error',
            sizeIcon: '100',
            title: 'ไม่สำเร็จ',
            description: res.message,
            persistent: false,
            btnConfirm: false,
            btnCancelText: 'ปิด'
          });
        } else {
          alert
            .maAlert({
              icon: 'mdi-check-circle',
              colorIcon: 'success',
              sizeIcon: '100',
              title: `สำเร็จ`,
              description: `ส่งฟอร์มเปลี่ยนรหัสผ่านสำเร็จ`,
              btnCancel: false,
              btnConfirmText: 'ปิด'
            })
            .then(async (value) => {
              if (value.status === 'submit') {
                changeMode('signIn');
              }
            });
        }
      }
    });
}
async function onFinishOTP(val: string) {
  data2fa.value.otp = val;
  data2fa.value.status = false;
  const res = await authStore.SignInLocalWithOTP({ code: data2fa.value.otp, sessionId: data2fa.value.sessionId });
  data2fa.value.otp = '';
  data2fa.value.sessionId = '';
  if (res.status) {
    // [x] store user details and jwt in local storage to keep user logged in between page refreshes
    localStorage.setItem('AccessToken', res.data.access_token);
    // [x] redirect to previous url or default to first menu
    errorText.value = '';
    router.push({ name: 'FullLayout' });
  } else {
    alert.maAlert({
      icon: 'mdi-information',
      colorIcon: 'error',
      sizeIcon: '100',
      title: 'ไม่สำเร็จ',
      description: res.message,
      persistent: false,
      btnConfirm: false,
      btnCancelText: 'ปิด'
    });
  }
}

let host = ref<string>('');
let textError = ref<boolean>(false);
let textFieldError = ref<boolean>(false);
async function create() {
  // TODO ใช้สำหรับการดึงค่า hostname เพื่อใช้ในการเลือกเปิด หน้า Login
  host.value = window.location.hostname;
  if (route.params.provider === 'providerid') {
    if (route.query.code !== undefined) {
      loading.value = true;

      const q: any = {
        ...{
          action: '',
          invite_id: ''
          // project_id: this.$route.query.project_id,
          // permission_id: this.$route.query.permission_id
        },
        ...route.query
      };
      let p: { project_id: string; permission_id: string } = { project_id: '', permission_id: '' };
      if (route.query.invite_id && route.query.action) {
        p = { ...p, ...JSON.parse(atob(route.query.invite_id as string)) };
      }

      const payload: payLoadSignInProvidAuthorizationCodeModel = {
        authorizationCode: route.query.code as string,
        redirectUri: addQueryString(`${window.location.origin}${import.meta.env.VITE_APP_BASE_URL}login/providerid`, q),
        action: (route.query.action as string) || '',
        projectId: p.project_id || '',
        permissionId: p.permission_id || ''
      };
      router.replace({ query: undefined }).catch(() => {});
      const res = await authStore.SignInProviderIDAuthorizationCode(payload);
      loading.value = false;
      if (res.code === 200) {
        if (res.status === true) {
          localStorage.setItem('AccessToken', res.data.accesstoken);
          router.push({ name: 'FullLayout' });
        }
        if (res.status === false) {
          textError.value = true;
          textFieldError.value = true;
        }
      } else {
        // this.antmessage.error(res.message)
        if (res.message === 'permission denied') {
          alert.maAlert({
            icon: 'mdi-information',
            colorIcon: 'error',
            sizeIcon: '100',
            title: 'ไม่มีสิทธิ์การเข้าถึงการใช้งาน',
            description: 'ไม่มีสิทธิ์ในการเข้าใช้งานระบบกรุณาติดต่อเจ้าหน้าที่',
            persistent: false,
            btnConfirm: false,
            btnCancelText: 'ปิด'
          });
        } else {
          alert.maAlert({
            icon: 'mdi-information',
            colorIcon: 'error',
            sizeIcon: '100',
            title: 'ผิดพลาด',
            description: res.message,
            persistent: false,
            btnConfirm: false,
            btnCancelText: 'ปิด'
          });
        }
      }
    }
  } else if (route.params.provider === 'oneid') {
    if (route.query.code !== undefined) {
      loading.value = true;

      // TODOเพื่อแก้ปัญหาไม่สามารถส่งข้อมูลผ่าน Query Sreing ของ OneID
      let inviteId: string | null = '';
      let action: string | null = '';
      let p: { project_id: string; permission_id: string } = { project_id: '', permission_id: '' };
      if (localStorage.getItem('action') && localStorage.getItem('invite_id')) {
        inviteId = localStorage.getItem('invite_id');
        action = localStorage.getItem('action');
        p = { ...p, ...JSON.parse(atob(inviteId as string)) };
      }

      const payload = {
        authorizationCode: route.query.code as string,
        redirectUri: `${window.location.origin}${import.meta.env.VITE_APP_BASE_URL}login/oneid`,
        action: action || '',
        projectId: p.project_id || '',
        permissionId: p.permission_id || ''
      };
      router.replace({ query: undefined }).catch(() => {});
      localStorage.clear();

      const res = await authStore.SignInOneIDAuthorizationCode(payload);
      loading.value = false;
      if (res.code === 200) {
        if (res.status === true) {
          localStorage.setItem('AccessToken', res.data.access_token);
          router.push({ name: 'FullLayout' });
        } else {
          textError.value = true;
          textFieldError.value = true;
        }
      } else {
        alert.maAlert({
          icon: 'mdi-information',
          colorIcon: 'error',
          sizeIcon: '100',
          title: 'ผิดพลาด',
          description: res.message,
          persistent: false,
          btnConfirm: false,
          btnCancelText: 'ปิด'
        });
      }
    }
  } else if (route.query.accesstoken) {
    const decodedToken = window.atob(route.query.accesstoken as string);
    localStorage.setItem('AccessToken', decodedToken);
    router.push({ name: 'FullLayout' });
  }
}

create();
</script>

<style lang="scss" scoped></style>
