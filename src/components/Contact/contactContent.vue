<script setup lang="ts">
import { ref, onMounted, onUnmounted ,computed} from 'vue'
import { FiltersLanguage } from "@/utils/language";

import thankCute from '@/assets/images/ThankCute02.gif'
const contactLinkData = [
  {
    labelTh: 'อีเมล',
    labelEng: 'Email',
    value: 'nattida.phawandee@gmail.com',
    link: 'mailto:nattida.phawandee@gmail.com',
    icon: 'mdi-email',
  },
  {
    labelTh: 'เบอร์โทร',
    labelEng: 'Phone',
    value: '0991312183',
    link: 'tel:0991312183',
    icon: 'mdi-phone',
  },
]
const contactLinks = computed(() =>
  contactLinkData.map((contact) => ({
    ...contact,
    label: FiltersLanguage(contact as any, 'label'),
  })),
)
const thankText = { 
  titleTh: 'หากต้องการพูดคุยเรื่องงานสามารถติดต่อได้ตามทางช่องทางด้านล่างค่ะ ยินดีรับฟังทุกโอกาสใหม่ ๆ เสมอ', 
  titleEng: 'If you’d like to discuss work opportunities, feel free to reach out through the contact channels below. I’m always open to new opportunities.' }
const thankMsgText = computed(() => FiltersLanguage(thankText as any, 'title'))
</script>

<template>
  <div>
    <p class="text-lightsecondary text-overline font-weight-medium mb-2">Thank you for watching</p>
    <p class="text-body-1 text-medium-emphasis mb-6">
      {{ thankMsgText }}
    </p>
    <div class="contact-grid">
      <div v-for="contact in contactLinks" :key="contact.label" class="contact-item">
        <a :href="contact.link" class="contact-link">
          <div class="contact-icon">
            <v-icon color="lightText">{{ contact.icon }}</v-icon>
          </div>
          <div class="contact-info">
            <div class="link-label text-caption text-medium-emphasis">{{ contact.label }}</div>
            <div class="link-value text-subtitle-1 font-weight-medium">{{ contact.value }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// .contact-section {
//   background: #fff8f4;
// }

.message-card {
  padding: 18px 24px;
  border-radius: 22px;
  background: linear-gradient(140deg, #ffffff 0%, #ffece2 100%);
  border: 1px solid rgba(201, 189, 179, 0.4);
  box-shadow: 0 16px 38px rgba(70, 63, 57, 0.08);
}

.contact-grid {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  // padding-left: 32px;
  // padding-right: 32px;
}

.contact-item {
  flex: 1;
  min-width: 260px;
}

.contact-link {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  // justify-content: center;
  gap: 8px;

  border-radius: 18px;

  text-decoration: none;
  color: inherit;
  transition: transform 0.4s ease, box-shadow 0.2s ease;
  // min-height: 100px;
}

.contact-link:hover {
  transform: translateY(-4px);
}


.badge {
  display: inline-flex;
  padding: 6px 18px;
  border-radius: 999px;
  background: rgba(51, 78, 104, 0.08);
  color: #23445a;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.contact-icon {
  width: 48px;
  height: 48px;
  display: flex;
  border-radius: 16px;
  background: rgba(var(--v-theme-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-info {
  // display: none;
  flex-direction: row;
  gap: 4px;
}
</style>
