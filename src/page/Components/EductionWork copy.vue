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
  <section class="edu-work-section py-12">
    <v-container class="maxWidth">
      <v-row class="justify-center align-center">
       <v-col md="6" cols="12" class="order-md-0 order-0 info-column">
          <p class="text-overline text-primary font-weight-medium mb-2">เส้นทางการเรียนรู้</p>
          <h3 class="text-sm-h1 text-h2 font-weight-bold mb-4">Education & Work</h3>
          <p class="text-body-1 text-medium-emphasis mb-8">
            เส้นทางการเติบโตทั้งในรั้วมหาวิทยาลัยและในโลกการทำงานที่ช่วยต่อยอดสู่การเป็น Front-end Engineer ที่ใส่ใจทั้ง UX และคุณภาพของระบบ
          </p>

          <div class="info-group mb-10">
            <h4 class="group-title text-h5 font-weight-medium mb-4">Education</h4>
            <div
              v-for="(edu, index) in educationList"
              :key="'edu-' + index"
              class="detail-card"
            >
              <div class="detail-icon">
                <v-icon size="22" color="primary">mdi-school-outline</v-icon>
              </div>
              <div>
                <p class="detail-title text-subtitle-1 font-weight-medium mb-1">{{ edu.title }}</p>
                <p class="detail-text text-body-2 text-medium-emphasis">{{ edu.detail }}</p>
              </div>
            </div>
          </div>

          <div class="info-group">
            <h4 class="group-title text-h5 font-weight-medium mb-2">ประวัติการทำงาน</h4>
            <p class="text-body-2 text-medium-emphasis mb-4">
              ประสบการณ์จริงในการพัฒนาระบบและออกแบบส่วนติดต่อผู้ใช้ที่ตอบโจทย์ทั้งทีมและผู้ใช้งาน
            </p>
            <div
              v-for="(work, index) in workList"
              :key="'work-' + index"
              class="detail-card work-card"
            >
              <div class="detail-icon">
                <v-icon size="22" color="primary">mdi-briefcase-outline</v-icon>
              </div>
              <div>
                <p class="detail-title text-subtitle-1 font-weight-medium mb-1">{{ work.company }}</p>
                <p class="text-body-2 font-weight-medium text-medium-emphasis mb-3">{{ work.position }}</p>
                <ul class="work-list">
                  <li
                    v-for="(item, idx) in work.details"
                    :key="idx"
                    class="text-body-2 text-medium-emphasis"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </v-col>

        <v-col md="6" cols="12" class="order-md-1 order-1 text-center position-relative visual-column">
          <div class="photo-frame mx-auto">
            <span class="frame-glow" />
            <v-img
              :src="WorkImage"
              alt="Profile Image"
              max-width="520"
              width="100%"
              class="hero-illustration"
            />
          </div>

          <v-img
            :src="heartStickers"
            alt="heart icon"
            max-width="70"
            width="100%"
            class="heartStickers-icon"
          />
          <v-img
            :src="ideaStickers"
            alt="idea icon"
            max-width="120"
            width="100%"
            class="ideaStickers-icon"
          />
          <v-img
            :src="codeStickers"
            alt="code icon"
            max-width="70"
            width="100%"
            class="gear-icon3"
          />
          <v-img
            :src="fireFolderStickers"
            alt="folder icon"
            max-width="70"
            width="100%"
            class="fireFolder-Stickers"
          />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>


<style scoped>
.edu-work-section {
  background: #fff8f4;
}

.info-column {
  padding-right: 24px;
}

.info-group {
  position: relative;
}

.group-title {
  color: #2f2f2f;
}

.detail-card {
  display: flex;
  gap: 16px;
  padding: 18px 22px;
  border-radius: 22px;
  background: #fff;
  border: 1px solid rgba(201, 189, 179, 0.35);
  box-shadow: 0 18px 40px rgba(70, 63, 57, 0.08);
  margin-bottom: 16px;
}

.detail-icon {
  width: 44px;
  height: 44px;
  border-radius: 16px;
  background: rgba(255, 160, 140, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-title {
  color: #1f1f1f;
}

.detail-text {
  color: #6d6d6d;
}

.work-card {
  background: linear-gradient(145deg, #ffffff 0%, #fff5ef 100%);
}

.work-list {
  padding-left: 18px;
  margin: 0;
}

.work-list li {
  margin-bottom: 6px;
}

.visual-column {
  margin-top: 40px;
}

.photo-frame {
  position: relative;
  padding: 24px;
  border-radius: 32px;
  background: #fff;
  box-shadow: 0 24px 60px rgba(47, 40, 35, 0.12);
  display: inline-flex;
}

.frame-glow {
  position: absolute;
  inset: 12px;
  border-radius: 24px;
  background: radial-gradient(circle, rgba(255, 175, 155, 0.22), transparent 70%);
  filter: blur(8px);
}

.hero-illustration {
  position: relative;
  border-radius: 20px;
  z-index: 1;
}

.heartStickers-icon {
  position: absolute;
  top: 28%;
  right: 80%;
  opacity: 0.8;
  animation: zoomInOut 2.2s ease-in-out infinite;
}

.ideaStickers-icon {
  position: absolute;
  top: 8%;
  right: 8%;
  animation: zoomInOut 4s ease-in-out infinite;
}

.gear-icon3 {
  position: absolute;
  top: 10%;
  right: 58%;
  animation: float 5s ease-in-out infinite;
}

.fireFolder-Stickers {
  position: absolute;
  top: 36%;
  right: 4%;
  animation: float 3.2s ease-in-out infinite;
}

@keyframes zoomInOut {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-14px);
  }
  100% {
    transform: translateY(0);
  }
}

@media (max-width: 960px) {
  .info-column {
    padding-right: 0;
  }

  .visual-column {
    margin-top: 16px;
  }
}

@media (max-width: 600px) {
  .photo-frame {
    padding: 16px;
  }

  .heartStickers-icon,
  .gear-icon3 {
    display: none;
  }
}
</style>
