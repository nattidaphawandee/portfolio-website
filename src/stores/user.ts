// TODO เก็ขข้อมูลของ User ทั้งหมด
import { defineStore } from 'pinia';
import axios from '@/utils/axios';
import type { Res } from '@/types/GlobalType';

import type {
  Actions,
  Getters,
  State,
  resetPasswordModel,
  userModel,
  userTableFilterModel,
  userResModel,
  userTableResModel,
  userCreateModel,
  userCreateReqModel,
  userUpdateModel,
  methodsResModel,
  methodsModel,
  RepoUserAPIKeyResModel,
  RepoUserAPIKeyModel
} from '@/types/UserType';

export const useUserStore = defineStore<'user', State, Getters, Actions>({
  id: 'user',
  state: () => ({
    users: {
      pagination: {
        page: 1,
        row: 10,
        total: 0
      },
      data: []
    },
    permission: [
      { text: 'super admin', value: '0' },
      { text: 'admin', value: '1' },
      { text: 'user', value: '2' }
    ]
  }),

  getters: {
    Users(state: State) {
      return state.users;
    }
  },

  actions: {
    // async ResetPasswordLocal(payload: resetPasswordModel) {
    //   const res = await axios<Res<string>>({
    //     url: `${import.meta.env.VITE_APP_API}/api/v1/user/${payload.userId}/password/reset`,
    //     method: 'post',
    //     data: { password: payload.password },
    //   })
    //   return {
    //     data: res.data,
    //     status: res.status,
    //     message: res.message,
    //     code: res.code,
    //   }
    // },
    // async PasswordLocalNew(password: string) {
    //   const res = await axios<Res<string>>({
    //     url: `${import.meta.env.VITE_APP_API}/api/v1/user/password/new`,
    //     method: 'post',
    //     data: { password: password },
    //   })
    //   return {
    //     data: res.data,
    //     status: res.status,
    //     message: res.message,
    //     code: res.code,
    //   }
    // },
    async GetUserTable(filter?: userTableFilterModel) {
      const res = await axios<Res<userTableResModel>>({
        url: `${import.meta.env.VITE_APP_API}/api/v1/users`,
        method: 'get',
        params: filter ? filter : { page: 1, row: 10, keyword: '' }
      });
      let user: userModel[] = [];
      this.users.data = [];
      if (res.status) {
        user = userResModels2userModels(res.data.data);
      }
      this.users = { pagination: res.data.pagination, data: user };
      return await {
        data: { pagination: res.data.pagination, data: user },
        status: res.status,
        message: res.message,
        code: res.code
      };
    },

    async CreateUserLocal(payload: userCreateModel) {
      const data: userCreateReqModel = userCreateModel2userCreateReqModel(payload);
      const res = await axios<Res<userResModel>>({
        url: `${import.meta.env.VITE_APP_API}/api/v1/user`,
        method: 'post',
        data: data
      });
      let user: userModel = {
        userId: '',
        firstName: '',
        lastName: '',
        phone: '',
        gender: '',
        image: '',
        methods: [],
        dateOfBirth: '',
        permissions: [],
        apikeys: [],
        status: false,
        verify: 0,
        createDate: '',
        updateDate: '',
        street: '',
        zipCode: '',
        city: '',
        countryCode: '',
        country: '',
        description: '',
        nameTitle: '',
        enable2fa: false,
        secret: '',
        theme: ''
      };
      if (res.status) {
        user = userResModel2userModel(res.data);
      }

      return await { data: user, status: res.status, message: res.message, code: res.code };
    },
    async UpdateUser(payload: userUpdateModel) {
      const data: userCreateReqModel = userCreateModel2userCreateReqModel(payload);
      const res = await axios<Res<userResModel>>({
        url: `${import.meta.env.VITE_APP_API}/api/v1/user/${payload.userId}`,
        method: 'put',
        data: data
      });
      let user: userModel = {
        userId: '',
        firstName: '',
        lastName: '',
        phone: '',
        gender: '',
        image: '',
        methods: [],
        dateOfBirth: '',
        permissions: [],
        apikeys: [],
        status: false,
        verify: 0,
        createDate: '',
        updateDate: '',
        street: '',
        zipCode: '',
        city: '',
        countryCode: '',
        country: '',
        description: '',
        nameTitle: '',
        enable2fa: false,
        secret: '',
        theme: ''
      };
      if (res.status) {
        user = userResModel2userModel(res.data);
      }
      return await { data: user, status: res.status, message: res.message, code: res.code };
    },
    async DeleteUser(userId: string) {
      const res = await axios<Res<string>>({
        url: `${import.meta.env.VITE_APP_API}/api/v1/user/${userId}`,
        method: 'delete'
      });
      return await { data: res.data, status: res.status, message: res.message, code: res.code };
    },
    async ResetPasswordUser(userId: string, password: string) {
      const res = await axios<Res<userResModel>>({
        url: `${import.meta.env.VITE_APP_API}/api/v1/user/${userId}`,
        method: 'put',
        data: { password: password }
      });
      let user: userModel = {
        userId: '',
        firstName: '',
        lastName: '',
        phone: '',
        gender: '',
        image: '',
        methods: [],
        dateOfBirth: '',
        permissions: [],
        apikeys: [],
        status: false,
        verify: 0,
        createDate: '',
        updateDate: '',
        street: '',
        zipCode: '',
        city: '',
        countryCode: '',
        country: '',
        description: '',
        nameTitle: '',
        enable2fa: false,
        secret: '',
        theme: ''
      };
      if (res.status) {
        user = userResModel2userModel(res.data);
      }
      return await { data: user, status: res.status, message: res.message, code: res.code };
    }
  }
});

