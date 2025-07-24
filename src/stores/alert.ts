// TODO เก็ขข้อมูลของ alert ทั้งหมด
import { defineStore } from 'pinia';
import type { Actions, Getters, State, optionsModel } from '@/types/AlertType';

export const useAlertStore = defineStore<'alert', State, Getters, Actions>({
  id: 'alert',
  state: () => ({
    model: false,
    optionsAlert: {
      persistent: true,
      icon: 'mdi-information',
      colorIcon: 'primary',
      sizeIcon: '100',
      title: '',
      description: '',
      btnConfirm: true,
      btnConfirmText: 'ตกลง',
      btnCancelText: 'ยกเลิก',
      btnCancel: true,
      btnCancelColor: 'error',
      btnConfirmColor: 'primary',
      autoClose: false
    },
    defaultOptionsAlert: {
      persistent: true,
      icon: 'mdi-information',
      colorIcon: 'primary',
      sizeIcon: '100',
      title: '',
      description: '',
      btnConfirm: true,
      btnConfirmText: 'ตกลง',
      btnCancelText: 'ยกเลิก',
      btnCancel: true,
      btnCancelColor: 'error',
      btnConfirmColor: 'primary',
      autoClose: false
    }
  }),
  getters: {
    OptionsAlert(state: State) {
      return state.optionsAlert;
    },
    Model(state: State) {
      return state.model;
    }
  },
  actions: {
    async maAlert(options: optionsModel) {
      return new Promise((resolve) => {
        this.model = true;
        Object.assign(this.optionsAlert, { ...this.defaultOptionsAlert, ...options });
        this.resolve = resolve;
        if (options.autoClose === true) {
          setTimeout(() => {
            this.closeAlert();
          }, 3000);
        }
      });
    },
    closeAlert() {
      this.model = false;
      this.resolve({ status: 'close' });
    },
    submitAlert() {
      this.model = false;
      this.resolve({ status: 'submit' });
    }
  }
});
