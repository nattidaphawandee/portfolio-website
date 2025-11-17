<template>
  <!-- <Suspense>
    <div>
      <alert-message></alert-message>
      <RouterView />
    </div>
  </Suspense> -->
  <div>
    <portfolioLanding/>
    <EductionWork/>
    <FrameworkSection/>
    <CertificationSection/>
    <DemoSection/>
  </div>
</template>

<script setup lang="ts">
import DemoSection from './page/Components/DemoSection.vue';
import EductionWork from './page/Components/EductionWork.vue';
import { RouterView } from 'vue-router';
import alertMessage from '@/components/alert/MaAlert.vue';
import portfolioLanding from './views/LandingPage/portfolioLanding.vue';
import FrameworkSection from './page/Components/FrameworkSection.vue';
import CertificationSection from './page/Components/CertificationSection.vue';
</script>
<style>
.v-overlay-container {
  /* font-family: 'Noto Sans Thai', sans-serif !important; */
  font-family: "IBM Plex Sans Thai", sans-serif;
}
</style>
