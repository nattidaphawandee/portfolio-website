<script setup lang="ts">
import AboutMeImg from '@/assets/images/AboutMe/AboutMeImg.png'
import { FiltersLanguage } from "@/utils/language";
import { computed } from 'vue'

const sectionTexts = {
  overlineTh: 'Nice to meet you',
  overlineEng: 'Nice to meet you',
  headingTh: 'About Me',
  headingEng: 'About Me',
}

const aboutParagraphsData = [
  {
    textTh:
      'สวัสดีค่ะ ชื่อฟ้านะคะ ปัจจุบันทำงานในตำแหน่ง Software Engineer โดยรับผิดชอบงานด้าน Front-End เป็นหลัก เคยฝึก Back-End มาบ้างและพร้อมต่อยอดเป็น Full Stack รวมถึงมีความสนใจงาน Mobile App ด้วย',
    textEng:
      'Hi! I’m Fah, currently working as a Software Engineer focused on Front-End development. I have some hands-on experience with Back-End work and am ready to grow into a Full Stack role, with a strong interest in mobile app development as well.',
  },
  {
    textTh:
      'ขณะนี้กำลังมองหาโอกาสในตำแหน่ง Front-End, Full Stack, Back-End หรือ Mobile App Developer พร้อมเปิดรับการเรียนรู้เทคโนโลยีใหม่ ๆ ตามความต้องการของทีม และสามารถทำงานได้ในทุกรูปแบบ ไม่ว่าจะเป็น Onsite (Bangkok), Hybrid หรือ WFH',
    textEng:
      'I’m currently looking for opportunities as a Front-End, Full Stack, Back-End, or Mobile App Developer. I’m open to learning new technologies to meet team needs and can work onsite (Bangkok), hybrid, or fully remote.',
  },
]

const profileDetailsData = [
  { labelTh: 'ชื่อเล่น', labelEng: 'Nickname', valueTh: 'ฟ้า', valueEng: 'Fah' },
  { labelTh: 'ตำแหน่ง', labelEng: 'Role', valueTh: 'Software Engineer', valueEng: 'Software Engineer' },
  {
    labelTh: 'ถนัด',
    labelEng: 'Specialties',
    valueTh: 'Vue.js · TypeScript · UX/UI Design',
    valueEng: 'Vue.js · TypeScript · UX/UI Design',
  },
  { labelTh: 'ที่อยู่', labelEng: 'Location', valueTh: 'กรุงเทพฯ, ประเทศไทย', valueEng: 'Bangkok, Thailand' },
]

const highlightItemsData = [
  {
    textTh: 'รักการสร้างสรรค์ UI ที่ใช้งานง่ายและ Responsive',
    textEng: 'Love crafting intuitive, responsive UIs',
  },
  {
    textTh: 'เชื่อในการพัฒนาระบบที่เข้าใจผู้ใช้เป็นศูนย์กลาง',
    textEng: 'Believe in building systems centered around user empathy',
  },
  {
    textTh: 'ทำงานร่วมกับทีมดีไซน์และ Back-end ได้ลื่นไหล',
    textEng: 'Collaborate seamlessly with design and back-end teams',
  },
  {
    textTh: 'ชอบทดลองเทคโนโลยีใหม่ ๆ เพื่อยกระดับงาน',
    textEng: 'Enjoy experimenting with new tech to elevate solutions',
  },
]

const overlineText = computed(() => FiltersLanguage(sectionTexts as any, 'overline'))
const headingText = computed(() => FiltersLanguage(sectionTexts as any, 'heading'))
const aboutParagraphs = computed(() => aboutParagraphsData.map((item) => FiltersLanguage(item as any, 'text')))

const profileDetails = computed(() =>
  profileDetailsData.map((item) => ({
    label: FiltersLanguage(item as any, 'label'),
    value: FiltersLanguage(item as any, 'value'),
  })),
)

const highlightItems = computed(() => highlightItemsData.map((item) => FiltersLanguage(item as any, 'text')))
</script>

<template>
  <section class="about-section py-12" id="about">
    <v-container class="maxWidth">
      <v-row class="align-center">
        <v-col cols="12" md="5">
            <v-img
              :src="AboutMeImg"
              alt="About Me Illustration"
              max-width="700"
              class="about-photo"
              
            />
        </v-col>

        <v-col cols="12" md="7" class="order-md-1 order-1">
          <p class="text-primary text-overline font-weight-medium mb-2">{{ overlineText }}</p>
          <h3 class="text-lightText text-h2 text-sm-h1 font-weight-bold mb-4">{{ headingText }}</h3>
          <p
            v-for="(paragraph, idx) in aboutParagraphs"
            :key="`paragraph-${idx}`"
            class="text-primary text-body-1 text-medium-emphasis mb-6"
          >
            {{ paragraph }}
          </p>

          <v-row>
            <v-col
              v-for="(detail, index) in profileDetails"
              :key="`detail-${index}`"
              cols="12"
              sm="6"
              class="py-3"
            >
              <div class="text-lightText text-caption text-medium-emphasis">{{ detail.label }}</div>
              <div class="text-primary text-subtitle-1 font-weight-medium">{{ detail.value }}</div>
            </v-col>
          </v-row>

          <!-- <div class="mt-4">
            <h4 class="text-h5 font-weight-medium mb-3">สิ่งที่ฉันหลงใหล</h4>
            <v-chip
              v-for="(highlight, idx) in highlightItems"
              :key="`highlight-${idx}`"
              class="ma-1"
              color="secondary"
              variant="tonal"
            >
              {{ highlight }}
            </v-chip>
          </div> -->
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.about-section {
  /* background: #fff8f4; */
   background: rgba(var(--v-theme-secondary));
}

.about-photo-wrapper {
  position: relative;
  width: 100%;
  max-width: 420px;
}

.photo-glow {
  position: absolute;
  inset: 10%;
  border-radius: 32px;
  /* background: linear-gradient(135deg, rgba(255, 141, 132, 0.35), rgba(255, 237, 221, 0.8)); */
  filter: blur(30px);
}

.about-photo {
  /* border-radius: 32px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12); */
  width: 100%;
  /* background: red; */
  animation: about-photo-zoom 6s ease-in-out infinite;
  transform-origin: center;
}

@keyframes about-photo-zoom {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.06);
  }
}
</style>
