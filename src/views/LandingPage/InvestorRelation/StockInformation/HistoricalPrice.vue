<template>
  <div>
    <div class="d-flex justify-center">
      ราคาย้อนหลัง (Historical Price)

    </div>
     <v-tabs bg-color="indigo-darken-2" fixed-tabs>
      <v-tab to="/StockInformation/stockQuote" text="ราคาหลักทรัพย์"></v-tab>

      <v-tab to="/StockInformation/historicalPrice" text="ราคาย้อนหลัง"></v-tab>
    </v-tabs>
    <!-- <router-view></router-view> -->
     <TableLandingPage/>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TableLandingPage from '@/components/landingpage/TableLandingPage.vue';

const route = useRoute();
const router = useRouter();

// ควบคุม tab ที่ active ตาม route ปัจจุบัน
const tab = ref(route.path);
// เริ่มต้น get ข้อมูล
// let rawData: any
// async function init() {
//     const res = await fetch('https://www.inetreit.com/stockservice/getStockNew/INETREIT.BK/28', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     });
//     const data = await res.json();
//     rawData = data;
//     console.log('ราคาย้อนหลัง (Historical Price')
//     console.log(rawData)
//     // return data;
// }
// init()

watch(() => route.path, (newPath) => {
  tab.value = newPath;
});

watch(tab, (newTab) => {
  if (newTab !== route.path) {
    router.push(newTab);
  }
});
</script>
