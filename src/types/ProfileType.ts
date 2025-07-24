import { type _GettersTree } from 'pinia';
import { type StoreRes } from '@/types/GlobalType';
// NOTE : This is template of state ----------------------------
export interface State {
  /**
   * ข้อมูล profile user signin
   */
  profile: profileModel;
}

// NOTE : This is template of getters ---------------------------
export interface Getters extends _GettersTree<State> {
  /**
   * Getter สำหรับ Get ข้อมูล profile user signin
   * @param state - The current state of the store.
   * @returns {profileModel} profileModel - returns the profileModel
   */
  Profile(state: State): profileModel;
}

// NOTE : This is template of methods of exporting ---------------
export interface Actions {
  /**
   * Function ดึงข้อมูล Profile ของ User ที่ signin จาก API
   * @returns returns the profileResModel
   */
  GetProfile(): Promise<StoreRes<profileModel>>;
  /**
   * เป็น Function ในการ แก้ไขข้อมูล profile
   * @param {updateProfileModel} ข้อมูลจาก form ของ ข้อมูล profile ที่ต้องการแก้ไขข้อมูล
   * @returns { Promise<StoreRes<updateProfileReturnModel>>} สำหรับการ Return updateProfileReturnModel
   */
  UpdateProfile(payload: updateProfileModel): Promise<StoreRes<profileModel>>;
  /**
   * เป็น Function ในการ upload image profile
   * @param {file} formData.append('file',file )
   * @returns { string } สำหรับการ return string
   */
  UpdateImageProfile(image: string): Promise<StoreRes<profileModel>>;
  UpdateThemeUser(theme: string): Promise<StoreRes<profileModel>>;

  // DeleteProfile(): void;
  // LinkProfileOneID(): void;
  // LinkProfileProviderID(): void;
  // LinkProfileGoogle():void
  /**
   * Logs in the user.
   * @returns {void}
   */
}

//  NOTE Type of module ---------------------------------------------

export type profileModelold = {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  enabledOneid: boolean;
  enable2fa: boolean;
  permissions: number;
  createBy: string;
  theme: string;
  image: string;
  createDate: string;
  updateDate: string;
};

// NOTE Backend specific type
// NOTE Backend specific type
// Key ของผู้ใช้งานในระบบ
export type RepoUserAPIKeyResModel = {
  key_id: string; // รหัสประจำของ API Key (สำหรับอ้างอิงภายนอก เช่นแสดงใน UI)
  name: string; // ชื่อของ API Key
  key_hash: string; // ค่าแฮชของ API Key (ไม่ควรเก็บค่า plaintext เพื่อความปลอดภัย)
  expires_at: string; // วันหมดอายุของ API Key (ISO date string เช่น "2025-06-14T12:00:00Z")
  revoked: boolean; // ระบุว่า API Key ถูกเพิกถอนแล้วหรือไม่
  scope: string[]; // สิทธิ์การเข้าถึง (เช่น read:user, write:project)
  description: string; // คำอธิบายเพิ่มเติมของ Key เช่น "ใช้สำหรับ CLI"
  create_date: string; // วันที่สร้าง API Key (ISO date string)
  update_date: string; // วันที่อัปเดตล่าสุด (เช่นใช้ล่าสุดหรือเปลี่ยน scope)
};

export type methodsResModel = {
  method_id: string;
  provider: string;
  id: string;
  email: string;
  username: string;
  password: string;
  description: string;
  status: boolean;
  verify: number;
  create_date: string;
  update_date: string;
};

export type profileResModel = {
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  gender: string;
  image: string;
  methods: methodsResModel[];
  date_of_birth: string;
  permissions: string[];
  apikeys: RepoUserAPIKeyResModel[];
  status: boolean;
  verify: number;
  create_date: string;
  update_date: string;
  street: string;
  zip_code: string;
  city: string;
  country_code: string;
  country: string;
  description: string;
  name_title: string;
  enable_2fa: boolean;
  secret: string;
  theme: string;
};

export type RepoUserAPIKeyModel = {
  keyId: string; // รหัสประจำของ API Key (สำหรับอ้างอิงภายนอก เช่นแสดงใน UI)
  name: string; // ชื่อของ API Key
  keyHash: string; // ค่าแฮชของ API Key (ไม่ควรเก็บค่า plaintext เพื่อความปลอดภัย)
  expiresAt: string; // วันหมดอายุของ API Key (ISO date string เช่น "2025-06-14T12:00:00Z")
  revoked: boolean; // ระบุว่า API Key ถูกเพิกถอนแล้วหรือไม่
  scope: string[]; // สิทธิ์การเข้าถึง (เช่น read:user, write:project)
  description: string; // คำอธิบายเพิ่มเติมของ Key เช่น "ใช้สำหรับ CLI"
  createDate: string; // วันที่สร้าง API Key (ISO date string)
  updateDate: string; // วันที่อัปเดตล่าสุด (เช่นใช้ล่าสุดหรือเปลี่ยน scope)
};

export type methodsModel = {
  methodId: string;
  provider: string;
  id: string;
  email: string;
  username: string;
  password: string;
  description: string;
  status: boolean;
  verify: number;
  createDate: string;
  updateDate: string;
};

export type profileModel = {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  image: string;
  methods: methodsModel[];
  dateOfBirth: string;
  permissions: string[];
  apikeys: RepoUserAPIKeyModel[];
  status: boolean;
  verify: number;
  createDate: string;
  updateDate: string;
  street: string;
  zipCode: string;
  city: string;
  countryCode: string;
  country: string;
  description: string;
  nameTitle: string;
  enable2fa: boolean;
  secret: string;
  theme: string;
};

// update
export type updateProfileModel = {
  userId?: string;
  username?: string; // ชื่อผู้ใช้งาน
  password?: string; // รหัสผ่านใหม่ (ถ้ามี)
  firstName?: string; // ชื่อจริง
  lastName?: string; // นามสกุล
  permissions?: string[]; // สิทธิ์ผู้ใช้งาน เช่น ["admin", "editor"]
  image?: string; // รูปโปรไฟล์
  theme?: string; // ธีม UI เช่น "dark"
};
export type updateProfileReqModel = {
  username?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  permissions?: string[];
  image?: string;
  theme?: string;
};
