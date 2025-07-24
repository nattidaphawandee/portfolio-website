import { type _GettersTree } from 'pinia';
import { type StoreRes } from '@/types/GlobalType';

// NOTE : This is template of state ----------------------------
export interface State {
  stockinet: string[];

}

// NOTE : This is template of getters ---------------------------
export interface Getters extends _GettersTree<State> {
  Stockinet(state: State): string[];
}

// NOTE : This is template of methods of exporting ---------------
export interface Actions {
      GetStockNew(): Promise<string[]>;

    // GetStockNew(): Promise<StoreRes<string[]>>;

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

// export type projectTableFilterModel = {
//   page?: number;
//   row?: number;
//   keyword?: string;
// };
