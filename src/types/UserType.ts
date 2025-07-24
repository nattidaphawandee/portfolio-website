import { type _GettersTree } from 'pinia';
import { type StoreRes } from '@/types/GlobalType';
// NOTE : This is template of state ----------------------------
export interface State {
  users: userTableModel;
}

// NOTE : This is template of getters ---------------------------
export interface Getters extends _GettersTree<State> {
  /**
   * เป็น Getter สำหรับ Get ข้อมูล users to Table
   * @param state - The current state of the store.
   * @returns {userTableModel} returns the userTableModel
   */
  Users(state: State): userTableModel;
}

// NOTE : This is template of methods of exporting ---------------
export interface Actions {
  // ResetPasswordLocal(payload: resetPasswordModel): Promise<StoreRes<string>>
  // /**
  //  * เป็น Function set new password local on email by user
  //  * @param {string} newpassword  ที่ต้องการ set
  //  * @returns { Promise<StoreRes<string>>} สำหรับการ Return string
  //  */
  // PasswordLocalNew(password: string): Promise<StoreRes<string>>

  // /**
  //  * เป็น Function reset password local by admin
  //  * @param {resetPasswordModel} newpassword userid ของ  user ที่ต้องการ reset
  //  * @returns { Promise<StoreRes<string>>} สำหรับการ Return string
  //  */
  // ResetPasswordLocal(payload: resetPasswordModel): Promise<StoreRes<string>>

  /**
   *
   * เป็น Function ในการ ดึงข้อมูล user ในระบบมาแสดงใน Table
   * @param {userTableFilterModel} filter สำหรับ filter ข้อมูล
   * @returns { Promise<StoreRes<userTableModel>} สำหรับการ Return userTableModel
   */
  GetUserTable(filter?: userTableFilterModel): Promise<StoreRes<userTableModel>>;

  /**
   * เป็น Function ในการ สร้าง user local
   * @param {userCreateModel} ข้อมูลจาก form ของ user ที่ต้องการสร้าง
   * @returns { Promise<StoreRes<userModel>>} สำหรับการ Return userModel
   */
  CreateUserLocal(payload: userCreateModel): Promise<StoreRes<userModel>>;

  /**
   * เป็น Function ในการ update ข้อมูล user
   * @param {userModel} ข้อมูลจาก form ของ user ที่ต้องการแก้ไข
   * @returns { Promise<StoreRes<userModel>>} สำหรับการ Return userModel
   */
  UpdateUser(payload: userUpdateModel): Promise<StoreRes<userModel>>;

  /**
   * เป็น Function ในการ delete user
   * @param {string} ข้อมูล user_id ของ user ที่ต้องการลบ
   * @returns { Promise<StoreRes<string>>} สำหรับการ Return string
   */
  DeleteUser(userId: string): Promise<StoreRes<string>>;

  /**
   * เป็น Function ในการ reset password user
   * @param {string} ข้อมูล user_id ของ user ที่ต้องการลบ
   * @returns { Promise<StoreRes<string>>} สำหรับการ Return string
   */
  ResetPasswordUser(userId: string, password: string): Promise<StoreRes<userModel>>;
}

//  NOTE Type of module ---------------------------------------------
// reset password local
export type resetPasswordModel = {
  userId: string;
  password: string;
};

// Get user table

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
export type userModel = {
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
export type paginationModel = {
  page: number;
  row: number;
  total: number;
};
export type userTableModel = {
  pagination: paginationModel;
  data: userModel[];
};
export type userTableFilterModel = {
  page?: number;
  row?: number;
  keyword?: string;
};
// res Get user table
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

export type userResModel = {
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
export type userTableResModel = {
  pagination: paginationModel;
  data: userResModel[];
};

// create User
export type userCreateModel = {
  username: string;
  firstName: string;
  lastName: string;
  permissions: string[];
};
export type userCreateReqModel = {
  username: string;
  first_name: string;
  last_name: string;
  permissions: string[];
};

// update User
export type userUpdateModel = {
  userId?: string;
  username: string;
  firstName: string;
  lastName: string;
  permissions: string[];
  theme?: string;
};
export type userUpdateReqModel = {
  user_id: string;
  username: string;
  first_name: string;
  last_name: string;
  permissions: string[];
  theme: string;
};
