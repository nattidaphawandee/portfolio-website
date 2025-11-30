import { useLanguageStore } from '@/stores/languageStore'

export function FiltersLanguage(data: Record<string, any>, key: string): string {
 const languageStore = useLanguageStore()
 const lang = languageStore.language
 // แปลงภาษา th ➜ Th, eng ➜ Eng
 const langSuffix = lang === 'th' ? 'Th' : 'Eng'
 const withLangKey = `${key}${langSuffix}`

 // ถ้ามี key ที่ตรงกับชื่อ + ภาษาที่เลือก
 if (withLangKey in data) {
   return data[withLangKey]
 }

 // ถ้าไม่มี key ภาษานั้น ➜ ใช้ key ปกติ
 if (key in data) {
   return data[key]
 }

 return ''
}


//แปลงเมนู
export function localizeMenuItems(rawItems: any[]) {
  const languageStore = useLanguageStore()
  const lang = languageStore.language
  const suffix = lang === 'th' ? 'Th' : 'Eng'

  function localize(item: any): any {
    const localizedTitle = item[`title${suffix}`] ?? item.title ?? ''
    const newItem: any = {
      ...item,
      title: localizedTitle,
    }

    if (item.groupTh || item.groupEng) {
      newItem.group = item[`group${suffix}`] ?? item.group ?? ''
    }

    if (item.children && Array.isArray(item.children)) {
      newItem.children = item.children.map(localize)
    }

    return newItem
  }

  return rawItems.map(localize)
}