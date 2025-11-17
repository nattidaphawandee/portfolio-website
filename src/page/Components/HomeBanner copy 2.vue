<script setup>
import { shallowRef } from 'vue';
// import SvgSprite from '@/components/shared/SvgSprite.vue';
// assets
import HomePortfolioLanding from '@/assets/images/porfolioMain.svg'
import WorkImage from '@/assets/images/work.svg'
const educationList = [
  {
    title: 'ปริญญาวิศวกรรมศาสตรบัณฑิต (วศ.บ.) สาขาวิศวกรรมคอมพิวเตอร์',
    detail: 'ภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเชียงใหม่',
  },
  {
    title: 'มัธยมศึกษาตอนปลาย (แผนวิทย์-คณิต)',
    detail: 'โรงเรียนนวมินทราชินูทิศ บดินทรเดชา',
  },
  {
    title: 'ประถมศึกษาและมัธยมต้น',
    detail: 'โรงเรียนถนอมพิศวิทยา',
  },
]

const workList = [
  {
    company: 'บริษัท อินเทอร์เน็ตประเทศไทย จำกัด (มหาชน)',
    position: 'Software Engineer (Vue.js, TypeScript, Golang)',
    details: [
      'พัฒนาและดูแลระบบ Front-end ด้วย Vue.js และ TypeScript',
      'ออกแบบ UI ที่ตอบโจทย์ประสบการณ์ผู้ใช้',
      'ทำงานร่วมกับทีมออกแบบและ Back-end เพื่อให้ระบบทำงานสมบูรณ์',
      'เขียน API และจัดการข้อมูลเบื้องต้นด้วย Golang และ Firebase',
    ],
  },
]
</script>

<template>
  <div>
    <v-container class="maxWidth">
      <v-row class="justify-center align-center mt-2">
        <!-- Left Section -->
        <v-col md="6" cols="12" class="order-md-0 order-0" style="background: red;">
          <!-- Education -->
          <section class="mb-8">
            <h5 class="text-sm-h1 text-h2 font-weight-medium mb-2" style="line-height: 1.2">
              Education
            </h5>
            <v-list bg-color="containerBg">
              <v-list-item v-for="(edu, index) in educationList" :key="'edu-' + index">
                <div class="font-weight-medium">
                  <v-icon class="mr-1">mdi-school</v-icon>
                  {{ edu.title }}
                </div>
                <div class="px-10">{{ edu.detail }}</div>
              </v-list-item>
            </v-list>
          </section>

          <!-- Work Experience -->
          <section>
            <h5 class="text-sm-h1 text-h2 font-weight-medium mb-2" style="line-height: 1.2">
              ประวัติการทำงาน
            </h5>
            <h6 class="text-h4 font-weight-regular mb-3">
              ประสบการณ์การทำงานในสายพัฒนาโปรแกรม โดยเฉพาะด้าน Front-end
            </h6>

            <v-list bg-color="containerBg">
              <v-list-item v-for="(work, index) in workList" :key="'work-' + index">
                <div class="font-weight-medium">
                  <v-icon>mdi-briefcase</v-icon>
                  {{ work.company }}
                </div>
                <div>{{ work.position }}</div>
                <ul class="mt-2 ml-4">
                  <li v-for="(item, idx) in work.details" :key="idx">{{ item }}</li>
                </ul>
              </v-list-item>
            </v-list>
          </section>
        </v-col>

        <!-- Right Image -->
        <!-- <v-col md="5" cols="12" offset-lg="1" class="order-md-3 order-1">
          <v-row class="justify-center">
            <v-col md="12" sm="6" cols="9">
              <v-img 
              :src="WorkImage" 
              alt="Profile Image or Work Showcase" 
              max-height="600"
              height="100%"
              width="auto"
              />
            </v-col>
          </v-row>
        </v-col> -->
        <v-row class="justify-center align-center">
          <v-col md="6" cols="12" class="text-center position-relative">
            <v-img
              :src="WorkImage"
              alt="Profile Image"
              max-width="320"
              width="100%"
              class="mx-auto"
            />

            <!-- Gear Icon -->
            <v-icon
              icon="mdi-cog"
              size="48"
              class="gear-icon d-none d-md-block"
            />
          </v-col>
        </v-row>

      </v-row>
    </v-container>
  </div>
</template>
<style scoped>
.gear-icon {
  position: absolute;
  top: 50%;
  right: 10%;
  color: #666;
  animation: spin 3s linear infinite;
  transform: translateY(-50%);
}

@keyframes spin {
  0% {
    transform: rotate(0deg) translateY(-50%);
  }
  100% {
    transform: rotate(360deg) translateY(-50%);
  }
}
@media (max-width: 600px) {
  .gear-icon {
    display: none !important;
  }
}
@keyframes dropIn {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
