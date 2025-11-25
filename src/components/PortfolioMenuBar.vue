<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

type NavItem = {
  id: string;
  label: string;
};

const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education-work', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certification' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

const isVisible = ref(false);
const activeSection = ref(navItems[0].id);

const findActiveSection = () => {
  const scrollPosition = window.scrollY + window.innerHeight / 3;

  for (const item of navItems) {
    const el = document.getElementById(item.id);
    if (!el)
      continue;

    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const bottom = top + el.offsetHeight;

    if (scrollPosition >= top && scrollPosition < bottom) {
      activeSection.value = item.id;
      return;
    }
  }
};

const handleScroll = () => {
  isVisible.value = window.scrollY > 120;
  findActiveSection();
};

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el)
    return;

  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <transition name="fade">
    <v-app-bar
      v-if="isVisible"
      class="menu-app-bar"
      flat
      color="rgba(255, 255, 255, 0.95)"
    >
      <v-toolbar-title class="font-weight-bold text-primary">Nattida Phawandee</v-toolbar-title>
      <v-spacer />
      <div class="d-flex align-center">
        <v-btn
          v-for="item in navItems"
          :key="item.id"
          variant="text"
          class="text-capitalize mx-1"
          :color="activeSection === item.id ? 'primary' : undefined"
          @click="scrollToSection(item.id)"
        >
          {{ item.label }}
        </v-btn>
      </div>
    </v-app-bar>
  </transition>
</template>

<style scoped>
.menu-app-bar {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 1100px;
  border-radius: 0px 0px 999px 0px;
  /* border-radius: 999px; */
  /* border-top-left-radius: 0px  0px; */
  /* border-top-right-radius: 0px  0px; */
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(18px);
  z-index: 50;
  padding-inline: 12px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .menu-app-bar {
    width: calc(100% - 24px);
    top: 12px;
  }

  .menu-app-bar .v-btn {
    min-width: unset;
    font-size: 0.85rem;
  }
}
</style>
