<template>
  <div class="home-bg">
    <v-container class="maxWidth">
      <div class="stack-container">
        <!-- ตัวอักษรวางอย่างอิสระ -->
        <img :src="pText" alt="P" class="letter p" />
        <img :src="oText" alt="O" class="letter o1" />
        <img :src="rText" alt="R" class="letter r" />
        <img :src="tText" alt="T" class="letter t" />
        <img :src="fText" alt="F" class="letter f" />
        <img :src="oText" alt="O" class="letter o2" />
        <img :src="LText" alt="L" class="letter l" />
        <img :src="iText" alt="I" class="letter i" />
        <img :src="oText" alt="O" class="letter o3" />
        <!-- รูปหลักวางด้านบนสุด -->
         <div class="name-text">
          Nattida Phawandee
         </div>
        <img :src="HomePortfolioLanding" alt="Main" class="main-img" />
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
// assets
import HomePortfolioLanding from '@/assets/images/porfolioMain.svg'
import pText from '@/assets/images/portfolioText/P.svg'
import oText from '@/assets/images/portfolioText/o.svg'
import rText from '@/assets/images/portfolioText/r.svg'
import tText from '@/assets/images/portfolioText/t.svg'
import fText from '@/assets/images/portfolioText/f.svg'
import LText from '@/assets/images/portfolioText/L.svg'
import iText from '@/assets/images/portfolioText/i.svg'
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

/* ตัวอักษรทั้งหมดใช้ absolute วางตามตำแหน่งที่ต้องการ */
.letter {
  position: absolute;
  // width: 150px;
  height: auto;
  // opacity: 0.4;
}

/* กำหนดตำแหน่งเฉพาะของแต่ละตัว */
.p {
  top: 18%;
  left: 12%;
  width: 210px;
}

.o1 {
  top: 38%;
  left: 33%;
  width: 155px;
}

.r {
  top: 14%;
  left: 46%;
  width: 200px;
}

.t {
  top: 4%;
  left: 73%;
  width: 150px;
}

.f {
  top: 9%;
  left: 100%;
  width: 140px;

}

.o2 {
  top: 32%;
  left: 108%;
  width: 120px;
}

.l {
  top: 29%;
  left: 125%;
  width: 145px;
}

.i {
  top: 18%;
  left: 135%;
  // width: 145px;
}

.o3 {
  top: 32%;
  left: 145%;
  width: 120px;
}
.name-text{
  position: absolute;
  top: 70%;
  left: 25%;
  font-size: 28px;
  font-weight: 700;
  color: #DAB794;
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
</style>
