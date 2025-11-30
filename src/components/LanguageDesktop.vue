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
       <v-icon class="mr-1" size="15">mdi-web</v-icon>
         <span class="lang-text">
           {{ currentLangLabel }}
         </span>
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
         >{{ lang.label }}</v-list-item-title>
       </v-list-item>
     </v-list>
   </v-menu>
 </div>
</template>


<script setup lang="ts">
import {ref, computed, type CSSProperties } from 'vue'
import { useLanguageStore } from '@/stores/languageStore'


const languageStore = useLanguageStore()
const isMenuOpen = ref(false)

const props = defineProps<{
  color?: string
}>()
const colorText = computed(() => props.color)

const languages = [
 { label: 'TH', value: 'th' },
 { label: 'EN', value: 'eng' }
]


const currentLangLabel = computed(() => {
 const current = languages.find(lang => lang.value === languageStore.language)
 return current?.label || ''
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
.lang-text {
 font-size: 14px;
}
</style>
