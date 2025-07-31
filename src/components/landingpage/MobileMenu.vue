<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LanguageDD from '@/layouts/LanguageDD.vue';
defineProps<{
  items: any[];
}>();

const emit = defineEmits(['close']);
const router = useRouter();

const openMenus = ref<Record<string, boolean>>({});


function goTo(to: string) {
  router.push(to);
  emit('close');
}
</script>

<template>
  <div>
    <div
      style="background: palegoldenrod; padding: 10px; height: 76px; display: flex; justify-content: space-between; align-items: center;">
      <LanguageDD />
      <v-icon @click="goTo('')">mdi-close</v-icon>

    </div>
      <v-list style="height: 100%;">
    <template v-for="(item, index) in items" :key="item.title">

      <v-list-group
        v-if="item.children"
        v-model="openMenus[item.title]"
        :prepend-icon="item.icon || 'mdi-menu-down'"
        no-action
      >
        <template #activator="{ props }">
          <v-list-item v-bind="props">
            <template #prepend>
              <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
          </v-list-item>
        </template>

        <!-- กรณี children แบบมี group -->
        <template v-if="item.children[0]?.group">
          <div class="vertical-line-wrapper">
            <template v-for="group in item.children" :key="group.group">
              <v-list-subheader>{{ $t(group.group) }}</v-list-subheader>
              <v-list-item
                v-for="sub in group.children"
                :key="sub.title"
                @click="goTo(sub.to)"
                class="sub-item"
              >
                <v-list-item-title style="margin-left: 15px;">
                  <v-icon size="10">mdi-circle-outline</v-icon>
                  {{ $t(sub.title) }}
                </v-list-item-title>
              </v-list-item>
            </template>
          </div>
        </template>

        <!-- กรณี children แบบ list ปกติ -->
        <template v-else>
          <div class="vertical-line-wrapper">
            <v-list-item
              v-for="sub in item.children"
              :key="sub.title"
              @click="goTo(sub.to)"
              class="sub-item"
            >
              <v-list-item-title>
                  <v-icon size="10">mdi-circle-outline</v-icon>
                  {{ $t(sub.title) }}
              </v-list-item-title>
            </v-list-item>
          </div>
        </template>
      </v-list-group>

      <!-- เมนูที่ไม่มี children -->
      <v-list-item v-else @click="goTo(item.to)">
        <template #prepend>
          <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
      </v-list-item>

      <!-- เส้นคั่น -->
      <v-divider class="my-2" v-if="index < items.length - 1" />
    </template>
  </v-list>
  </div>
</template>
<style scoped>
.vertical-line-wrapper {
  position: relative;
  /* padding-left: 15px; เว้นที่ให้เส้นแนวตั้ง */
   /* padding-left: 15px; */
}

.vertical-line-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 28px; /* ปรับตำแหน่งเส้นแนวตั้งจากซ้าย */
  width: 1px; /* ความหนาเส้น */
  background-color: #ccc; /* สีเส้น */
  border-radius: 1px;
}

/* เพิ่มระยะห่างระหว่าง sub-item เพื่อให้เส้นแนวตั้งดูชัด */
.sub-item {
  margin-left: 15px; /* เว้นซ้ายให้ดูเป็นเมนูย่อย */
  padding-left: 10px;
}
</style>
