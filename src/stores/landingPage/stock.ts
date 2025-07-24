// ข้อมูลหุ้น stock 
// TODO เก็ขข้อมูลของ projects ทั้งหมด
import { defineStore } from 'pinia';
import axios from '@/utils/axios';
import type { Res } from '@/types/GlobalType';
import type {
  Actions,
  Getters,
  State,

} from '@/types/landingPage/StockType';
export const useStockStore = defineStore<'alert', State, Getters, Actions>({
  id: 'alert',
  state: () => ({
    stockinet: []
  }),
  getters: {
    Stockinet(state: State) {
          return state.stockinet;
        }
  },
  actions: {
        async GetStockNew() {
          const res = await axios<string[]>({
            url: `https://www.inetreit.com/stockservice/getStockNew/INETREIT.BK/10`,
            method: 'post',
          });
          let stockinetvalue: string[] = [];
          stockinetvalue = res;
        // stockinetvalue = res.data;
        //   this.stockinet = stockinetvalue
          console.log(res)
          return res ;
        },
  }
});
