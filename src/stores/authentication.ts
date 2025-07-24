import { defineStore } from 'pinia';
import axios from '@/utils/axios';
import type { Res } from '@/types/GlobalType';
import { router } from '@/router';
import type {
  Actions,
  Getters,
  State,
  payloadLocalSingInModel,
  localSignInResModel,
  payLoadLocalSignUpModel,
  localSignUpReqModel,
  localSignUpResModel,
  dataLocalSignUpModel,
  providerIDCredentialResModel,
  providerIDCredentialModel,
  AESSignatureModel,
  payLoadSignInProvidAuthorizationCodeModel,
  payLoadSignInProvidAuthorizationCodeReqModel,
  signInProvidAuthorizationCodeModel,
  payLoadSignInOneIDAuthorizationCodeModel,
  payLoadSignInOneIDAuthorizationCodeReqModel,
  signInOneIDAuthorizationCodeModel,
  payloadConnectOneIDModel,
  payloadConnectProviderIDModel,
  responseConnectModel,
  resUpdate2FA,
  payloadLocalSingInOTPModel
} from '@/types/AuthenType';
import { type StoreRes } from '@/types/GlobalType';

export const useAuthStore = defineStore<'authentication', State, Getters, Actions>({
  id: 'authentication',
  state: () => ({}),
  getters: {},
  actions: {
    async ConnectOneIDAccount(payload: payloadConnectOneIDModel): Promise<StoreRes<responseConnectModel>> {
      // NOTE เป็น Function สำหรับใช้ในการ Connect Local Account กับ OneID
      const p = {
        ...{ authorization_code: '', redirect_uri: '' },
        ...payload
      };

      const res = await axios<Res<localSignInResModel>>({
        url: `${import.meta.env.VITE_APP_API}/api/v1/profile/connect/oneid`,
        method: 'post',
        data: p
      });

      return res;
    },
    async ConnectProviderIDAccount(payload: payloadConnectProviderIDModel): Promise<StoreRes<responseConnectModel>> {
      // NOTE เป็น Function สำหรับใช้ในการ Connect Local Account กับ ProviderID
      const p = {
        ...{ authorization_code: '', redirect_uri: '' },
        ...payload
      };

      const res = await axios<Res<localSignInResModel>>({
        url: `${import.meta.env.VITE_APP_API}/api/v1/profile/connect/providerid`,
        method: 'post',
        data: p
      });

      return res;
    },
    async Update2FA(status: boolean = false): Promise<StoreRes<resUpdate2FA>> {
      // NOTE เป็น Function สำหรับ Enable/Disable Feature 2FA
      const data = {
        enable_2fa: status
      };
      const options = {
        url: `${import.meta.env.VITE_APP_API}/api/v1/user/2fa`,
        method: 'put',
        data: data
      };
      return await axios<Res<resUpdate2FA>>(options);
    },
    async SignInLocal(payload: payloadLocalSingInModel) {
      // call api sign in
      const res = await axios<Res<localSignInResModel>>({
        url: `${import.meta.env.VITE_APP_API}/api/v1/signin`,
        method: 'post',
        data: payload
      });
      if (res.status) {
        // TODO sign in success
        return res;
      }
      // TODO Login failed
      return res;
    },
    async SignInLocalWithOTP(payload: payloadLocalSingInOTPModel): Promise<StoreRes<localSignInResModel>> {
      const res = await axios<Res<localSignInResModel>>({
        url: `${import.meta.env.VITE_APP_API}/api/v1/signin/totp/${payload.sessionId}`,
        method: 'post',
        data: { code: payload.code }
      });
      if (res.status) {
        // TODO sign in success
        return res;
      }
      // TODO Login failed
      return res;
    },
    async SignUpLocal(payload: payLoadLocalSignUpModel) {
      const data: localSignUpReqModel = payLoadLocalSignUpModel2localSignUpReqModel(payload);
      // call api sign up
      const res = await axios<Res<localSignUpResModel>>({
        url: `${import.meta.env.VITE_APP_API}/api/v1/signup`,
        method: 'post',
        data: data
      });

      let dataLocalSignUp: dataLocalSignUpModel = {
        userId: '',
        firstName: '',
        lastName: '',
        phone: '',
        gender: '',
        username: '',
        dateOfBirth: '',
        permissions: [],
        description: '',
        methods: []
      };

      if (res.status) {
        dataLocalSignUp = localSignUpResModel2dataLocalSignUpModel(res.data);
        // TODO signup success
        return { data: dataLocalSignUp, status: res.status, message: res.message, code: res.code };
      }
      // TODO Signup failed
      return { data: dataLocalSignUp, status: res.status, message: res.message, code: res.code };
    },
    // async SignInOneID(): Promise<boolean> {
    //   try {
    //     const clientID = `${import.meta.env.VITE_APP_ONEID_CLIENT_ID}`; // Ensure this environment variable is set
    //     const redirectUri = `${window.location.origin}${import.meta.env.VITE_APP_BASE_URL}login/oneid`;
    //     const responseType = 'code'; // Adjust if needed
    //     const scope = 'title+first_name+last_name+birth_date+email+tel+pic'; // Adjust if needed

    //     // Construct the full authorization URL
    //     const uri = `${import.meta.env.VITE_APP_ONEID_URL}/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    //     // Redirect the user to the OneID authorization page
    //     location.replace(uri);

    //     return true;
    //   } catch (error) {
    //     console.error('error: ', error);
    //     return false;
    //   }
    // },

    // async SignInProviderID(): Promise<boolean> {
    //   try {
    //     const res = await this.getProviderIDCredential();

    //     const clientID = res.client_id;
    //     const redirectUri = `${window.location.origin}${import.meta.env.VITE_APP_BASE_URL}login/providerid`;

    //     const uri = `${import.meta.env.VITE_APP_PROVIDER_ID_URL}/oauth/redirect?client_id=${clientID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`;

    //     location.replace(uri);

    //     return true;
    //   } catch (error) {
    //     console.error('error: ', error);
    //     return false;
    //   }
    // },

    async GetProviderIDCredential() {
      const res = await axios<Res<providerIDCredentialResModel>>({
        url: `${import.meta.env.VITE_APP_API}/api/v1/signin/providerid/credential`,
        method: 'get'
      });

      let data: providerIDCredentialModel = {
        clientId: '',
        url: ''
      };

      if (res.status) {
        data = {
          clientId: res.data.client_id,
          url: res.data.url
        };
        return { data: data, status: res.status, message: res.message, code: res.code };
      }
      // TODO signup success
      return { data: data, status: res.status, message: res.message, code: res.code };
    },
    Logout(): void {
      // NOTE clear all local storage
      localStorage.clear();
      // NOTE router push to login page
      router.push({ name: 'LoginPage' }).catch(() => {});
    },
    async GetAESSignature() {
      const res = await axios<Res<AESSignatureModel>>({
        url: `${import.meta.env.VITE_APP_API}/api/v1/signin/signature`,
        method: 'get'
      });
      return { data: res.data, status: res.status, message: res.message, code: res.code };
    },
    async SignInProviderIDAuthorizationCode(payload: payLoadSignInProvidAuthorizationCodeModel) {
      // NOTE this function signin
      const data: payLoadSignInProvidAuthorizationCodeReqModel = {
        authorization_code: payload.authorizationCode,
        redirect_uri: payload.redirectUri,
        action: payload.action,
        project_id: payload.permissionId,
        permission_id: payload.permissionId
      };
      const res = await axios<Res<signInProvidAuthorizationCodeModel>>({
        url: `${import.meta.env.VITE_APP_API}/api/v1/signin/providerid`,
        method: 'post',
        data: data
      });
      return { data: res.data, status: res.status, message: res.message, code: res.code };
    },
    async SignInOneIDAuthorizationCode(payload: payLoadSignInOneIDAuthorizationCodeModel) {
      // NOTE this function signin
      const data: payLoadSignInOneIDAuthorizationCodeReqModel = {
        authorization_code: payload.authorizationCode,
        redirect_uri: payload.redirectUri,
        action: payload.action,
        project_id: payload.permissionId,
        permission_id: payload.permissionId
      };
      const res = await axios<Res<signInOneIDAuthorizationCodeModel>>({
        url: `${import.meta.env.VITE_APP_API}/api/v1/signin/oneid`,
        method: 'post',
        data: data
      });
      return { data: res.data, status: res.status, message: res.message, code: res.code };
    },
    async OauthLogOutOneID() {
      // COMMENT เป็นการ Logout แบบ SSO
      const redirectUri = `${window.location.origin}${import.meta.env.VITE_APP_API.VUE_APP_BASE_URL}login`;
      const uri = `${import.meta.env.VITE_APP_API}/api/oauth/logout?redirect_uri=${redirectUri}`;
      location.replace(uri);
    }
  }
});

