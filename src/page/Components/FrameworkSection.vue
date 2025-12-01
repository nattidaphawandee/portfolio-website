<script setup lang="ts">
import { ref ,computed} from 'vue';
import { FiltersLanguage } from "@/utils/language";

// assets
import Bootstrap from '@/assets/images/frameworks/bootstrap.svg';
import Codeigniter from '@/assets/images/frameworks/codeigniter.svg';
import DotNet from '@/assets/images/frameworks/dot-net.svg';
import FullStack from '@/assets/images/frameworks/full-stack.svg';
// import Vue from '@/assets/images/frameworks/vue.svg';
import Vue from '@/assets/images/frameworks/vuejs-original-wordmark.svg'
import Vuetify from '@/assets/images/frameworks/vuetify-original.svg';
import Typescipt from '@/assets/images/frameworks/typescript-original.svg'
import Tailwind from '@/assets/images/frameworks/tailwindcss-plain.svg'
import MongoDB from '@/assets/images/frameworks/mongodb-original-wordmark.svg'
import Golang from '@/assets/images/frameworks/go-original-wordmark.svg'
import Figma from '@/assets/images/frameworks/figma-original.svg'
import Javascript from '@/assets/images/frameworks/javascript-original.svg'
import Html from '@/assets/images/frameworks/html5-original.svg'
import Css from '@/assets/images/frameworks/css3-original.svg'
import Docker from '@/assets/images/frameworks/docker-original-wordmark.svg'
import Arduino from '@/assets/images/frameworks/arduino-original-wordmark.svg'
import GitHub from '@/assets/images/frameworks/git-original.svg'


import { Carousel, Slide, Pagination } from 'vue3-carousel';
import type { Breakpoints } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';

const subText = { 
  titleTh: 'Frameworks และเครื่องมือที่ใช้งานเป็นประจำในการออกแบบ UI, จัดการข้อมูล และพัฒนาโปรเจกต์ ที่ได้จากการทำงานจริงและศึกษาเพิ่มเติมเอง', 
  titleEng: 'Frameworks and tools I regularly use for UI design, data management, and project development, gained through real-world work and self-study.' }
const subTitleMsgText = computed(() => FiltersLanguage(subText as any, 'title'))

const slideShow = [
  {
    title: 'Html',
    logo: Html,
    link: '/'
  },
  {
    title: 'css',
    logo: Css,
    link: '/'
  },
  {
    title: 'Javascript',
    logo: Javascript,
    link: '/'
  },
  {
    title: 'Typescipt',
    logo: Typescipt,
    link: 'https://www.typescriptlang.org/'
  },
  {
    title: 'Vue.js',
    logo: Vue,
    link: 'https://vuejs.org/'
  },
  {
    title: 'Vuetify',
    logo: Vuetify,
    link: 'https://vuetifyjs.com/en/'
  },
  {
    title: 'Tailwind',
    logo: Tailwind,
    link: 'https://tailwindcss.com/'
  },
  {
    title: 'GitHub',
    logo: GitHub,
    link: 'https://github.com/'
  },
  {
    title: 'Docker',
    logo: Docker,
    link: 'https://www.docker.com/'
  },
   {
    title: 'Figma',
    logo: Figma,
    link: 'https://www.figma.com/'
  },
  {
    title: 'Arduino',
    logo: Arduino,
    link: 'https://www.arduino.cc/en/software/'
  },

];

const breakpoints = ref<Breakpoints>({
  300: {
    itemsToShow: 1,
    snapAlign: 'center'
  },
  400: {
    itemsToShow: 2,
    snapAlign: 'center'
  },
  600: {
    itemsToShow: 3,
    snapAlign: 'center'
  },
  768: {
    itemsToShow: 4,
    snapAlign: 'center'
  },
  992: {
    itemsToShow: 4.3,
    snapAlign: 'center'
  },
  1199: {
    itemsToShow: 5,
    snapAlign: 'center'
  },
  1360: {
    itemsToShow: 5.8,
    snapAlign: 'center'
  }
});


</script>

<template>
  <section class="framework-section py-12" id="skills">
    <v-container class="maxWidth">
      <v-row class="justify-center text-center mb-6">
        <v-col md="10" cols="12">
          <p class="text-overline text-primary font-weight-medium mb-2">Tech Stack</p>
          <h2 class="text-lightText text-sm-h1 text-h2 font-weight-bold mb-4">Programming Skills</h2>
          <p class="text-lightprimary text-body-1 text-medium-emphasis">
            {{ subTitleMsgText }}
          </p>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <div class="framework-panel mx-auto">
            <Carousel
              :wrap-around="true"
              class="framework-carousel"
              :breakpoints="breakpoints"
              :autoplay="2200"
              :transition="500"
            >
              <Slide v-for="(slide, i) in slideShow" :key="i">
                <div class="carousel__item">
                  <v-card class="framework-card" variant="flat">
                    <a
                      :href="slide.link"
                      target="_blank"
                      class="text-darkText text-decoration-none d-flex flex-column align-center"
                    >
                      <img alt="framework" :src="slide.logo" class="framework-logo" />
                      <span class="framework-name text-body-2 mt-2">{{ slide.title }}</span>
                    </a>
                  </v-card>
                </div>
              </Slide>
            </Carousel>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss">
.framework-section {
  // background: #fffdfb;
  background: rgba(var(--v-theme-secondary));
}

.framework-panel {
  max-width: 1200px;
  padding: 24px;
  border-radius: 32px;
  // background: #fff;

  box-shadow: 0 24px 60px rgba(45, 32, 28, 0.08);
}

.framework-card {
  min-width: 180px;
  border-radius: 24px;
  padding: 28px 18px;
  background: rgba(var(--v-theme-primary));
  // color: rgba(var(--v-theme-secondary));;
    // background: linear-gradient(160deg, #ffffff 0%, rgba(var(--v-theme-primary)) 100%);
  // background: linear-gradient(160deg, #ffffff 0%, #F0E7D5 100%);
  border: 1px solid rgba(201, 189, 179, 0.4);
  box-shadow: 0 18px 40px rgba(64, 48, 40, 0.08);
}

.framework-logo {
  max-width: 90px;
  height: 60px;
  object-fit: contain;
  filter: drop-shadow(0 8px 14px rgba(0, 0, 0, 0.1));
}

.framework-name {
  color: rgba(var(--v-theme-secondary));
  letter-spacing: 0.02em;
  font-weight: 600;
}

.framework-carousel {
  .carousel__slide {
    padding: 12px;
  }

  .carousel__slide--sliding {
    transition: 0.5s;
  }

  .carousel__item {
    padding: 10px;
  }
}
</style>
