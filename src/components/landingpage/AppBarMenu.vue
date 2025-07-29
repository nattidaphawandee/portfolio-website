<script setup lang="ts">
import { ref } from 'vue';
import InetReitLogo from '@/assets/images/InetReit.png'
import { useDisplay } from 'vuetify';
// import MobileMenu from './MobileMenu.vue';
// import { menuItems } from './menuData';
import DesktopMenu from './DesktopMenu.vue'
import MobileMenu from './MobileMenu.vue'
import { icons } from '@/plugins/mdi-icon';

import LanguageDD from '@/layouts/LanguageDD.vue';

const { mdAndUp } = useDisplay();
const drawer = ref(false);

// const menuItems = [
//   {
//     title: 'หน้าหลัก',
//     to: '/',
//     icon: 'mdi-home',
//   },
//   {
//     title: 'เกี่ยวกับเรา',
//     icon: 'mdi-information-outline',
//     children: [
//       { title: 'ข้อมูลทั่วไป', to: '/aboutUs/overview' },
//       { title: 'โครงสร้างกองทรัสต์', to: '/aboutUs/board' },
//       { title: 'Milestone', to: '/aboutUs/policy' },
//     ]
//   },
//   {
//     title: 'การบริหารจัดการ',
//     icon: 'mdi-cog-outline',
//     children: [
//       { title: 'ผู้จัดการกองทรัสต์', to: '/management/manager' },
//       { title: 'โครงสร้างองค์กร', to: '/management/structure' },
//       { title: 'คณะกรรมการบริษัท', to: '/management/managementTeam' },
//       { title: 'คณะผู้บริหาร', to: '/management/board' },
//     ]
//   },
//   {
//     title: 'ทรัพย์สินที่ลงทุน',
//     icon: 'mdi-domain',
//     children: [
//       { title: 'ทรัพย์สินที่ลงทุน', to: '/assets/invested' },
//     ]
//   },
//   {
//     title: 'นักลงทุนสัมพันธ์',
//     icon: 'mdi-chart-line',
//     children: [
//       {
//         group: 'ข้อมูลการเงิน',
//         children: [
//           { title: 'งบการเงิน', to: '/financial/financial-statement' },
//           { title: 'มูลค่าทรัพย์สินสุทธิ (NAV)', to: '/financial/nav' },
//         ]
//       },
//       {
//         group: 'ข้อมูลราคาหลักทรัพย์',
//         children: [
//           // { title: 'ราคาหลักทรัพย์', to: '/price/current' },
//           { title: 'ราคาหลักทรัพย์', to: '/StockInformation/stockQuote' },
//           { title: 'ราคาย้อนหลัง', to: '/StockInformation/historicalPrice' },
//         ]
//       },
//       {
//         group: 'ข้อมูลผู้ถือหน่วยทรัสต์',
//         children: [
//           { title: 'โครงสร้างผู้ถือหน่วย', to: '/unitholdersInformation/UnitholdersStructure' },
//           { title: 'การประชุมผู้ถือหน่วย', to: '/unitholdersInformation/UnitholdersMeeting' },
//           { title: 'การจ่ายเงินปันผล', to: '/unitholdersInformation/compensation' },
//         ]
//       },
//       {
//         group: 'เอกสารเผยแพร่',
//         children: [
//           { title: 'รายงานประจำปี และแบบ 56-REIT', to: '/documents/annual' },
//           { title: 'รายงานการประเมินมูลค่าทรัพย์สิน', to: '/documents/appraisalReport' },
//           { title: 'หนังสือชี้ชวน', to: '/documents/prospectus' },
//           { title: 'เอกสารสำหรับนักลงทุน', to: '/documents/investor' },
//         ]
//       }
//     ]
//   },
//   {
//     title: 'ห้องข่าว',
//     icon: 'mdi-newspaper',
//     children: [
//       { title: 'ข่าวแจ้งตลาดหลักทรัพย์', to: '/news/setAnnouncements' },
//       { title: 'ข่าวประชาสัมพันธ์', to: '/news/OtherNews' },
//     ]
//   },
//   {
//     title: 'ติดต่อเรา',
//     to: '/contact',
//     icon: 'mdi-phone'
//   }
// ];

