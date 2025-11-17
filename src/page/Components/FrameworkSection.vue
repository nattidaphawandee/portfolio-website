<script setup lang="ts">
import { ref } from 'vue';
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

import 'vue3-carousel/dist/carousel.css';

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
    title: 'Arduino',
    logo: Arduino,
    link: 'https://www.arduino.cc/en/software/'
  },

];

const breakpoints = ref({
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
    itemsToShow: 4.6,
    snapAlign: 'center'
  },
  1199: {
    itemsToShow: 5,
    snapAlign: 'center'
  },
  1360: {
    itemsToShow: 7,
    snapAlign: 'center'
  }
});
</script>

<template>
  <div class="spacer">
    <v-container class="maxWidth">
      <v-row class="justify-center">
        <v-col md="12" cols="12" class="text-center">
          <h2 class="text-sm-h1 text-h2 my-3" style="line-height: 1.2">Programming skills </h2>
          <p>
            Each framework is sold separately on different platforms. Click to
            <a href="https://codedthemes.gitbook.io/berry/berry-eco-system" target="_blank"
              class="text-primary more-link">Learn more</a>
          </p>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <Carousel :wrap-around="true" class="framework-carousel" :breakpoints="breakpoints" :autoplay="2000"
            :transition="500">
            <Slide v-for="(slide, i) in slideShow" :key="i">
              <div class="carousel__item">
                <v-card class="bg-containerBg framework-box mb-3" variant="flat">
                  <v-card-item style="display: flex; justify-content: center;">
                    <a :href="slide.link" target="_" class="text-darkText text-decoration-none"
                     >
                      <div style="width: 100%; display: flex; justify-items: center;">
                        <img alt="framework" :src="slide.logo" style="max-width: 100px;" />
                      </div>
                      <!-- <div>
                        <h3 class="ma-3">{{ slide.title }}</h3>
                      </div> -->
                    </a>
                  </v-card-item>
                </v-card>
              </div>
            </Slide>
            <!-- <template #addons> -->
            <!-- <Pagination style="background: green; padding: 10px; margin: 10px;"/> -->
            <!-- </template> -->
          </Carousel>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss">
.framework-box {
  min-width: 180px;
}

// .framework-carousel {
//   .carousel__pagination {
//     margin-top: 50px;
//     @media (max-width: 600px) {
//       margin-top: 10px;
//       background: blue;
//     }
//     .carousel__pagination-item {
//       .carousel__pagination-button {
//         &::after {
//           width: 10px;
//           height: 10px;
//           border-radius: 100%;
//           opacity: 0.25;
//           background: red;
//         }
//         &.carousel__pagination-button--active {
//           &::after {
//             opacity: 1;
//             background: rgb(var(--v-theme-primary));
//           }
//         }
//       }
//     }
//   }
// }
.upcoming-chip {
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
