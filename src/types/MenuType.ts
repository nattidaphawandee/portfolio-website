import { type _GettersTree } from 'pinia'
import { type StoreRes } from '@/types/GlobalType'
// NOTE : This is template of state ----------------------------
export interface State {
    menusNavigation: menuModel[] // TODO สำหรับเก็บ Menu เพื่อทำ Navigation
}

// NOTE : This is template of getters ---------------------------
export interface Getters extends _GettersTree<State> {
    /**
     * เป็น Getter สำหรับ Navigation Menu
     * @param state - The current state of the store.
     * @returns {menuModel[]} returns the menuModel[]
     */
    MenusNavigation(state: State): menuModel[]
}

// NOTE : This is template of methods of exporting ---------------
export interface Actions {
    /**
     * เป็น Function ในการ ดึงข้อมูล menu เพื่อทำ Navigations
     * @returns { Promise<StoreRes<menuModel[]>>} สำหรับการ Return menuModel[]
     */
    GetMenusNavigation(permission:number): Promise<StoreRes<menuModel[]>>
}

//  NOTE Type of module ---------------------------------------------

export interface menuModel extends createMenuReqModel {
    menuId: string
    to: toModel
    index: number
    createBySystem: boolean
    items: menuModel[] // Assuming items can contain nested MenuModel objects
    type?: string
    disabled?: boolean
}
export type toModel = {
    name: string
}
export type createMenuReqModel = {
    name: string
    text: string
    path: string
    icon: string
    description: string
}
export type menuResModel = {
    menu_id: string
    name: string
    text: string
    path: string
    icon: string
    description: string
    index: number
    create_by_system: boolean
    items: menuResModel[] // Assuming items can contain nested MenuModel objects
}

// set sub menu Navigation
export type subMenuItemsModel = {
  parentID: string;
  subMenus: menuModel[];
};

export interface setSubMenuItemsModel extends subMenuItemsModel {
  menusAll: menuModel[];
}

// clear sub menu Navigation
export type clearMenuItemsModel = {
  parentID: string;
  menusAll: menuModel[];
};