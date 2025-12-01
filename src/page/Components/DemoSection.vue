<script setup lang="ts">
import { ref, onMounted,computed } from 'vue';
// assets
import imgDemo1 from '@/assets/images/experience/WebInetreit.png';
import imgDemo2 from '@/assets/images/experience/figmaIr.png';
import imgDemo3 from '@/assets/images/experience/cxr.png';

import { LinkIcon } from 'vue-tabler-icons';
import { FiltersLanguage } from "@/utils/language";

import { Carousel, Slide, Navigation } from 'vue3-carousel';
import type { Breakpoints } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';
const slideShowData = [
  {
    image: imgDemo1,
    nameTh: 'เว็บไซต์ทางการ INETREIT (พัฒนา Front-End)',
    nameEng: 'INETREIT Official Website (Front-End Development)',
    linkTh: 'https://www.inetreit.com/home?lg=th',
    linkEng: 'https://www.inetreit.com/home?lg=en'
  },
  {
    image: imgDemo2,
    nameTh: 'ระบบ IR Admin – ออกแบบ UX/UI & Prototype ใน Figma',
    nameEng: 'Investor Relations Admin System – Figma UI/UX Design & Prototype',
    linkTh: 'https://drive.google.com/file/d/1L_8BpAIdWGG_e7m9hewJLgXhO6XGqSEs/view?usp=sharing',
    linkEng: 'https://drive.google.com/file/d/1mJfMC5x9gtKr92QqyUifuwf3qw-TdgPQ/view?usp=drive_link'
  },
  {
    image: imgDemo3,
    nameTh: 'ระบบช่วยวิเคราะห์ภาพเอกซเรย์ทรวงอกด้วย AI (AI–CXR Screening System)',
    nameEng: 'AI–CXR Screening System – AI chest X-ray analysis',
    linkTh: 'https://drive.google.com/file/d/1SyHe_DyO-m-0oK6ooSn-JQEPLuadxFAg/view?usp=sharing',
    linkEng: 'https://drive.google.com/file/d/1SyHe_DyO-m-0oK6ooSn-JQEPLuadxFAg/view?usp=sharing'
  },
];
const slideShow = computed(() =>
  slideShowData.map((slide) => ({
    ...slide,
    name: FiltersLanguage(slide as any, 'name'),
    link: FiltersLanguage(slide as any, 'link')
  }))
);

const relativeURL = ref<string | null>(null);

const headeText = { 
  titleTh: 'ผลงาน', 
  titleEng: 'Project' }
const headeMsgText = computed(() => FiltersLanguage(headeText as any, 'title'))

const subTitleText = { 
  titleTh: 'ตัวอย่างงานพัฒนา Front-End ตั้งแต่การออกแบบ UX/UI ใน Figma ไปจนถึงการพัฒนา Component, Interaction, Responsive Design และการเชื่อมต่อข้อมูลจริง', 
  titleEng: 'Examples of Front-End development work ranging from UX/UI design in Figma to building components, interactions, responsive layouts, and connecting to real data.' }
const subTitleMsgText = computed(() => FiltersLanguage(subTitleText as any, 'title'))

const detailText = { 
  titleTh: 'ดูรายละเอียด', 
  titleEng: 'View details.' }
const detailMsgText = computed(() => FiltersLanguage(detailText as any, 'title'))

onMounted(async () => {
  try {
    relativeURL.value = await import.meta.env.BASE_URL;
  } catch (error) {
    console.error('Error url not found:', error);
  }
});

type SlideItem = {
  name?: string | null;
  link?: string | null;
};
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

const breakpoints = ref<Breakpoints>({
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
  <section class="demo-section py-12" id="projects">
    <v-container class="maxWidth">
      <v-row class="justify-center">
        <v-col md="8" cols="12" class="text-center mb-6">
          <p class="text-primary text-overline font-weight-medium mb-2">Works Highlight</p>
          <h2 class="text-lightText text-sm-h1 text-h2 font-weight-bold mb-4">{{ headeMsgText }}</h2>
          <p class="text-lightprimary text-body-1 text-medium-emphasis">
            {{ subTitleMsgText }}
          </p>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <Carousel
            :wrap-around="true"
            :breakpoints="breakpoints"
            class="demo-slider"
            :transition="500"
          >
            <Slide v-for="(slide, i) in slideShow" :key="i">
              <div class="demo-card">
                <a :href="buildSlideUrl(slide)" target="_blank" rel="noopener noreferrer">
                  <img alt="applications" :src="slide.image" class="demo-image" />
                </a>
                <div class="demo-meta">
                  <h3 class="text-secondary text-h5 font-weight-medium">{{ slide.name }}</h3>
                  <v-btn
                    variant="tonal"
                    color="secondary"
                    size="small"
                    class="mt-3"
                    :href="buildSlideUrl(slide)"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ detailMsgText }}
                    <LinkIcon size="16" class="ml-2" />
                  </v-btn>
                </div>
              </div>
            </Slide>
            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss">
.demo-section {
  //background: #fffdfb;
    background: rgba(var(--v-theme-secondary));

}

.demo-card {
  background: rgba(var(--v-theme-primary));

  padding: 18px;
  border-radius: 28px;
  box-shadow: 0 18px 40px rgba(51, 51, 51, 0.08);
  border: 1px solid rgba(201, 189, 179, 0.35);
}

.demo-image {
  width: 100%;
  border-radius: 22px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.demo-meta {
  margin-top: 18px;
}

.demo-slider {
  .carousel__slide {
    padding: 10px;
  }

  .carousel__slide--sliding {
    transition: 0.5s;
  }

  .carousel__slide {
    opacity: 0.5;
    transform: scale(0.9);
  }

  .carousel__slide--active {
    opacity: 1;
    transform: scale(1);
  }

  .carousel__prev,
  .carousel__next {
    // background: #fff;
    background: rgba(var(--v-theme-secondary));
    width: 56px;
    height: 56px;
    border-radius: 50%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    @media (max-width: 959px) {
      width: 42px;
      height: 42px;
    }
  }
}
</style>
