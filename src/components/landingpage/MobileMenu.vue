<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
  <v-list dense>
    <template v-for="item in items" :key="item.title">
      <v-list-group v-if="item.children" v-model="openMenus[item.title]" :prepend-icon="item.icon || 'mdi-menu-down'"
        no-action>
        <template #activator="{ props }">
          <v-list-item v-bind="props">
            <template #prepend>
              <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </template>

        <!-- children แบบมี group -->
        <template v-if="item.children[0]?.group">
          <template v-for="group in item.children" :key="group.group">
            <v-list-subheader>{{ group.group }}</v-list-subheader>
            <v-list-item v-for="sub in group.children" :key="sub.title" @click="goTo(sub.to)">
              <v-list-item-title>{{ sub.title }}</v-list-item-title>
            </v-list-item>
          </template>
        </template>

        <!-- children แบบ list ปกติ -->
        <template v-else>
          <v-list-item v-for="sub in item.children" :key="sub.title" @click="goTo(sub.to)">
            <v-list-item-title>{{ sub.title }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list-group>

      <!-- เมนูที่ไม่มี children -->
      <v-list-item v-else @click="goTo(item.to)">
        <template #prepend>
          <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
      
    </template>
  </v-list>
</template>