const menuItems = [
  // {
  //   title: 'หน้าหลัก',
  //   to: '/',
  //   icon: 'mdi-home',
  // },
    { title: 'menu.home', to: '/', icon: 'mdi-home' },

  {
    title: 'เกี่ยวกับเรา',
    icon: 'mdi-information-outline',
    children: [
      { title: 'ข้อมูลทั่วไป', to: '/aboutUs/overview' },
      { title: 'โครงสร้างกองทรัสต์', to: '/aboutUs/board' },
      { title: 'Milestone', to: '/aboutUs/policy' },
    ]
  },
  {
    title: 'การบริหารจัดการ',
    icon: 'mdi-cog-outline',
    children: [
      { title: 'ผู้จัดการกองทรัสต์', to: '/management/manager' },
      { title: 'โครงสร้างองค์กร', to: '/management/structure' },
      { title: 'คณะกรรมการบริษัท', to: '/management/managementTeam' },
      { title: 'คณะผู้บริหาร', to: '/management/board' },
    ]
  },
  {
    title: 'ทรัพย์สินที่ลงทุน',
    icon: 'mdi-domain',
    children: [
      { title: 'ทรัพย์สินที่ลงทุน', to: '/assets/invested' },
    ]
  },
  {
    title: 'นักลงทุนสัมพันธ์',
    icon: 'mdi-chart-line',
    children: [
      {
        group: 'ข้อมูลการเงิน',
        children: [
          { title: 'งบการเงิน', to: '/financial/financial-statement' },
          { title: 'มูลค่าทรัพย์สินสุทธิ (NAV)', to: '/financial/nav' },
        ]
      },
      {
        group: 'ข้อมูลราคาหลักทรัพย์',
        children: [
          // { title: 'ราคาหลักทรัพย์', to: '/price/current' },
          { title: 'ราคาหลักทรัพย์', to: '/StockInformation/stockQuote' },
          { title: 'ราคาย้อนหลัง', to: '/StockInformation/historicalPrice' },
        ]
      },
      {
        group: 'ข้อมูลผู้ถือหน่วยทรัสต์',
        children: [
          { title: 'โครงสร้างผู้ถือหน่วย', to: '/unitholdersInformation/UnitholdersStructure' },
          { title: 'การประชุมผู้ถือหน่วย', to: '/unitholdersInformation/UnitholdersMeeting' },
          { title: 'การจ่ายเงินปันผล', to: '/unitholdersInformation/compensation' },
        ]
      },
      {
        group: 'เอกสารเผยแพร่',
        children: [
          { title: 'รายงานประจำปี และแบบ 56-REIT', to: '/documents/annual' },
          { title: 'รายงานการประเมินมูลค่าทรัพย์สิน', to: '/documents/appraisalReport' },
          { title: 'หนังสือชี้ชวน', to: '/documents/prospectus' },
          { title: 'เอกสารสำหรับนักลงทุน', to: '/documents/investor' },
        ]
      }
    ]
  },
  {
    title: 'ห้องข่าว',
    icon: 'mdi-newspaper',
    children: [
      { title: 'ข่าวแจ้งตลาดหลักทรัพย์', to: '/news/setAnnouncements' },
      { title: 'ข่าวประชาสัมพันธ์', to: '/news/OtherNews' },
    ]
  },
  {
    title: 'ติดต่อเรา',
    to: '/contact',
    icon: 'mdi-phone'
  }
];
</script>
<template>
  <v-app-bar elevation="0" flat height="145" class="border-bottom position-fixed" style="background: palegreen;">
    <v-container class="fill-height maxWidth d-flex flex-column justify-center">
      
      <div
        v-if="!mdAndUp"
        style="background: pink; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0 16px;"
      >
        <img :src="InetReitLogo" height="45" />
        <v-btn icon variant="flat" color="lightsecondary" size="small" @click="drawer = true">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </div>

      <div
        v-else
        style="background: pink; width: 100%; display: flex; justify-content: center; align-items: center;"
      >
        <img :src="InetReitLogo" height="45" />
          <LanguageDD />
      </div>

      <div class="d-flex align-center ga-10 w-100">
        <template v-if="mdAndUp">
          <DesktopMenu :items="menuItems" />
        </template>
      </div>
    </v-container>
  </v-app-bar>

  <!-- 👇 Drawer ซ้อนทับ AppBar -->
  <v-navigation-drawer
    v-if="!mdAndUp"
    v-model="drawer"
    class="left-sidebar"
    location="left"
    floating
    style="position: fixed; top: 0; left: 0; z-index: 2000; height: 100%;"
    temporary
  >
    <MobileMenu :items="menuItems" @close="drawer = false" />
  </v-navigation-drawer>
</template>

<style scoped>
.left-sidebar {
  z-index: 2000;
}
</style>
