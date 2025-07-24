import { type _GettersTree } from 'pinia';
import { type StoreRes } from '@/types/GlobalType';
// NOTE : This is template of state ----------------------------
export interface State {}
// NOTE : This is template of getters ---------------------------
export interface Getters extends _GettersTree<State> {}
// NOTE : This is template of methods of exporting ---------------
export interface Actions {
  /**
   * เป็น Function ในการ return url
   * @param {filename:string} filename ที่ต้องการดึง
   * @returns { string } สำหรับการ return url
   */
  ReturnUrlFile(filename?: string): string;
  /**
   *   /**
   * เป็น Function ในการ return url image+AccessToken
   * @param {filename:string} filename ที่ต้องการดึง
   * @returns { string } สำหรับการ return url
   */
  ReturnUrlFileProfile(filename?: string): string;
  /**
   * เป็น Function ในการ upload file
   * @param {file} formData.append('file',file )
   * @returns { uploadFileModel } สำหรับการ return uploadFileModel
   */
  UploadFile(file: any): Promise<StoreRes<uploadFileModel>>;
}
//  NOTE Type of module ---------------------------------------------

export type uploadFileModel = {
  file: string;
  prefix: string;
  filename: string;
};
export type uploadFileResModel = {
  file: string;
  prefix: string;
  filename: string;
};
