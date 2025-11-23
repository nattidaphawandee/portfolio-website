<template>
    <div>
        <HomeBanner/>
            <!-- <HeroSection/> -->
    <EductionWork/>
    <FrameworkSection/>
    <CertificationSection/>
    <DemoSection/>
    </div>
</template>

<script lang="ts" setup>
import HomeBanner from '@/page/Components/HomeBanner.vue';
import HeroSection from '@/page/Components/HeroSection.vue';
import DemoSection from '@/page/Components/DemoSection.vue';
import EductionWork from '@/page/Components/EductionWork.vue';
import { RouterView } from 'vue-router';
import alertMessage from '@/components/alert/MaAlert.vue';
import portfolioLanding from '@/views/LandingPage/portfolioLanding.vue';
import FrameworkSection from '@/page/Components/FrameworkSection.vue';
import CertificationSection from '@/page/Components/CertificationSection.vue';
</script>

<!-- <style scoped>
.hero-section {
  background: #fff8f4;
  padding: 60px 0;
}
.title h1 {
  font-size: 3rem;
  font-weight: bold;
}
.highlight {
  color: #d79b63;
}
.project-card {
  transition: all 0.3s ease;
}
.project-card:hover {
  transform: translateY(-5px);
}
</style> -->
