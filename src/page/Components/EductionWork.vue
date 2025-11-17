<script setup>
import { shallowRef } from 'vue';
// import SvgSprite from '@/components/shared/SvgSprite.vue';
// assets
import HomePortfolioLanding from '@/assets/images/porfolioMain.svg'
import WorkImage from '@/assets/images/work.svg'
import heartStickers from '@/assets/images/stickers/heart.svg'
import ideaStickers from '@/assets/images/stickers/idea.svg'
import codeStickers from '@/assets/images/stickers/code.svg'
import fireFolderStickers from '@/assets/images/stickers/fireFolder.svg'
const educationList = [
  {
    title: 'ปริญญาวิศวกรรมศาสตรบัณฑิต (วศ.บ.) สาขาวิศวกรรมคอมพิวเตอร์',
    detail: 'ภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเชียงใหม่',
  },
  {
    title: 'มัธยมต้นและมัธยมศึกษาตอนปลาย (แผนวิทย์-คณิต)',
    detail: 'โรงเรียนนวมินทราชินูทิศ บดินทรเดชา',
  },
  {
    title: 'ประถมศึกษา',
    detail: 'โรงเรียนถนอมพิศวิทยา',
  },
]

const workList = [
  {
    company: 'บริษัท อินเทอร์เน็ตประเทศไทย จำกัด (มหาชน) ตั้งแต่ 2566 - ปัจจุบัน',
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
              <v-list-item
                v-for="(edu, index) in educationList"
                :key="'edu-' + index"
                 style="background: plum; margin: 10px;"
              >
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
              <v-list-item
                v-for="(work, index) in workList"
                :key="'work-' + index"
              >
                <div class="font-weight-medium">
                 <v-icon>mdi-briefcase</v-icon>
                  {{ work.company }}
                </div>
                <div>{{ work.position }}</div>
                <ul class="mt-2 ml-4">
                  <li style="background: palegoldenrod; margin: 10px;" v-for="(item, idx) in work.details" :key="idx">{{ item }}</li>
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
               <v-icon
              icon="mdi-cog"
              size="48"
              class="gear-icon d-none d-md-block"
            />
            </v-col>
          </v-row>
        </v-col> -->
        <v-col md="6" cols="12" class="order-md-1 order-1 text-center position-relative">
    <v-img
      :src="WorkImage"
      alt="Profile Image"
      max-width="500"
      width="100%"
      class="mx-auto"
    />

    <!--  Icon -->

     <!-- <v-img
      :src="heartStickers"
      alt="Profile Image"
      max-width="70"
      width="100%"
      class="heartStickers-icon  d-none d-md-block"
    /> -->
    <v-img
      :src="heartStickers"
      alt="Profile Image"
      max-width="70"
      width="100%"
      class="heartStickers-icon"
    />
    <v-img
      :src="ideaStickers"
      alt="Profile Image"
      max-width="120"
      width="100%"
      class="ideaStickers-icon"
    />
    <v-img
      :src="codeStickers"
      alt="Profile Image"
      max-width="70"
      width="100%"
      class="gear-icon3"
    />
    <v-img
      :src="fireFolderStickers"
      alt="Profile Image"
      max-width="70"
      width="100%"
      class="fireFolder-Stickers"
    />
  </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<style scoped>
.heartStickers-icon {
  position: absolute;
  top: 30%;
  opacity: 0.8;
    right: 80%;
  color: #666;
  animation: zoomInOut 2s ease-in-out infinite;
  transform: translateY(-50%);
}
.ideaStickers-icon {
  position: absolute;
  top: 10%;
  /* opacity: 0.4; */
  right: 10%;
  color: #666;
    animation: zoomInOut 4s ease-in-out infinite;
  transform: translateY(-60%);
  /* animation: spin 5s linear infinite; */
}
.gear-icon3{
  position: absolute;
  top: 11%;
  /* opacity: 0.4; */
  right:60%;
  color: #666;
    /* animation: zoomInOut 4s ease-in-out infinite; */
  transform: translateY(-60%);
   animation:
    float 5s ease-in-out infinite;
}
.fireFolder-Stickers{
  position: absolute;
  top: 35%;
  opacity: 0.8;
  right: 3%;
  transform: translateY(-70%);
   animation:
    float 3s ease-in-out infinite;
}

@keyframes zoomInOut {
  0%, 100% {
    transform: scale(1) translateY(-50%);
  }
  50% {
    transform: scale(1.2) translateY(-50%);
  }
}
@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
@media (max-width: 1147) {
    .gear-icon3 {
        display: none;
    }
}

/* @keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} */
</style>

