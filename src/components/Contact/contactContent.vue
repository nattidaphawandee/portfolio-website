<script setup>
const contactLinks = [
  { label: 'อีเมล', value: 'natida.phawan@gmail.com', link: 'mailto:natida.phawan@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/natidaphawan', link: 'https://www.linkedin.com/in/natidaphawan/' }
]
</script>

<template>
  <section class="contact-section py-12" id="contact">
    <v-container class="maxWidth">
      <v-row class="align-center">
        <v-col cols="12" md="7">
          <p class="text-primary text-overline font-weight-medium mb-2">Thank you for watching</p>
          <h2 class="text-sm-h1 text-h2 font-weight-bold mb-4">
            ขอบคุณที่ติดตามจนจบ
          </h2>
          <p class="text-body-1 text-medium-emphasis mb-6">
            หากต้องการพูดคุยเรื่องงาน ออกแบบโปรเจกต์ หรือแลกเปลี่ยนไอเดียเกี่ยวกับ Front-end & UX
            สามารถติดต่อได้ทางช่องทางด้านล่าง ฉันยินดีรับฟังทุกโอกาสใหม่ ๆ เสมอ
          </p>
          <v-row class="mt-6">
            <v-col
              v-for="contact in contactLinks"
              :key="contact.label"
              cols="12"
              sm="6"
            >
              <a :href="contact.link" class="contact-link">
                <div class="link-label text-caption text-medium-emphasis">{{ contact.label }}</div>
                <div class="link-value text-subtitle-1 font-weight-medium">{{ contact.value }}</div>
              </a>
            </v-col>
          </v-row>

          <v-btn
            class="mt-4"
            color="primary"
            variant="flat"
            rounded="pill"
            size="large"
            href="mailto:natida.phawan@gmail.com"
          >
            ส่งอีเมลหาเรา
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.contact-section {
  background: #fff8f4;
}

.message-card {
  padding: 18px 24px;
  border-radius: 22px;
  background: linear-gradient(140deg, #ffffff 0%, #ffece2 100%);
  border: 1px solid rgba(201, 189, 179, 0.4);
  box-shadow: 0 16px 38px rgba(70, 63, 57, 0.08);
}

.contact-link {
  display: block;
  padding: 16px 20px;
  border-radius: 18px;
  border: 1px solid rgba(201, 189, 179, 0.35);
  background: #fff;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.contact-link:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.08);
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
