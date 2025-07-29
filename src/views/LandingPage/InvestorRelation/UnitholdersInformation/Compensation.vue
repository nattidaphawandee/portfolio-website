<template>
  <div>
    <div class="d-flex justify-center">
      จ่ายเงินปั่นผล
    </div>
    <!-- title -->
    <div>
      การจ่ายผลประโยชน์ตอบแทน
    </div>

    <!-- นโยบาย -->
    <div style="background-color: red;">
      <div>
        นโยบายการจ่ายผลประโยชน์ตอบแทน
      </div>
      <div>
        บริษัทฯ มีนโยบายจ่ายเงินปันผลให้แก่ผู้ถือหุ้นไม่น้อยกว่าร้อยละ 90 ของกำไรสุทธิที่ปรับปรุงแล้วของรอบปีบัญชี
        หลังการจัดสรรทุนสำรองต่างๆ ทุกประเภท และขึ้นอยู่กับแผนการลงทุน ความจำเป็น กฎหมายที่เกี่ยวข้องและข้อพิจารณา อื่นๆ
        ที่เกี่ยวข้อง อย่างไรก็ตาม อัตราการจ่ายเงินปันผลที่แท้จริงอาจมีความแตกต่าง โดยอาจสูงหรือต่ำกว่าอัตราที่กำหนดไว้
        ในนโยบายดังกล่าวข้างต้น ซึ่งขึ้นอยู่กับปัจจัยความเสี่ยงเรื่องต่างๆ
      </div>
    </div>

    <!-- การจ่ายผลประโยชน์ตอบแทน -->
    <div>
      <div>
        การจ่ายผลประโยชน์ตอบแทน
      </div>
      <!-- box -->
      <div style="background: yellow; padding: 5px;">
          <cardBox />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Spin } from 'ant-design-vue';
import cardBox from '@/components/cardBox.vue';
import compenstaionChart from '@/components/landingpage/compenstaionChart.vue';

// get ข้อมูลเงินปันผล
let dividendsData: any
//จำนวนการจ่ายทั้งหมด
let paymentFrequency: any
//มูลค่ารวมทั้งสิ้น
let totalValue: any

async function init() {
  const res = await fetch('/api/dividendes', {
    method: 'GET',
  });
  const data = await res.json();
  dividendsData = data;
  paymentFrequency = dividendsData.length
  totalValue = 23099012
  console.log(totalValue)

  // console.log(paymentFrequency)
  return data;
}

await init()
</script>
<style scoped lang="scss">
// .box-three {
//   background: brown;
//   max-width: 405.67px;

//   width: 100%;
//   height: 131px;
//   margin: 3px;
//   // display: flex;
//   display: flex;
//   flex-wrap: wrap;
//   align-content: space-between;
//   // background: #FFFFFF;
// }

.box-three {
   display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 400px;
  height: 300px;
  align-content: space-between;
  border: 2px dotted rgb(96 139 168);
}
.icon-loading {
  font-size: 70px;
  color: rgba(var(--v-theme-primary));
}

.text-loading {
  text-align: center;
  color: rgba(var(--v-theme-primary));
}
</style>
