<script setup>
import AboutMeImg from '@/assets/images/AboutMe/AboutMeImg.png'
// import AboutMeImg from '@/assets/images/AboutMe/profileimg.jpeg'
// import AboutMeImg from '@/assets/images/AboutMe/twoProfile.png'


const profileDetails = [
  { label: 'ชื่อเล่น', value: 'ฟ้า' },
  { label: 'ตำแหน่ง', value: 'Front-end Engineer' },
  { label: 'ถนัด', value: 'Vue.js · TypeScript · UI Engineering' },
  { label: 'ที่อยู่', value: 'Bangkok, Thailand' }
]

const highlightItems = [
  'รักการสร้างสรรค์ UI ที่ใช้งานง่ายและ Responsive',
  'เชื่อในการพัฒนาระบบที่เข้าใจผู้ใช้เป็นศูนย์กลาง',
  'ทำงานร่วมกับทีมดีไซน์และ Back-end ได้ลื่นไหล',
  'ชอบทดลองเทคโนโลยีใหม่ ๆ เพื่อยกระดับงาน'
]
</script>

<template>
  <section class="about-section py-12">
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
          <p class="text-primary text-overline font-weight-medium mb-2">Nice to meet you</p>
          <h3 class="text-h2 text-sm-h1 font-weight-bold mb-4">About Me</h3>
          <p class="text-body-1 text-medium-emphasis mb-6">
            สวัสดีค่ะ ชื่อฟ้านะคะ ปัจจุบันทำงานในตำแหน่ง Software Engineer โดยรับผิดชอบงานด้าน Front-End เป็นหลัก
            เคยฝึก Back-End มาบ้างและพร้อมต่อยอดเป็น Full Stack รวมถึงมีความสนใจงาน Mobile App ด้วย                  
            </p>
            <p class="text-body-1 text-medium-emphasis mb-6">
                ขณะนี้กำลังมองหาโอกาสในตำแหน่ง Front-End, Full Stack, Back-End หรือ Mobile App Developer พร้อมเปิดรับการเรียนรู้เทคโนโลยีใหม่ ๆ ตามความต้องการของทีม และสามารถทำงานได้ในทุกรูปแบบ ไม่ว่าจะเป็น Onsite(bangkok), Hybrid หรือ WFH
            </p>

          <v-row>
            <v-col
              v-for="(detail, index) in profileDetails"
              :key="`detail-${index}`"
              cols="12"
              sm="6"
              class="py-3"
            >
              <div class="text-caption text-medium-emphasis">{{ detail.label }}</div>
              <div class="text-subtitle-1 font-weight-medium">{{ detail.value }}</div>
            </v-col>
          </v-row>

          <div class="mt-4">
            <h4 class="text-h5 font-weight-medium mb-3">สิ่งที่ฉันหลงใหล</h4>
            <v-chip
              v-for="(highlight, idx) in highlightItems"
              :key="`highlight-${idx}`"
              class="ma-1"
              color="primary"
              variant="tonal"
            >
              {{ highlight }}
            </v-chip>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.about-section {
  background: #fff8f4;
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
}
</style>
