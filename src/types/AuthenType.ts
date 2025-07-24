import { type _GettersTree } from 'pinia';
import { type StoreRes } from '@/types/GlobalType';

// NOTE : This is template of state
export interface State {}

// NOTE : This is template of getters
export interface Getters extends _GettersTree<State> {}

// NOTE : This is template of methods of exporting
export interface Actions {
  /**
   * การ sign in ด้วย local user
   * @param {payloadLocalSingInModel}  username and password of the user
   * @returns { Promise<boolean>} สำหรับการ Return
   */
  SignInLocal(payload: payloadLocalSingInModel): Promise<StoreRes<localSignInResModel>>;
  SignInLocalWithOTP(payload: payloadLocalSingInOTPModel): Promise<StoreRes<localSignInResModel>>;


  /**
   * การ sign up user local
   * @param {payLoadLocalSignUpModel} data user from form signup
   * @returns { Promise<boolean>} สำหรับการ Return
   */
  SignUpLocal(payload: payLoadLocalSignUpModel): Promise<StoreRes<dataLocalSignUpModel>>;

  // /**
  //  * Logs in the user by one authen.
  //  * @returns {Promise<boolean>}
  //  */
  // SignInOneID(): Promise<boolean>;

  // /**
  //  * Logs in the user by providerID.
  //  * @returns {Promise<boolean>}
  //  */
  // SignInProviderID(): Promise<boolean>;

  SignInProviderIDAuthorizationCode(
    payload: payLoadSignInProvidAuthorizationCodeModel
  ): Promise<StoreRes<signInProvidAuthorizationCodeModel>>;
  SignInOneIDAuthorizationCode(payload: payLoadSignInOneIDAuthorizationCodeModel): Promise<StoreRes<signInOneIDAuthorizationCodeModel>>;
  // /**
  //  * ดึงข้อมูล providerID credential Login จาก API.
  //  * @returns {Promise<providerIDCredentialResModel>}
  //  */
  GetProviderIDCredential(): Promise<StoreRes<providerIDCredentialModel>>;
  GetAESSignature(): Promise<StoreRes<AESSignatureModel>>;
  /**
   * user logout
   * @returns {void}
   */
  Logout(): void;
  OauthLogOutOneID(): void;

  ConnectOneIDAccount(payload: payloadConnectOneIDModel): Promise<StoreRes<responseConnectModel>>;
  ConnectProviderIDAccount(payload: payloadConnectProviderIDModel): Promise<StoreRes<responseConnectModel>>;
  Update2FA(status: boolean): Promise<StoreRes<resUpdate2FA>>;
}

//  NOTE Type of module ---------------------------------------------
// sign in
export type payloadLocalSingInModel = {
  username: string | undefined;
  password: string | undefined;
};

export type payloadLocalSingInOTPModel = {
  code: string;
  sessionId: string;
};

export type localSignInResModel = {
  type: string;
  access_token	: string;
  session_id: string;
};
export type resUpdate2FA = {
  secret: string;
  uri: string;
};
// sign up
export type payLoadLocalSignUpModel = {
  nameTitle?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  gender?: string;
  username: string;
  image?: string;
  dateOfBirth?: string;
  street?: string;
  zipCode?: string;
  city?: string;
  countryCode?: string;
  country?: string;
  timeZone?: string;
  description?: string;
};
export type localSignUpReqModel = {
  name_title?: string;
  first_name: string;
  last_name: string;
  phone: string;
  gender: string;
  username: string;
  image?: string;
  date_of_birth?: string;
  street?: string;
  zip_code?: string;
  city?: string;
  country_code?: string;
  country?: string;
  time_zone?: string;
  description?: string;
};

// sign up respone api
export type localSignUpResModel = {
  user_id: string;
  name_title?: string;
  first_name: string;
  last_name: string;
  phone: string;
  gender: string;
  username: string;
  image?: string;
  date_of_birth?: string;
  permissions: userPermissionsResModel[];
  verify?: number;
  street?: string;
  zip_code?: string;
  city?: string;
  country_code?: string;
  country?: string;
  time_zone?: string;
  description?: string;
  methods: userMethodsResModel[];
};
export type userPermissionsResModel = {
  permission_id: string;
};
export type userMethodsResModel = {
  provider: string;
  method_id: string;
  email: string;
  username: string;
};

export type dataLocalSignUpModel = {
  userId: string;
  nameTitle?: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  username: string;
  image?: string;
  dateOfBirth?: string;
  permissions: userPermissionsModel[];
  verify?: number;
  street?: string;
  zipCode?: string;
  city?: string;
  countryCode?: string;
  country?: string;
  timeZone?: string;
  description?: string;
  methods: userMethodsModel[];
};
export type userPermissionsModel = {
  permissionId: string;
};
export type userMethodsModel = {
  provider: string;
  methodId: string;
  email: string;
  username: string;
};

// // Sign in by ProviderID
export type providerIDCredentialResModel = {
  client_id: string;
  url: string;
};
export type providerIDCredentialModel = {
  clientId: string;
  url: string;
};

export type responseConnectModel = localSignInResModel;
// AESSignature
export type AESSignatureModel = {
  signature: string;
};

// signin ProvidAuthorizationCode
export type payLoadSignInProvidAuthorizationCodeModel = {
  authorizationCode: string;
  redirectUri: string;
  action: string;
  projectId: string;
  permissionId: string;
};
// signin ProvidAuthorizationCode
export type payLoadSignInProvidAuthorizationCodeReqModel = {
  authorization_code: string;
  redirect_uri: string;
  action: string;
  project_id: string;
  permission_id: string;
};
export type signInProvidAuthorizationCodeModel = {
  type: string;
  accesstoken: string;
};

export type payloadConnectOneIDModel = {
  authorization_code: string;
  redirect_uri: string;
};

export type payloadConnectProviderIDModel = {
  authorization_code: string;
  redirect_uri: string;
};

// signin ProvidAuthorizationCode
export type payLoadSignInOneIDAuthorizationCodeModel = {
  authorizationCode: string;
  redirectUri: string;
  action: string;
  projectId: string;
  permissionId: string;
};
export type payLoadSignInOneIDAuthorizationCodeReqModel = {
  authorization_code: string;
  redirect_uri: string;
  action: string;
  project_id: string;
  permission_id: string;
};

export type signInOneIDAuthorizationCodeModel = {
  type: string;
  access_token: string;
};
