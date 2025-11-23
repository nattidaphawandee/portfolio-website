<script setup lang="ts">
import { ref, onMounted } from 'vue';
// assets
import imgDemo1 from '@/assets/images/experience/WebInetreit.png';
import imgDemo2 from '@/assets/images/experience/figmaIr.png';
import imgDemo3 from '@/assets/images/experience/cxr.png';
import imgDemo5 from '@/assets/images/pre-apps/slider-light-5.png';
import imgDemo6 from '@/assets/images/pre-apps/slider-light-6.png';

import { LinkIcon } from 'vue-tabler-icons';

import { Carousel, Slide, Navigation } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';

const slideShow = [
  {
    image: imgDemo1,
    name: 'INETREIT Official Website (Front-End Development)',
    link: 'https://www.inetreit.com/home?lg=th'
  },
  {
    image: imgDemo2,
    name: 'Investor Relations Admin System – Figma UI/UX Design & Prototype',
    link: 'https://drive.google.com/file/d/1L_8BpAIdWGG_e7m9hewJLgXhO6XGqSEs/view?usp=sharing'
  },
  {
    image: imgDemo3,
    name: 'ระบบช่วยวิเคราะห์ภาพเอกซเรย์ทรวงอกด้วย AI (AI–CXR Screening System)',
    link: 'https://drive.google.com/file/d/1SyHe_DyO-m-0oK6ooSn-JQEPLuadxFAg/view?usp=sharing'
  },
];

const relativeURL = ref<string | null>(null);

onMounted(async () => {
  try {
    relativeURL.value = await import.meta.env.BASE_URL;
  } catch (error) {
    console.error('Error url not found:', error);
  }
});

type SlideItem = (typeof slideShow)[number];
const isAbsoluteUrl = (url: string) => /^https?:\/\//i.test(url);
const appendToBase = (path: string) => {
  const base = relativeURL.value ?? '/';
  const formattedBase = base.endsWith('/') ? base : `${base}/`;
  const trimmedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${formattedBase}${trimmedPath}`;
};

const buildSlideUrl = (slide: SlideItem) => {
  const nameValue = slide.name?.trim();
  if (nameValue && isAbsoluteUrl(nameValue)) {
    return nameValue;
  }

  const linkValue = slide.link?.trim();
  if (!linkValue) {
    return '#';
  }

  if (isAbsoluteUrl(linkValue)) {
    return linkValue;
  }

  return appendToBase(linkValue);
};

const breakpoints = ref({
  300: {
    itemsToShow: 1.05,
    snapAlign: 'center'
  },
  480: {
    itemsToShow: 1.5,
    snapAlign: 'center'
  },
  600: {
    itemsToShow: 2.2,
    snapAlign: 'center'
  }
});
</script>
<template>
  <div class="spacer bg-containerBg">
    <v-container class="maxWidth">
      <v-row class="justify-center">
        <v-col md="7" cols="12" class="text-center">
          <h2 class="text-sm-h1 text-h2 my-3" style="line-height: 1.2"> ประสบการณ์ทำงาน</h2>
          <p>ตัวอย่างงานพัฒนา Front-End ตั้งแต่ UI/UX Design (Figma), Component Development, Responsive Design, Interaction, และการจัดการ Content โดยรวมงานบริษัทและโปรเจกต์ส่วนตัวเพื่อสะท้อนสไตล์การทำงานและความสามารถด้านเทคนิค</p>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <Carousel :wrap-around="true" :breakpoints="breakpoints" class="demo-slider"  :transition="500">
            <Slide v-for="(slide, i) in slideShow" :key="i">
              <div class="carousel__item">
                <a :href="buildSlideUrl(slide)" target="_blank" rel="noopener noreferrer">
                  <img alt="applications" :src="slide.image" class="w-100" />
                </a>
                <v-list class="mt-5 d-inline-block" style="background-color: transparent" variant="text">
                  <v-list-item :href="buildSlideUrl(slide)" target="_blank" rel="noopener noreferrer">
                    <h3>{{ slide.name }}</h3>
                    <template #append>
                      <v-btn variant="text" class="ml-2" size="x-small" icon>
                        <LinkIcon size="14" />
                      </v-btn>
                    </template>
                  </v-list-item>
                </v-list>
              </div>
            </Slide>
            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss">
.demo-slider {
  .carousel__slide {
    padding: 5px;
  }

  .carousel__slide--sliding {
    transition: 0.5s;
  }

  .carousel__slide {
    opacity: 0.5;
    transform: scale(0.8);
  }

  .carousel__slide--active {
    opacity: 1;
    transform: scale(1);
  }

  .carousel__prev,
  .carousel__next {
    background: rgba(var(--v-theme-surface));
    width: 65px;
    height: 65px;
    border-radius: 50%;
    @media (max-width: 959px) {
      width: 45px;
      height: 45px;
    }
  }
}
</style>
