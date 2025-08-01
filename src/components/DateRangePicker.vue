<script setup lang="ts">
import { ref, watch,computed } from 'vue'
import { DatePicker } from 'ant-design-vue'
import type { Dayjs } from 'dayjs'

const props = defineProps<{
  startDate?: Dayjs
  endDate?: Dayjs
  minDate?: Dayjs | null
  maxDate?: Dayjs | null
}>()

const emit = defineEmits<{
  (e: 'update:startDate', value?: Dayjs): void
  (e: 'update:endDate', value?: Dayjs): void
}>()

const localStartDate = ref<Dayjs | undefined>(props.startDate)
const localEndDate = ref<Dayjs | undefined>(props.endDate)

// แปลง minDate เป็น string หรือ fallback เป็นข้อความ placeholder ปกติ
const startPlaceholder = computed(() => {
  return props.minDate ? props.minDate.format('YYYY-MM-DD') : 'วันที่เริ่มต้น'
})

const endPlaceholder = computed(() => {
  return props.maxDate ? props.maxDate.format('YYYY-MM-DD') : 'วันที่สิ้นสุด'
})

watch(localStartDate, val => emit('update:startDate', val))
watch(localEndDate, val => emit('update:endDate', val))

// function clearDates() {
//   localStartDate.value = undefined
//   localEndDate.value = undefined
// }

// ฟังก์ชัน disable วันที่นอกช่วง
const disableStartDate = (current: Dayjs): boolean => {
  return !!props.minDate && current.isBefore(props.minDate, 'day')
}

const disableEndDate = (current: Dayjs): boolean => {
  return !!props.maxDate && current.isAfter(props.maxDate, 'day')
}

</script>

<template>
  <div class="date-range-picker">
    จาก
    <date-picker
      v-model:value="localStartDate"
      :placeholder="startPlaceholder"
      :allowClear="true"
      :disabledDate="disableStartDate"
      popupClassName="ct-date-picker"
      class="calendar-start"
      :showNow="false"
    />
    ถึง
    <date-picker
      v-model:value="localEndDate"
      :placeholder="endPlaceholder"
      :allowClear="true"
      :disabledDate="disableEndDate"
      popupClassName="ct-date-picker"
      class="calendar-end"
      :showNow="false"
    />
    <!-- <v-btn @click="clearDates">ล้างช่วงวันที่</v-btn> -->
  </div>
</template>

<style lang="scss" scoped>
.calendar-start{
  margin: 10px;
  margin: 10px;

}
.calendar-end{
  margin-left: 10px;
  // margin-right: 10px;
}
</style>
