import { type _GettersTree } from 'pinia';
// import {type StoreRes} from '@/types/GlobalType';
// NOTE : This is template of state ----------------------------
export interface State {
  slidesLoginContent:aboutService[]
}

// NOTE : This is template of getters ---------------------------
export interface Getters extends _GettersTree<State> {
  /**
   * เป็น Getter สำหรับ Get ข้อมูล content แสดงบน slides หน้า login
   * @param state - The current state of the store.
   * @returns {aboutService} returns the text all model
   */
  SlidesLoginContent(state: State): aboutService[];
}

// NOTE : This is template of methods of exporting ---------------
export interface Actions {}

//  NOTE Type of module ---------------------------------------------

export type aboutService = {
  title:string;
  description:string;
}




