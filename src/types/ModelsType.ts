import { type _GettersTree } from 'pinia';
import { type StoreRes } from '@/types/GlobalType';
// NOTE : This is template of state ----------------------------
export interface State {
  models: modelTableModel;
  dropdownModel: dropdownModelModel[];
  typeModels: typeModelModel[];
}
// NOTE : This is template of getters ---------------------------
export interface Getters extends _GettersTree<State> {
  /**
   * เป็น Getter สำหรับ Get ข้อมูล models to Table
   * @param state - The current state of the store.
   * @returns {modelTableModel} returns the modelTableModel
   */
  Models(state: State): modelTableModel;
  /**
   * เป็น Getter สำหรับ Get ข้อมูล dropdown model ใช้ตอน create bot ใน project
   * @param state - The current state of the store.
   * @returns {dropdownModelModel[]} returns the dropdownModelModel[]
   */
  DropdownModel(state: State): dropdownModelModel[];
  /**
   * เป็น Getter สำหรับ Get ข้อมูล dropdown type model ใช้ตอน create model
   * @param state - The current state of the store.
   * @returns {typeModelModel[]} returns the typeModelModel[]
   */
  TypeModels(state: State): typeModelModel[];
}
// NOTE : This is template of methods of exporting ---------------
export interface Actions {
  /**
   * เป็น Function ในการ ดึงข้อมูล models มาแสดงใน Table
   * @param {modelTableFilterModel} filter สำหรับ filter ข้อมูล
   * @returns { Promise<StoreRes<modelTableModel>>} สำหรับการ Return modelTableModel
   */
  GetModelTable(filter?: modelTableFilterModel): Promise<StoreRes<modelTableModel>>;

  /**
   * เป็น Function ในการสร้าง model
   * @param {modelCreateModel} ข้อมูลจาก form ของ model ที่ต้องการสร้าง
   * @returns { Promise<StoreRes<modelModel>>} สำหรับการ Return modelModel
   */
  CreateModel(payload: modelCreateModel): Promise<StoreRes<modelModel>>;
  /**
   * เป็น Function ในการ update ข้อมูล model
   * @param {string} ข้อมูลจาก form ของ model ที่ต้องการแก้ไข
   * @returns { Promise<StoreRes<modelModel>>} สำหรับการ Return modelModel
   */
  UpdateModel(payload: modelUpdateModel): Promise<StoreRes<modelModel>>;
  /**
   * เป็น Function ในการ delete model
   * @param {modelId: string} ข้อมูล model id ที่ต้องการลบ
   * @returns { Promise<StoreRes<string>>} สำหรับการ Return string
   */
  DeleteModel(modelId: string): Promise<StoreRes<string>>;
  /**
   * เป็น Function ในการ ดึงข้อมูล model Dropdown
   * @returns { Promise<StoreRes<dropdownModelModel[]>>} สำหรับการ Return dropdownModelModel[]
   */
  GetModelDropdown(): Promise<StoreRes<dropdownModelModel[]>>;
}

//  NOTE Type of module ---------------------------------------------

// get models
export type modelTableFilterModel = {
  page?: number;
  row?: number;
  keyword?: string;
};

export type modelModel = {
  modelId: string;
  name: string;
  uri: string;
  type: string | null;
  authorization: string;
  createDate: string;
  updateDate: string;
  default: boolean;
};
export type paginationModel = {
  page: number;
  row: number;
  total: number;
};
export type modelTableModel = {
  pagination: paginationModel;
  data: modelModel[];
};

export type modelResModel = {
  model_id: string;
  name: string;
  uri: string;
  type: string | null;
  authorization: string;
  create_date: string;
  update_date: string;
  default: boolean;
};
export type modelTableResModel = {
  pagination: paginationModel;
  data: modelResModel[];
};

// create
export type modelCreateModel = {
  name: string;
  uri: string;
  type: string | null;
  authorization: string;
  default?: boolean;
};
export type modelCreateReqModel = {
  name: string;
  uri: string;
  type: string | null;
  authorization: string;
  default?: boolean;
};
// update
export type modelUpdateModel = {
  modelId?: string;
  name: string;
  uri: string;
  type: string | null;
  authorization: string;
  default?: boolean;
};

export type modelUpdateReqModel = {
  name: string;
  uri: string;
  type: string | null;
  authorization: string;
  default?: boolean;
};

// get dropdown model
export type dropdownModelModel = {
  modelId: string;
  name: string;
  type: string | null;
  default: boolean;
};
export type dropdownModelResModel = {
  model_id: string;
  name: string;
  type: string | null;
  default: boolean;
};

//type model
export type typeModelModel = {
  value: string;
  text: string;
  description: string;
  status: boolean;
};
