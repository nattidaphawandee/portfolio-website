<template>
  <v-data-table
  :headers="headers"
  :items="tableItems"
  class="elevation-1"
  item-value="date"
  @click:row="toggleRow"
>
  <template #top>
    <v-toolbar flat>
      <v-toolbar-title>ข้อมูลหุ้น INETREIT</v-toolbar-title>
    </v-toolbar>
  </template>

  <!-- Custom row -->
  <template #item="{ item }">
    <tr
      :class="selectedDate === item.date ? 'selected-row' : ''"
      @click="toggleRow($event, { item })"
    >
      <td>{{ item.date }}</td>
      <td>{{ item.open }}</td>
      <td>{{ item.high }}</td>
      <td>{{ item.low }}</td>
      <td>{{ item.close }}</td>
      <td :style="{ color: getChangeColor(item.changePercent) }">
        {{ item.changePercent }}%
      </td>
      <td>{{ item.volume }}</td>
      <td>{{ item.valueMB.toFixed(2) }}</td>
    </tr>
  </template>
</v-data-table>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const headers = [
  { title: 'วันที่', key: 'date' },
  { title: 'ราคาเปิด', key: 'open' },
  { title: 'ราคาสูงสุด', key: 'high' },
  { title: 'ราคาต่ำสุด', key: 'low' },
  { title: 'ราคาปิด', key: 'close' },
  { title: 'เปลี่ยนแปลง (%)', key: 'changePercent' },
  { title: 'ปริมาณซื้อขาย (หุ้น)', key: 'volume' },
  { title: 'มูลค่า (ล้านบาท)', key: 'valueMB' },
];

// แถวที่ถูกเลือก
const selectedDate = ref<string | null>(null);

// toggle highlight row
function toggleRow(event: Event, { item }: any) {
  console.log(item)
  selectedDate.value = selectedDate.value === item.date ? null : item.date;
}


// กำหนดสีของ % การเปลี่ยนแปลง
function getChangeColor(percent: number) {
  if (percent > 0) return 'green';
  if (percent < 0) return 'red';
  return 'black';
}

const tableItems = ref<any[]>([]);

// คำนวณข้อมูลเพื่อใช้ในตาราง
async function init() {
  const res = await fetch('https://www.inetreit.com/stockservice/getStockNew/INETREIT.BK/28', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const rawData = await res.json();

  const processed = rawData.map((item: any, index: number, array: any[]) => {
    let changePercent = 0;

    if (index > 0) {
      const prevClose = array[index - 1].close;
      changePercent = ((item.close - prevClose) / prevClose) * 100;
    }

    const valueMB = (item.volume * item.close) / 1_000_000;

    return {
      date: item.date,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      changePercent: + changePercent.toFixed(2),
      volume: item.volume,
      valueMB,
    };
  });

  tableItems.value = processed;
}

init();
</script>

<style scoped>
.v-data-table tr:hover {
  cursor: pointer; 
}
.selected-row {
  background-color: #e0e0e0 !important; /* สีเทา */
}
</style>
