<template>

  <v-data-table :headers="headers" :items="filteredItems" class="elevation-1" item-value="date" @click:row="toggleRow">

    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>ข้อมูลหุ้น INETREIT</v-toolbar-title>
      </v-toolbar>
      <div style="background: pink; display: flex; justify-content: space-between; align-items: center;">
        <div style="font-size: 24px;">
          ราคาย้อนหลัง
        </div>
         <DateRangePicker 
        :startDate="startDate" 
        :endDate="endDate" 
        :minDate="minDate" 
        :maxDate="maxDate"
        @update:startDate="startDate = $event" 
        @update:endDate="endDate = $event" 
      />
      </div>
    </template>

    <!-- Custom row -->
    <template #item="{ item }">
      <tr :class="selectedDate === item.date ? 'selected-row' : ''" @click="toggleRow($event, { item })">
        <td>{{ item.date }}</td>
        <td>{{ item.open }}</td>
        <td>{{ item.high }}</td>
        <td>{{ item.low }}</td>
        <td>{{ item.close }}</td>
        <td :style="{
          color: selectedDate === item.date ? getChangeColor(item.changePercent) : 'black',
          backgroundColor: selectedDate === item.date ? getChangeBgColor(item.changePercent) : 'transparent'
        }">
          {{ item.changePercent }}%
        </td>
        <td>{{ item.volume }}</td>
        <td>{{ item.valueMB.toFixed(2) }}</td>
      </tr>
    </template>
  </v-data-table>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { DatePicker } from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import DateRangePicker from '../DateRangePicker.vue';
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
  // console.log(item)
  selectedDate.value = selectedDate.value === item.date ? null : item.date;
}
const startDate = ref<Dayjs | undefined>(undefined);
const endDate = ref<Dayjs | undefined>(undefined);
const minDate = ref<Dayjs | null>(null)
const maxDate = ref<Dayjs | null>(null)

// เปิดใช้งาน plugin ที่จำเป็น
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

// ฟิลเตอร์ข้อมูลตามช่วงวันที่
const filteredItems = computed(() => {
  if (!startDate.value || !endDate.value) {
    return tableItems.value;
  }

  return tableItems.value.filter(item => {
    const itemDate = dayjs(item.date, 'YYYY-MM-DD');
    return itemDate.isSameOrAfter(startDate.value, 'day') &&
      itemDate.isSameOrBefore(endDate.value, 'day');
  });
});
// กำหนดสีของ % การเปลี่ยนแปลง
function getChangeColor(percent: number) {
  // if (percent > 0) return 'green';
  // if (percent < 0) return 'red';
  // return 'black';
  if (percent > 0 || percent < 0) return 'white';
  return 'black';
}
// สีพื้นหลังของ cell เปลี่ยนแปลง (%)
function getChangeBgColor(percent: number) {
  if (percent > 0) return '#59CE80'; // เขียวอ่อน
  if (percent < 0) return '#EA4B4B'; // แดงอ่อน
  // return '#f5f5f5'; // เทาอ่อน
  return ''; // เทาอ่อน
}

const tableItems = ref<any[]>([]);

// คำนวณข้อมูลเพื่อใช้ในตาราง
async function init() {
  const res = await fetch('https://www.inetreit.com/stockservice/getStockNew/INETREIT.BK/49', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })

  const rawData = await res.json()

  // กำหนด min/max date จากข้อมูลจริง
  const firstDate = rawData[0]?.date
  const lastDate = rawData[rawData.length - 1]?.date
  minDate.value = dayjs(firstDate, 'YYYY-MM-DD')
  maxDate.value = dayjs(lastDate, 'YYYY-MM-DD')

  const processed = rawData.map((item: any, index: number, array: any[]) => {
    let changePercent = 0
    if (index > 0) {
      const prevClose = array[index - 1].close
      changePercent = ((item.close - prevClose) / prevClose) * 100
    }

    const valueMB = (item.volume * item.close) / 1_000_000
    return {
      date: item.date,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      changePercent: +  changePercent.toFixed(2),
      volume: item.volume,
      valueMB
    }
  })

  tableItems.value = processed
}

init();
</script>

<style scoped>
.v-data-table tr:hover {
  cursor: pointer;
}

.selected-row {
  background-color: #e0e0e0 !important;
  /* สีเทา */
}
</style>