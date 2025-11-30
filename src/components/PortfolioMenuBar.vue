<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import LanguageSwitcher from './LanguageDesktop.vue';
import { useCustomizerStore } from '@/stores/customizer';

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
const isMobile = ref(false);
const isDrawerOpen = ref(false);
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

const handleResize = () => {
  isMobile.value = window.innerWidth <= 800;

  if (!isMobile.value) {
    isDrawerOpen.value = false;
  }
};

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el)
    return;

  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const handleNavClick = (id: string) => {
  scrollToSection(id);

  if (isMobile.value) {
    isDrawerOpen.value = false;
  }
};

const customizer = useCustomizerStore();

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleResize, { passive: true });
  handleScroll();
  handleResize();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <transition name="fade">
    <div v-if="isVisible">
      <v-app-bar
        v-if="!isMobile"
        class="menu-app-bar"
        flat
      >
        <v-toolbar-title class="font-weight-bold text-secondary">Nattida</v-toolbar-title>
        <v-spacer />
        <div class="d-flex align-center">
          <v-btn
            v-for="item in navItems"
            :key="item.id"
            variant="text"
            class="text-capitalize mx-1"
            :color="activeSection === item.id ? 'secondary' : undefined"
            @click="scrollToSection(item.id)"
          >
            {{ item.label }}
          </v-btn>
        
          <!-- เปลี่ยนภาษา -->
           <LanguageSwitcher/>
          <v-btn
            class="select-color-btn ml-4"
            color="secondary"
            variant="flat"
            @click.stop="customizer.SET_CUSTOMIZER_DRAWER(true)"
          >
            <v-icon>mdi-palette</v-icon>
          </v-btn>
        </div>
      </v-app-bar>

      <div
        v-else
        class="mobile-menu-container"
      >
        <v-btn
          icon="mdi-menu"
          class="mobile-menu-btn"
          size="large"
          color="secondary"
          elevation="6"
          @click="isDrawerOpen = true"
        />

        <v-navigation-drawer
          v-model="isDrawerOpen"
          class="mobile-drawer"
          color="rgba(#F0E7D5, 0.98)"
          location="right"
          temporary
          width="280"
        >
        <div style="width: 100%; display: flex; justify-content: space-between; align-items: center;">
          <!-- เปลี่ยนภาษา -->
          <LanguageSwitcher/>
          <v-btn
            class="select-color-btn"
            size="small"
            variant="flat"
            color="secondary"
            @click.stop="customizer.SET_CUSTOMIZER_DRAWER(true)"
          >
           <v-icon>mdi-palette</v-icon>
          </v-btn>
          <v-btn
          icon="mdi-close"
          size="large"
          variant="text"
          color="secondary"
          elevation="0"
          @click="isDrawerOpen = false"
        />
        </div>
          <!-- <div class="mobile-drawer-header">
            <v-avatar
              class="me-3"
              color="secondary"
              size="42"
            >
              <span class="text-white text-h6">NP</span>
            </v-avatar>
            
            <div>
              <p class="text-secondary text-subtitle-1 mb-0 font-weight-bold">Nattida Phawandee</p>
              <p class="text-medium-emphasis text-caption mb-0">Navigate portfolio</p>
            </div>
          </div> -->
          <v-divider class="my-2" />
          <v-list density="comfortable">
            <v-list-item
              v-for="item in navItems"
              :key="item.id"
              class="text-capitalize"
              rounded="xl"
              :active="activeSection === item.id"
              :color="activeSection === item.id ? 'secondary' : undefined"
              @click="handleNavClick(item.id)"
            >
              <template #title>
                <span :class="activeSection === item.id ? 'text-secondary' : 'text-medium-emphasis'">
                  {{ item.label }}
                </span>
              </template>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </div>
    </div>
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
  z-index: 9999;
  padding-inline: 12px;    
  color: rgba(var(--v-theme-TextMenu));
    
  /* color="rgba(#F0E7D5, 0.95)" */

}

.mobile-menu-container {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 60;
}

.mobile-menu-btn {
  border-radius: 999px;
}

.mobile-drawer :deep(.v-navigation-drawer__content) {
  padding: 20px;
}

.mobile-drawer-header {
  display: flex;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.select-color-btn {
  text-transform: none;
  border-radius: 999px;
  font-weight: 600;
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
