<template>
 <div class="language-switcher">
   <v-menu
     v-model="isMenuOpen"
     offset-y
   >
     <template #activator="{ props }">
       <div
         :style="`color :${colorText} ;`"
         v-bind="props"
         class="lang-display d-flex align-center"
       >
         <img
           v-if="currentLangIcon"
           :src="currentLangIcon"
           alt="language flag"
           class="flag-icon"
         />
         <v-icon class="ml-1">
           {{ isMenuOpen ? 'mdi-menu-up' : 'mdi-menu-down' }}
         </v-icon>
       </div>
     </template>


     <v-list>
       <v-list-item
         v-for="lang in languages"
         :key="lang.value"
         @click="setLanguage(lang.value)"
       >
         <v-list-item-title
         style="display: flex; justify-content: center;"
         >
           <img
             :src="lang.icon"
             :alt="`${lang.label} flag`"
             class="flag-icon"
           />
         </v-list-item-title>
       </v-list-item>
     </v-list>
   </v-menu>
 </div>
</template>

<script setup lang="ts">
import {ref, computed, type CSSProperties } from 'vue'
import { useLanguageStore } from '@/stores/languageStore'
import FlagTH from '@/assets/images/FlagTH.png'
import FlagUK from '@/assets/images/FlagUK.png'

const languageStore = useLanguageStore()
const isMenuOpen = ref(false)

const props = defineProps<{
  color?: string
}>()
const colorText = computed(() => props.color)

const languages = [
 { label: 'TH', value: 'th', icon: FlagTH },
 { label: 'EN', value: 'eng', icon: FlagUK }
]


const currentLangIcon = computed(() => {
 const current = languages.find(lang => lang.value === languageStore.language)
 return current?.icon || ''
})


const setLanguage = (lang: string) => {
 if (lang === 'th' || lang === 'eng') {
   languageStore.setLanguage(lang)
   isMenuOpen.value = false // ปิดเมนูหลังเลือกภาษา
 }
}
</script>
<style scoped>
.lang-display {
 cursor: pointer;
 font-weight: bold;
 user-select: none;
}
.flag-icon {
 width: 22px;
 height: 15px;
 object-fit: cover;
 border-radius: 2px;
}
</style>
