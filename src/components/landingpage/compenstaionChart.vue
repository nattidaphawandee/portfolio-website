<template>
  <!-- ต้องมี template หรืออย่างน้อยก็ render function -->
  <div>Chart here</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { useStockStore } from '@/stores/landingPage/stock'
const stock = useStockStore();

// let dividendsData: any
// async function init() {
//     const res = await fetch('/api/dividendes', {
//         method: 'GET',
//     });
//     const data = await res.json();
//     dividendsData = data;
//     console.log(dividendsData)
//     return data;
// }

// await init()
// onMounted(async () => {
//     await init()
// })

</script>

<style>
.highcharts-range-input {
    border: 1px solid #fd2222 !important;
    /* Tailwind gray-700 */
    border-radius: 4px;
    padding: 4px 8px;
    background-color: #fff;
    font-size: 14px;
    color: #111827;
    /* Tailwind gray-900 */
}
</style>
