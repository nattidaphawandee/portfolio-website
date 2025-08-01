<template>
  <div>
    <div class="d-flex justify-center">
      ราคาหลักทรัพย์ (stock quote)
    </div>
    <v-tabs bg-color="indigo-darken-2" fixed-tabs>
      <v-tab to="/StockInformation/stockQuote" text="ราคาหลักทรัพย์"></v-tab>

      <v-tab to="/StockInformation/historicalPrice" text="ราคาย้อนหลัง"></v-tab>
    </v-tabs>
    <div>
      <HistoricalPriceChart></HistoricalPriceChart>
    </div>
  </div>
</template>

<script setup lang="ts">
import HistoricalPriceChart from '@/components/landingpage/HistoricalPriceChart.vue';

</script>
<style scoped lang="scss">
.icon-loading {
  font-size: 70px;
  color: rgba(var(--v-theme-primary));
}

.text-loading {
  text-align: center;
  color: rgba(var(--v-theme-primary));
}
</style>