function payLoadLocalSignUpModel2localSignUpReqModel(payload: payLoadLocalSignUpModel): localSignUpReqModel {
  return {
    name_title: payload.nameTitle ? payload.nameTitle : '',
    first_name: payload.firstName,
    last_name: payload.lastName,
    phone: payload.phone ? payload.phone : '',
    gender: payload.gender ? payload.gender : '',
    username: payload.username,
    image: payload.image ? payload.image : '',
    date_of_birth: payload.dateOfBirth ? payload.dateOfBirth : '',
    street: payload.street ? payload.street : '',
    zip_code: payload.zipCode ? payload.zipCode : '',
    city: payload.city ? payload.city : '',
    country_code: payload.countryCode ? payload.countryCode : '',
    country: payload.country ? payload.country : '',
    time_zone: payload.timeZone ? payload.timeZone : '',
    description: payload.description ? payload.description : ''
  };
}

function localSignUpResModel2dataLocalSignUpModel(payload: localSignUpResModel): dataLocalSignUpModel {
  return {
    userId: payload.user_id,
    nameTitle: payload.name_title ? payload.name_title : '',
    firstName: payload.first_name,
    lastName: payload.last_name,
    phone: payload.phone,
    gender: payload.gender,
    username: payload.username,
    image: payload.image ? payload.image : '',
    dateOfBirth: payload.date_of_birth ? payload.date_of_birth : '',
    permissions: payload.permissions.map((p) => {
      return {
        permissionId: p.permission_id
      };
    }),
    verify: payload.verify ? payload.verify : 0,
    street: payload.street ? payload.street : '',
    zipCode: payload.zip_code ? payload.zip_code : '',
    city: payload.city ? payload.city : '',
    countryCode: payload.country_code ? payload.country_code : '',
    country: payload.country ? payload.country : '',
    timeZone: payload.time_zone ? payload.time_zone : '',
    description: payload.user_id ? payload.user_id : '',
    methods: payload.methods.map((m) => {
      return {
        methodId: m.method_id,
        provider: m.provider,
        email: m.email,
        username: m.username
      };
    })
  };
}
