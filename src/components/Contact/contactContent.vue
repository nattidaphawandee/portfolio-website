<script setup>
import thankCute from '@/assets/images/ThankCute02.gif'
const contactLinks = [
  { label: 'อีเมล', value: 'nattida.phawandee@gmail.com', link: 'mailto:nattida.phawandee@gmail.com' },
  { label: 'โทรศัพท์', value: '0991312183', link: 'tel:0991312183' },
]
</script>

<template>
  <div>
    <p class="text-lightsecondary text-overline font-weight-medium mb-2">Thank you for watching</p>
    <p class="text-body-1 text-medium-emphasis mb-6">
      หากต้องการพูดคุยเรื่องงาน
      สามารถติดต่อได้ทางช่องทางด้านล่าง ฉันยินดีรับฟังทุกโอกาสใหม่ ๆ เสมอ
    </p>
    <div class="contact-grid">
      <div v-for="contact in contactLinks" :key="contact.label" class="contact-item">
        <a :href="contact.link" class="contact-link">
          <div class="link-label text-caption text-medium-emphasis">{{ contact.label }}</div>
          <div class="link-value text-subtitle-1 font-weight-medium">{{ contact.value }}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-section {
  /* background: #fff8f4; */
}

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
  align-items: stretch;
  flex-wrap: wrap;
}

.contact-item {
  flex: 1;
  min-width: 260px;
}

.contact-link {
  display: block;
  padding: 16px 20px;
  border-radius: 18px;
  /* border: 1px solid rgba(201, 189, 179, 0.35);
  background: #fff;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05); */
  text-decoration: none;
  color: inherit;
  width: 100%;
  height: 100%;
  transition: transform 0.4s ease, box-shadow 0.2s ease;
}

.contact-link:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(201, 189, 179, 0.35);
  background: #fff;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);
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


@media (max-width: 960px) {
  .thankyou-card {
    margin-top: 32px;
  }
}
</style>
