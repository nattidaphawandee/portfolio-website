<script setup lang="ts">
import { shallowRef } from 'vue';

// import offer1 from '@/assets/images/landing/offer/offer-1.png';
// import offer2 from '@/assets/images/landing/offer/offer-2.png';
// import offer3 from '@/assets/images/landing/offer/offer-3.png';
// import offer4 from '@/assets/images/landing/offer/offer-4.png';
// import offer5 from '@/assets/images/landing/offer/offer-5.png';
// import offer5 from '@/assets/images/landing/offer/offer-6.png';

import offer1 from '@/assets/images/frameworks/javascript-original.svg'
import offer2 from '@/assets/images/frameworks/html5-original.svg'
import offer3 from '@/assets/images/frameworks/css3-original.svg'
import offer4 from '@/assets/images/frameworks/docker-original-wordmark.svg'
import offer5 from '@/assets/images/frameworks/arduino-original-wordmark.svg'
import offer6 from '@/assets/images/frameworks/git-original.svg'
import monogoDbCertification from '@/assets/images/Certification/mongodb.a58f100b.jpg'
import Huawel from '@/assets/images/Certification/Huawel.png'

const items = shallowRef([
  {
    title: 'Huawei HCIA-Cloud Computing Complete Certification',
    image: Huawel,
    content:
      'Berry can improve the user experience of your web application by providing a clear and intuitive layout, and consistent look and feel.'
  },
  {
    title: 'MongoDB Associate Certification',
    image: monogoDbCertification,
    content:
      'Berry can save developers time and effort by providing a pre-built user interface, allowing them to focus on other aspects of the project.'
  },
  // {
  //   title: 'Reduce Development Complexity',
  //   image: offer3,
  //   content: 'Berry simplifies admin panel development with easy theme setup and clear code with flexible layouts options.'
  // },
  // {
  //   title: 'Improved Scalability',
  //   image: offer4,
  //   content:
  //     'Berry uses scalable technologies and resources to ensure that your admin panel remains efficient and effective as your needs evolve.'
  // },
  // {
  //   title: 'Well-Documented and Supported',
  //   image: offer5,
  //   content: 'With a range of resources including user guides, tutorials, and FAQs to help users understand and effectively use the Berry.'
  // },
  // {
  //   title: 'Performance Centric',
  //   image: offer6,
  //   content: 'Berry is a performance-centric dashboard template that is designed to deliver optimal performance for your admin panel.'
  // }
]);
</script>

<template>
  <div class="spacer">
    <v-container class="maxWidth">
      <v-row class="justify-center">
        <v-col md="6" cols="12" class="text-center">
          <h2 class="text-sm-h1 text-h2 my-3" style="line-height: 1.2">My Certification</h2>
          <p>
          offering a wide range of features to easily manage your backend panel
          </p>
        </v-col>
        <v-col md="12" cols="12" />
        <v-col v-for="(item, index) in items" :key="index" md="4" sm="6" cols="12" data-aos="fade-up" data-aos-duration="800">
          <v-card variant="outlined" class="pa-5 bg-containerBg">

             <div>
              <img :src="item.image" style="max-width: 320px;" width="100%" alt="Julia"  class="rounded-sm"/>
              <!-- <img :src="item.image" width="56" height="56" alt="Julia" class="rounded-sm" /> -->
             </div>
            <h3 class="text-h3 mt-4 font-weight-medium">
              {{ item.title }}
            </h3>
            <p class="my-3 text-body-1">
              {{ item.content }}
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
