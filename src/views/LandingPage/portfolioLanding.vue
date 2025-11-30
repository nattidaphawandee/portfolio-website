<template>
    <v-app
      :theme="customizer.actTheme"
      :class="[
        customizer.actTheme,
        customizer.fontTheme,
        customizer.mini_sidebar ? 'mini-sidebar' : '',
        customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
        customizer.inputBg ? 'inputWithbg' : ''
      ]"
    >
      <Customizer />
      <PortfolioMenuBar />
      <v-main>
        <!-- <v-container fluid class="page-wrapper"> -->
           <HomeBanner />
          <AboutMe />
          <EductionWork />
          <FrameworkSection />
          <CertificationSection />
          <DemoSection />
          <Contact/>
        <!-- </v-container> -->
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
import Customizer from '@/layouts/full/customizer/CustomizerPanel.vue';
import { useCustomizerStore } from '@/stores/customizer';
const customizer = useCustomizerStore();

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
