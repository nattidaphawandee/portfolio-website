<script setup lang="ts">
import { computed } from 'vue';

interface MenuChild {
  title: string;
  to: string;
}
interface MenuGroup {
  group: string;
  children: MenuChild[];
}
interface MenuItem {
  title: string;
  to?: string;
  icon?: string;
  children?: (MenuChild | MenuGroup)[];
}

const props = defineProps<{ items: MenuItem[] }>();

const isGroupItem = (item: MenuChild | MenuGroup): item is MenuGroup =>
  Object.prototype.hasOwnProperty.call(item, 'group');
</script>

<template>
  <template v-for="(item, index) in items" :key="index">
    <!-- เมนูปกติ -->
    <v-btn v-if="!item.children" :to="item.to" variant="text" color="primary">
      {{ item.title }}
    </v-btn>

    <!-- เมนูมี children -->
    <v-menu v-else offset-y>
      <template #activator="{ props: menuProps }">
        <v-btn v-bind="menuProps" variant="text" color="primary">
          {{ item.title }}
          <v-icon end>mdi-menu-down</v-icon>
        </v-btn>
      </template>

      <v-card class="pa-3" style="background-color: lightblue; min-width: 300px;">
        <!-- ถ้าเป็นเมนูกลุ่มแบบซับซ้อน เช่น นักลงทุนสัมพันธ์ -->
        <template v-if="item.children && isGroupItem(item.children[0])">
          <v-row dense>
            <v-col v-for="(group, i) in item.children" :key="i" cols="12" md="3">
              <strong>{{ (group as MenuGroup).group }}</strong>
              <v-list density="compact">
                <v-list-item
                  v-for="(child, j) in (group as MenuGroup).children"
                  :key="j"
                  :to="child.to"
                >
                  <v-list-item-title>{{ child.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </template>

        <!-- เมนู children ธรรมดา -->
        <template v-else>
          <v-list density="compact">
            <v-list-item
              v-for="(child, j) in item.children"
              :key="j"
              :to="(child as MenuChild).to"
            >
              <v-list-item-title>{{ (child as MenuChild).title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </template>
      </v-card>
    </v-menu>
  </template>
</template>
