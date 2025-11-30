import { defineStore } from 'pinia'
import { router } from '@/router'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    //ส่วนใช้เปลี่ยยภาษา
    language: 'th' as 'th' | 'eng',
  }),
  getters: {
    getLanguage(state) {
      return state.language
    },
  },
  actions: {
    setLanguage(lang: 'th' | 'eng') {
      this.language = lang
      localStorage.setItem('language', lang)
      // ✅ อัปเดต query.lg ใน URL
      const currentRoute = router.currentRoute.value
      const currentQuery = { ...currentRoute.query }

      // ถ้าค่าใหม่ต่างจากเดิม → replace query
      if (currentQuery.lg !== lang) {
        router.replace({
          path: currentRoute.path,
          query: { ...currentQuery, lg: lang },
        })
      }
    },
  },
})
