<template>
  <section class="home-bg" id="home">
    <v-container class="maxWidth">
      <div v-if="isLargeScreen" class="stack-container">
        <!-- ตัวอักษร -->
        <img :src="pText" alt="P" class="letter p" />
        <img :src="oText" alt="O" class="letter o1" />
        <img :src="rText" alt="R" class="letter r" />
        <img :src="tText" alt="T" class="letter t" />
        <img :src="fText" alt="F" class="letter f" />
        <img :src="oText" alt="O" class="letter o2" />
        <img :src="LText" alt="L" class="letter l" />
        <img :src="iText" alt="I" class="letter i" />
        <img :src="oText" alt="O" class="letter o3" />

        <div class="name-text">Nattida Phawandee</div>
        <img :src="HomePortfolioLanding" alt="Main" class="main-img" />
      </div>

      <div v-else class="mobile-text">
        <h2>Welcome to My Portfolio</h2>
       <p>สวัสดีค่ะ
ขอบคุณที่แวะเข้ามาชมผลงานนะคะ หวังว่าจะมีโอกาสได้ร่วมงานกันนะคะ :)</p>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
// assets
import { ref, onMounted, onUnmounted } from 'vue'

// image imports
import HomePortfolioLanding from '@/assets/images/porfolioMain.svg'
import pText from '@/assets/images/portfolioText/P.svg'
import oText from '@/assets/images/portfolioText/o.svg'
import rText from '@/assets/images/portfolioText/r.svg'
import tText from '@/assets/images/portfolioText/t.svg'
import fText from '@/assets/images/portfolioText/f.svg'
import LText from '@/assets/images/portfolioText/L.svg'
import iText from '@/assets/images/portfolioText/i.svg'

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
  background: #FFEEDD;
  min-height: 832px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  left: 25%;
  font-size: 28px;
  font-weight: 700;
  color: #DAB794;
   animation:
    dropIn 3s ease-out forwards,
    // float 2s ease-in-out infinite;
  // background: red;
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
    color: #b57646;
  }

  p {
    font-size: 18px;
    color: #5e4c42;
  }
}
</style>