// function DTO userResModel[] to userModel[]
function userResModels2userModels(payload: userResModel[]): userModel[] {
  return payload.map((item: userResModel): userModel => {
    return userResModel2userModel(item);
  });
}

// function DTO userResModel to userModel
function userResModel2userModel(payload: userResModel): userModel {
  return {
    userId: payload.user_id,
    firstName: payload.first_name,
    lastName: payload.last_name,
    phone: payload.phone,
    gender: payload.gender,
    image: payload.image,
    methods: payload.methods.map((item: methodsResModel): methodsModel => {
      return {
        methodId: item.method_id,
        provider: item.provider,
        id: item.id,
        email: item.email,
        username: item.username,
        password: item.password,
        description: item.description,
        status: item.status,
        verify: item.verify,
        createDate: item.create_date,
        updateDate: item.update_date
      };
    }),
    dateOfBirth: payload.date_of_birth,
    permissions: payload.permissions,
    apikeys: payload.apikeys.map((item: RepoUserAPIKeyResModel): RepoUserAPIKeyModel => {
      return {
        keyId: item.key_id,
        name: item.name,
        keyHash: item.key_hash,
        expiresAt: item.expires_at,
        revoked: item.revoked,
        scope: item.scope,
        description: item.description,
        createDate: item.create_date,
        updateDate: item.update_date
      };
    }),
    status: payload.status,
    verify: payload.verify,
    createDate: payload.create_date,
    updateDate: payload.update_date,
    street: payload.street,
    zipCode: payload.zip_code,
    city: payload.city,
    countryCode: payload.country_code,
    country: payload.country,
    description: payload.description,
    nameTitle: payload.name_title,
    enable2fa: payload.enable_2fa,
    secret: payload.secret,
    theme: payload.theme
  };
}

// function DTO userCreateModel to userCreateReqModel
function userCreateModel2userCreateReqModel(payload: userCreateModel): userCreateReqModel {
  return {
    username: payload.username,
    first_name: payload.firstName,
    last_name: payload.lastName,
    permissions: payload.permissions
  };
}
