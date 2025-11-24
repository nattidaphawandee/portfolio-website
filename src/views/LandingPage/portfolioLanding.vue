<template>
  <v-app>
    <PortfolioMenuBar />
    <v-main>
      <HomeBanner />
      <!-- <HeroSection/> -->
      <AboutMe />
      <EductionWork />
      <FrameworkSection />
      <CertificationSection />
      <DemoSection />
      <Contact/>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import HomeBanner from '@/page/Components/HomeBanner.vue';
import DemoSection from '@/page/Components/DemoSection.vue';
import EductionWork from '@/page/Components/EductionWork.vue';
import AboutMe from '@/page/Components/AboutMe.vue';
import FrameworkSection from '@/page/Components/FrameworkSection.vue';
import CertificationSection from '@/page/Components/CertificationSection.vue';
import Contact from '@/page/Components/Contact.vue';
import PortfolioMenuBar from '@/components/PortfolioMenuBar.vue';
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
