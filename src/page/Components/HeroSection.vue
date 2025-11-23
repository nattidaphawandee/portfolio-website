<template>
    <section class="hero">
        <!-- วิดีโอพื้นหลัง -->
        <video class="hero-bg" :src="videoSrc" autoplay muted loop playsinline preload="metadata" aria-hidden="true"
            @loadedmetadata="tryPlay"></video>

        <!-- overlay gradients -->
        <!-- <div class="hero-overlay"></div> -->

        <!-- เนื้อหากลาง -->
        <div class="hero-center">
             <div style="background: red;">
            sdl;f
         </div>
                <div class="hero-title section-margin-x">Nattida</div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// import { FiltersLanguage } from '@/utils/language'



// วิดีโอ path (เลือกแบบ assets/public ตามสะดวก)
const videoSrc = new URL('@/assets/video/vecteezy_an-anime-style-city-skyline.mp4', import.meta.url).href

// scroll effect
const scrollY = ref(0)
const hideProgress = computed(() => Math.max(0, Math.min(1, scrollY.value / 120)))

// const heroTitle = computed(() =>
//     FiltersLanguage(
//         { labelTh: 'Nattida', labelEng: 'INET Freehold and Leasehold Real Estate Investment Trust (INETREIT)' },
//         'label'
//     )
// )

// const heroSubtitle = computed(() =>
//     FiltersLanguage(
//         {
//             labelTh: '(INET Freehold and Leasehold Real Estate Investment Trust : INETREIT)',
//             labelEng: '(INET Freehold and Leasehold Real Estate Investment Trust : INETREIT)',
//         },
//         'label'
//     )
// )

function onScroll() {
    scrollY.value = window.scrollY || 0
}

function tryPlay(e: Event) {
    const v = e.target as HTMLVideoElement
    v.play?.().catch(() => { })
}

onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped lang="scss">
@import '@/scss/variables';
.section-margin-x {
  box-sizing: border-box;
  max-width: 1440px;
//   margin: 0 auto;
  margin-left: 80px;
  margin-right: 80px;
  @media (max-width: 1280px) {
    margin-left: 32px;
    margin-right: 32px;
  }
  @media (max-width: 600px) {
     margin-left: 24px;
    margin-right: 24px;
  }
}

.hero {
    position: relative;
    top: -64px;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    background: #000;
}

.hero-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
}

.hero-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background:
        linear-gradient(0deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),
        linear-gradient(180deg, rgba(255, 255, 255, 0) 45.82%, rgba(255, 255, 255, 0.17) 92.84%);
}

.hero-center {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: grid;
    place-items: center;
    pointer-events: none;
}

.hero-title {
    font-size: 40px;
    font-weight: 500;
    color: #fff;
    text-align: center;
    @media (max-width: 600px) {
        font-size: 28px;
    }
}
.hero-bottom {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    // height: 276px;
    width: 100%;
    display: flex;
    // align-items: end;
    transition: opacity 180ms ease, transform 180ms ease;
    background: linear-gradient(180deg, rgba(17, 34, 33, 0) 0%, rgba(17, 34, 33, 0.7) 54.64%);


}

.bottom-inner {
    // width: 88.889%;
    width: 100%;
    color: #f7f7f7;
    font-size: 18px;
    // padding: 10px;
    margin-bottom: 64px;
}

// .bottom-stock-panel {
//     width: 100%;
// }


@media (max-width: 1218px) {
    .hero-bottom {
        display: none;
    }
}
</style>
