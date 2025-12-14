<script setup lang="ts">
import { computed } from 'vue';
import { FiltersLanguage } from "@/utils/language";

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

const itemsData = [
  {
    title: 'Huawei HCIA-Cloud Computing Complete Certification',
    image: Huawel,
    link: 'https://drive.google.com/file/d/1Z9Pnr2Fgggg3lTNffiJupnsVX_yP2IOf/view?usp=sharing',
    contentTh:
      'ใบรับรองที่แสดงความรู้พื้นฐานด้าน Cloud Computing ครอบคลุมเทคโนโลยี Virtualization, Storage, Networking, Cloud Services และการใช้งาน Huawei Cloud รวมถึงความสามารถในการเข้าใจสถาปัตยกรรมระบบคลาวด์และการจัดการทรัพยากรบนคลาวด์ในระดับเริ่มต้นถึงปานกลาง',
    contentEng:
      'Certification demonstrating foundational knowledge of cloud computing, covering virtualization, storage, networking, cloud services, and working with Huawei Cloud, along with the ability to understand cloud architecture and manage cloud resources from beginner to intermediate level.'
  },
  {
    title: 'MongoDB Associate Certification',
    image: monogoDbCertification,
    link: 'https://drive.google.com/file/d/1yhxUeRp-Vrzht4Xl4gmbHuKRlCH8yjVy/view?usp=sharing',
    contentTh:
      'ใบรับรองแสดงความรู้พื้นฐานเกี่ยวกับ MongoDB รวมถึงโครงสร้างฐานข้อมูลแบบ NoSQL, การสร้างและจัดการ Collections, การเขียน Query พื้นฐาน, CRUD Operations และการทำงานกับ MongoDB Shell และ Compass',
    contentEng:
      'Certification proving foundational knowledge of MongoDB, including NoSQL data modeling, creating and managing collections, basic query writing, CRUD operations, and working with MongoDB Shell and Compass.'
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
];
const items = computed(() =>
  itemsData.map((item) => ({
    ...item,
    content: FiltersLanguage(item as any, 'content'),
  })),
);
const subTitleText = { 
  titleTh: '', 
  titleEng: '' }
const subTitleMsgText = computed(() => FiltersLanguage(subTitleText as any, 'title'))
</script>

<template>
  <section class="cert-section py-12" id="certifications">
    <v-container class="maxWidth">
      <v-row class="justify-center">
        <v-col md="7" cols="12" class="text-center mb-8">
          <p class="text-secondary text-overline text-primary font-weight-medium mb-2">Milestones</p>
          <h2 class="text-secondary text-sm-h1 text-h2 font-weight-bold mb-4">Certification</h2>
          <p class="text-secondary text-body-1 text-medium-emphasis">
            {{ subTitleMsgText }}
          </p>
        </v-col>
        <v-col
          v-for="(item, index) in items"
          :key="index"
          md="6"
          sm="6"
          cols="12"
          class="d-flex"
        >
          <a
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            class="cert-card-link"
          >
          <v-card variant="flat" class="cert-card">
            <div class="cert-image">
              <img :src="item.image" alt="certificate" />
            </div>
            <div class="cert-body">
              <h3 class="text-lightText text-h4 font-weight-medium mb-3">
                {{ item.title }}
              </h3>
              <p class="text-lightprimary text-body-2 text-medium-emphasis">
                {{ item.content }}
              </p>
            </div>
          </v-card>
          </a>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.cert-section {
  /* background: #fff8f4; */
   background: rgba(var(--v-theme-primary));
}

.cert-card-link {
  width: 100%;
  text-decoration: none;
}

.cert-card {
  width: 100%;
  border-radius: 28px;
  padding: 24px;
  /* background: #fff; */
  background: rgba(var(--v-theme-secondary));
  border: 1px solid rgba(201, 189, 179, 0.4);
  box-shadow: 0 18px 40px rgba(70, 63, 57, 0.08);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.cert-image {
  padding: 12px;
  border-radius: 22px;
  /* background: linear-gradient(140deg, #fff8f4 0%, #ffece2 100%); */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 235px;
}

.cert-image img {
  max-width: 260px;
  width: 100%;
  border-radius: 16px;
  object-fit: contain;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.cert-body {
  margin-top: 20px;
}
</style>
