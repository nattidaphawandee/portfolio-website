import { type _GettersTree } from 'pinia';
// NOTE : This is template of state ----------------------------
export interface State {
  model: boolean;
  optionsAlert: optionsModel;
  defaultOptionsAlert: optionsModel;
  resolve?: any;
}

// NOTE : This is template of getters ---------------------------
export interface Getters extends _GettersTree<State> {
  /**
   * เป็น Getter สำหรับ Get option alert
   * @param state - The current state of the store.
   * @returns {optionsModel} returns the optionsModel
   */
  OptionsAlert(state: State): optionsModel;
  /**
   * เป็น Getter สำหรับ Get model alert
   * @param state - The current state of the store.
   * @returns {boolean} returns the boolean
   */
  Model(state: State): boolean;
}

// NOTE : This is template of methods of exporting ---------------
export interface Actions {
  /**
   * เป็น Function set option open alert
   * @param {optionsModel} options alert
   */
  maAlert(options: optionsModel): Promise<any>;
  /**
   * เป็น Function for close dialog
   */
  closeAlert(): void;
  /**
   * เป็น Function for submit dialog
   */
  submitAlert(): void;
}

//  NOTE Type of module ---------------------------------------------

export type optionsModel = {
  persistent?: boolean;
  icon?: string;
  colorIcon?: string;
  sizeIcon?: string;
  title?: string;
  description?: string;
  // btn
  btnConfirm?:boolean;
  btnConfirmText?: string;
  btnConfirmColor?: string;
  btnCancel?:boolean;
  btnCancelText?: string;
  btnCancelColor?: string;
  autoClose?: boolean;
};
