<template>
  <section class="home-bg" id="home">
    <v-container class="maxWidth">
      {{ customizer.actTheme }}
      <div v-if="isLargeScreen" class="stack-container">
        <!-- ตัวอักษร -->
         <p-text class="letter p"/>
         <oText class="letter o1"/>
        <rText class="letter r"/>
        <tText class="letter t"/>
        <fText class="letter f"/>
        <oText class="letter o2"/>
        <LText class="letter l"/>
        <iText class="letter i"/>
         <oText class="letter o3"/>
        <div class="name-text">Nattida Phawandee</div>
        <p class="name-subtext">{{ titleText }}</p>

        <v-btn
          class="download-link"
          rounded="pill"
          href="https://drive.google.com/file/d/1XIer4lbx63rfGtoJPFs4iuOq88FlBeKk/view?usp=drive_link"
          target="_blank"
          rel="noopener"
        >
          Download CSV
        </v-btn>
        <img :src="HomePortfolioLanding" alt="Main" class="main-img" />
      </div>
      <div v-else class="mobile-text">
        <h2>{{ mobileTitleText }}</h2>
       <p>{{ titleText }}</p>
         <v-btn
          color="secondary"
          rounded="pill"
          href="https://drive.google.com/file/d/1MQljoCSWTF-sY8O00gDhc1KWjVq7DiiR/view?usp=sharing"
          target="_blank"
          rel="noopener"
        >
          Download Resume
        </v-btn>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
// assets
import { ref, onMounted, onUnmounted ,computed} from 'vue'

// image imports
import HomePortfolioLanding from '@/assets/images/porfolioMain.svg'
import pText from '@/components/logo/pText.vue'
import oText from '@/components/logo/oText.vue'
import rText from '@/components/logo/rText.vue'
import tText from '@/components/logo/tText.vue'
import fText from '@/components/logo/fText.vue'
import LText from '@/components/logo/lText.vue'
import iText from '@/components/logo/iText.vue'

import { FiltersLanguage } from "@/utils/language";

import { useCustomizerStore } from '@/stores/customizer';
const customizer = useCustomizerStore();
import { useLanguageStore } from '@/stores/languageStore'



// UI text via FiltersLanguage pattern
const headerText = { titleTh: 'สวัสดีค่ะ ขอบคุณที่แวะเข้ามาชมผลงานนะคะ หวังว่าจะมีโอกาสได้ร่วมงานกันนะคะ :)', titleEng: 'Hello! Thank you for taking the time to view my work. I hope we’ll have the opportunity to work together :)' }
const mobiletitle = { subTh: 'ยินดีต้อนรับ', subEng: 'Welcome to My Portfolio' }

const titleText = computed(() => FiltersLanguage(headerText as any, 'title'))
const mobileTitleText = computed(() => FiltersLanguage(mobiletitle as any, 'sub'))


// screen size logic
const isLargeScreen = ref(window.innerWidth >= 1194)

const handleResize = () => {
  isLargeScreen.value = window.innerWidth >= 1194
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

</script>

<style scoped lang="scss">
.home-bg {
  // background: #FFEEDD;
  min-height: 832px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--v-theme-primary));
}

.stack-container {
  position: relative;
  max-width: 700px;
  width: 100%;
  height: 700px;
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
@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0);
  }
}


/* ตัวอักษรทั้งหมดใช้ absolute วางตามตำแหน่งที่ต้องการ */
.letter {
  position: absolute;
  height: auto;
  opacity: 0;
  animation:
    dropIn 0.6s ease-out forwards,
    float 2s ease-in-out infinite;
}


/* กำหนดตำแหน่งเฉพาะของแต่ละตัว */
.p {
  top: 18%;
  left: 12%;
  width: 210px;
  animation-delay: 0s, 0.8s;
}
.o1 {
  top: 38%;
  left: 33%;
  width: 155px;
  animation-delay: 0.6s, 1s;
}


.r {
  top: 14%;
  left: 46%;
  width: 200px;
  animation-delay: 0.8s;
}

.t {
  top: 4%;
  left: 73%;
  width: 150px;
  // animation-delay: 0.6s;
  animation-delay: 1.2s, 0.7s;

}

.f {
  top: 9%;
  left: 100%;
  width: 140px;
  // animation-delay: 0.8s;
    animation-delay: 1.5s, 1s;

}

.o2 {
  top: 32%;
  left: 108%;
  width: 120px;
  animation-delay: 1.8s ;
}

.l {
  top: 29%;
  left: 125%;
  width: 145px;
  animation-delay: 2s;
}

.i {
  top: 18%;
  left: 135%;
  animation-delay: 2.3s;
}

.o3 {
  top: 32%;
  left: 145%;
  width: 120px;
  animation-delay: 3s;
}

.name-text{
  position: absolute;
  top: 70%;
  left: 20%;
  font-size: 28px;
  font-weight: 700;
  // color: #DAB794;
  color: rgba(var(--v-theme-secondary));

   animation:
    dropIn 3s ease-out forwards,

}

.name-subtext{
  position: absolute;
  top: 77%;
  left: 20%;
  font-size: 16px;
  height: auto;
  max-width: 300px;
  font-weight: 500;
  // color: #DAB794;
  color: rgba(var(--v-theme-secondary));

   animation:
    dropIn 3s ease-out forwards,

}

.download-link {
  position: absolute;
  top: 87%;
  left: 20%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 24px 22px;
  border-radius: 999px;
   color: rgba(var(--v-theme-lightText));
  background: rgba(var(--v-theme-secondary));
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.5px;
  opacity: 0;
  animation: dropIn 3.5s ease-out forwards;
  transition: transform 0.2s ease-in-out;
}

.download-link:hover {
  transform: translateY(-2px);
}

/* รูปหลักซ้อนด้านบน */
.main-img {
  position: absolute;
  width: 626px;
  height: 626px;
  top: 20%;
  left: 40%;
  // transform: translate(-50%, -50%);
  z-index: 2;
}
.mobile-text {
  text-align: center;
  margin-top: 100px;

  h2 {
    font-size: 28px;
    // color: #b57646;
    color: rgba(var(--v-theme-secondary));

  }

  p {
    font-size: 18px;
    color: rgba(var(--v-theme-secondary));
  }
}
</style>
