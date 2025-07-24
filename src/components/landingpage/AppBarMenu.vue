<script setup lang="ts">
import { ref } from 'vue';
// import Logo from '@/layouts/full/logo/LogoMain.vue';
import { useDisplay } from 'vuetify';
import { HomeIcon } from 'vue-tabler-icons';

const { mdAndUp } = useDisplay();
const drawer = ref(false);
</script>

<template>
  <v-app-bar elevation="0" flat height="145" class="border-bottom position-fixed">
    <v-container class="fill-height maxWidth">
      <div class="d-flex align-center ga-10 w-100" >
     
        <!---/Search part -->
        <!-- <v-spacer /> -->
        <template v-if="mdAndUp">
          <v-btn variant="text" color="primary" to="/"> หน้าหลัก </v-btn>
          <v-btn variant="text" to="/dashboard/default"> เกี่ยวกับเรา </v-btn>
          <v-btn variant="text" href="https://codedthemes.gitbook.io/berry-vuetify/"> การบริหารจัดการ </v-btn>
          <v-btn variant="text" color="primary" to="/"> 
            ทรัพย์สินที่ลงทุน
          </v-btn>
           <v-btn variant="text" color="primary" to="/"> 
            นักลงทุนสัมพันธ์
          </v-btn>
          <v-btn variant="text" color="primary" to="/"> 
            ห้องข่าว
          </v-btn>
          <v-btn variant="text" color="primary" to="/"> 
            ติดต่อเรา
          </v-btn>
        </template>
        <template v-else>
          <v-btn color="lightsecondary" icon rounded="sm" variant="flat" size="small" @click="drawer = true">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
      </div>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer v-if="!mdAndUp" v-model="drawer"  class="right-sidebar" location="right" floating>
    <v-list color="primary">
      <v-list-item to="/">
         <v-icon>mdi-home</v-icon>

        <v-list-item-title class="ml-3"> Home </v-list-item-title>
      </v-list-item>
      <v-list-item to="/dashboard/default">
        <v-icon>mdi-arrow-up</v-icon>

        <v-list-item-title class="ml-3"> Dashboard </v-list-item-title>
      </v-list-item>
      <v-list-item href="https://codedthemes.gitbook.io/berry-vuetify/">
         <v-icon>mdi-arrow-up</v-icon>

        <v-list-item-title class="ml-3"> Documentation </v-list-item-title>
      </v-list-item>
      <v-list-item href="https://vuetifyjs.com">
          <v-icon>mdi-arrow-up</v-icon>
        <v-list-item-title class="ml-3" to="https://store.vuetifyjs.com/products/berry-vuetify-admin-template">
          Purchase Now
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<style lang="scss">
.right-sidebar {
  &.v-navigation-drawer--active {
    position: fixed !important;
  } 
}
</style>