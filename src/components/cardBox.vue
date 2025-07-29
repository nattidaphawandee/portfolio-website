<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import compenstaionChart from './landingpage/compenstaionChart.vue';

const page = ref({ title: 'Statistics' });
const breadcrumbs = ref([
  {
    title: 'Widget',
    disabled: false,
    href: '#'
  },
  {
    title: 'Statistics',
    disabled: true,
    href: '#'
  }
]);

const cards = shallowRef([
  { earn: 'รายเดือน', text: 'รูปแบบการจ่าย', color: 'primary' },
  { earn: '17 ครั้ง', text: 'จำนวนการจ่าย', color: 'error' },
  { earn: '23,099,012 บาท', text: 'มูลค่ารวมทั้งสิ้น', color: 'success' },
]);
</script>

<template>

  <!-- --------------------------------------------------------------------- -->
  <!-- Cards 1 -->
  <!-- --------------------------------------------------------------------- -->
  <v-row>
    <v-col v-for="(card1, i) in cards" :key="i" cols="12" lg="4" :value="card1">
    <!-- <v-col v-for="(card1, i) in cards" :key="i" cols="12" sm="6" lg="3" :value="card1"> -->
      <v-card elevation="0">
        <v-card variant="outlined">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">
              <div>
                                <span class="text-medium-emphasis">{{ card1.text }}</span>

                <h3 class="text-h3 mb-2">
                  {{ card1.earn }}
                </h3>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>

    
    <!--column 1 -->
    <v-col cols="12" lg="8">
      <v-card elevation="0">
        <v-card variant="outlined">
          <v-card-item>
            <v-card-title class="text-18"> อัตราการจ่ายผลประโยชน์ตอบแทน</v-card-title>
          </v-card-item>
          <v-divider />
         <compenstaionChart></compenstaionChart>
        </v-card>
      </v-card>
    </v-col>
    <!-- column 2 -->
    <v-col cols="12" lg="4">
      <!-- -------------------------------------------------------------------- -->
      <!-- Shares -->
      <!-- -------------------------------------------------------------------- -->
      <v-card elevation="0" class="mb-6 overflow-hidden">
        <v-card variant="outlined">
          <v-row>
            <v-col cols="6" sm="6" class="pa-9 pb-6 border-blue-right">
              <v-card-text class="pa-0">
                <div class="d-flex align-center">
                  <div class="ml-6 text-center">
                    <h5 class="text-subtitle-1 mt-1">1000</h5>
                    <span class="text-medium-emphasis text-subtitle-2 text-uppercase">Shares</span>
                  </div>
                </div>
              </v-card-text>
            </v-col>
            <v-col cols="6" sm="6" class="pa-9 pb-6 pl-4 pl-sm-9">
              <v-card-text class="pa-0">
                <div class="d-flex align-center">
            

                  <div class="ml-6 text-center">
                    <h5 class="text-subtitle-1 mt-1">600</h5>
                    <span class="text-medium-emphasis text-subtitle-2 text-uppercase">NETWORK</span>
                  </div>
                </div>
              </v-card-text>
            </v-col>

            <v-divider />
            <v-col cols="6" sm="6" class="pa-9 pt-6 border-blue-right">
              <v-card-text class="pa-0">
                <div class="d-flex align-center">
                  <v-btn class="text-primary" color="lightprimary" icon variant="flat">
                  </v-btn>

                  <div class="ml-6 text-center">
                    <h5 class="text-subtitle-1 mt-1">3550</h5>
                    <span class="text-medium-emphasis text-subtitle-2 text-uppercase">RETURNS</span>
                  </div>
                </div>
              </v-card-text>
            </v-col>
            <v-col cols="6" sm="6" class="pa-9 pt-6 pl-4 pl-sm-9">
              <v-card-text class="pa-0">
                <div class="d-flex align-center">
                  <v-btn class="text-primary" color="lightprimary" icon variant="flat">
                  </v-btn>

                  <div class="ml-6 text-center">
                    <h5 class="text-subtitle-1 mt-1">100%</h5>
                    <span class="text-medium-emphasis text-subtitle-2 text-uppercase">Order</span>
                  </div>
                </div>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-col>
    
  </v-row>
</template>
