<template>
    <div>
        <HomeBanner/>
    </div>
</template>

<script lang="ts" setup>
import HomeBanner from '@/page/Components/HomeBanner.vue';
const projects = [
  {
    title: 'TRAVLO',
    description: 'Accessible Travel for people with special needs',
    image: '/projects/travlo.png',
  },
  {
    title: 'SANDRA',
    description: 'Website Design for a premium safety wear brand',
    image: '/projects/sandra.png',
  },
  {
    title: 'FACTORY FLOW',
    description: 'Factory Management System',
    image: '/projects/factory.png',
  },
  {
    title: 'AGODA',
    description: 'Re-design for the AGODA website',
    image: '/projects/agoda.png',
  },
  {
    title: 'BALANCIFY',
    description: 'Work-life balance, simplified and smart',
    image: '/projects/balancify.png',
  },
]
</script>

<style scoped>
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
</style>
