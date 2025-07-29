import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { createI18n } from 'vue-i18n';
import messages from'@/utils/locales/messages';

const i18n = createI18n({
  locale: 'th',    
  messages: messages,              // กำหนดภาษาหลัก (ภาษาเริ่มต้น) เป็น 'en' (อังกฤษ)
  silentTranslationWarn: true,  // ปิดการแจ้งเตือนเวลาหากข้อความแปลไม่พบ (ไม่ให้ขึ้น warning ใน console)
  silentFallbackWarn: true      // ปิดการแจ้งเตือนเมื่อ fallback ไปใช้ภาษาสำรอง (fallback locale) หากข้อความแปลไม่พบในภาษาหลัก
});


dayjs.extend(utc);
import 'ant-design-vue/dist/reset.css';
// import 'ag-grid-community/styles/ag-grid.css'
// import 'ag-grid-community/styes/ag-theme-alpine.css'

const app = createApp(App);
app.use(createPinia());
app.use(i18n);
app.use(PerfectScrollbarPlugin);
app.use(router);
app.use(vuetify);
app.mount('#app');
