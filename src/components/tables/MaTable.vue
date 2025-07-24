<template>
    <div ref="tableMain" class="table-main">
      <div ref="tablePrepend" :class="`table-prepend ${slots.prepend ? 'prepend-space' : ''}`">
        <slot name="prepend"></slot>
      </div>
      <div ref="tableBody" class="table-body">
        <v-data-table
          :color="props.color"
          :loading="props.loading"
          :headers="props.headers"
          :items="props.items"
          :item-value="itemValue"
          :page="page"
          :items-per-page="row"
          :mobile="$vuetify.display.width < 750 ? true : false"
          class="custom-table-ma"
          :height="heightTable()"
          hide-default-footer
          fixed-header
          :show-select="props.showSelect"
          :search="props.search"
          :single-expand="props.singleExpand"
          :show-expand="props.showExpand"
          v-model:expanded="expand"
          @click:row="(e: any, item: any) => $emit('clickRow', item.item)"
          @dblclick:row="(e: any, item: any) => $emit('dblclick', item.item)"
          @item-expanded="(e: any) => $emit('itemExpanded', e)"
        >
          <!-- scopedSlots -->
          <template v-for="field in scopedSlots()" v-slot:[field]="{ column, headers, item, isExpanded, index }">
            <slot style :name="field" :item="item" :header="column" :headers="headers" :isExpanded="isExpanded" :index="index" />
          </template>
          <template v-slot:loader>
            <v-progress-linear :color="props.color" indeterminate height="5"></v-progress-linear>
          </template>
          <template v-slot:loading>
            <div :class="`text-${props.color}`">Loading...</div>
          </template>
        </v-data-table>
      </div>
      <div ref="tablePagination" v-if="!disablePagination">
        <ma-pgination
          v-if="!props.hideFooter"
          :color="props.color"
          :loading="props.loading"
          :row="row"
          :page="page"
          :total="total"
          :itemPerpage="props.itemPerpage"
          @change="onChangePagination"
        ></ma-pgination>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import MaPgination from '@/components/tables/MaPgination.vue';
  import { useSlots, ref } from 'vue';
  import { useElementSize } from '@vueuse/core';
  const slots : any = useSlots();
  // table header
  type headersModel = {
    title?: string | undefined;
    value: string;
    fixed?: boolean | undefined;
    align?: 'start' | 'end' | 'center' | undefined;
    width?: string | number | undefined;
    minWidth?: string | undefined;
    maxWidth?: string | undefined;
    nowrap?: boolean | undefined;
    sortable?: boolean | undefined;
  };
  type itemPerpageModel = {
    value: number;
    title: string;
  };
  
  // pagination
  const row = defineModel<number>('row', { default: 10 });
  const disablePagination = defineModel<boolean>('disablePagination', { default: false });
  const page = defineModel<number>('page', { default: 1 });
  const total = defineModel<number>('total', { default: 0 });
  const expand = defineModel<string[]>('expand', { default: [] });
  type propsModel = {
    color?: string;
    loading?: boolean;
    headers?: headersModel[];
    items?: any[] | undefined;
    height?: number | 'auto';
    itemValue?: string;
    itemPerpage?: itemPerpageModel[];
    showSelect?: boolean;
    search?: string;
    singleExpand?: boolean;
    expanded?: string[];
    showExpand?: boolean;
    hideFooter?: boolean;
  };
  const props = withDefaults(defineProps<propsModel>(), {
    color: 'primary',
    loading: false,
    headers: () => [],
    items: () => [],
    itemPerpage: () => [
      { value: 10, title: '10' },
      { value: 20, title: '20' },
      { value: 30, title: '30' },
      { value: 40, title: '40' },
      { value: 50, title: '50' }
    ],
    showSelect: false,
    search: '',
    singleExpand: false,
    expanded: () => [],
    showExpand: false,
    hideFooter: false
  });
  
  // size element for set height
  const tableMain = ref(null);
  const tableMainSize = useElementSize(tableMain);
  const hegihtTable = tableMainSize.height;
  const tablePrepend = ref(null);
  const tablePrependSize = useElementSize(tablePrepend);
  const tablePagination = ref(null);
  const tablePaginationSize = useElementSize(tablePagination);
  function heightTable() {
    if (props.height) {
      if (props.height === 'auto') {
        return undefined;
      } else {
        return props.height - tablePrependSize.height.value - tablePaginationSize.height.value;
      }
    } else {
      return hegihtTable.value - tablePrependSize.height.value - tablePaginationSize.height.value;
    }
  }
  
  // change pagination
  export type paginationModel = {
    page: number;
    row: number;
    total: number;
  };
  const emit = defineEmits<{
    (e: 'change', value: paginationModel): void;
    (e: 'clickRow', value: any): void;
    (e: 'dblclick', value: any): void;
    (e: 'update:expanded', value: string): void;
    (e: 'itemExpanded', value: any): void;
  }>();
  
  function onChangePagination(pagination: paginationModel) {
    emit('change', pagination);
  }
  
  // slot custom colums
  function scopedSlots() {
    // เป็น Function ที่จะ Remove scopeSlot ที่ไม่ใช่ของ v-data-table
    const whitList: string[] = ['prepend'];
    const slotsNamelist: string[] = Object.keys(slots);
  
    for (const i of whitList) {
      // Check whitList is exists in slotsNamelist
      const index = slotsNamelist.indexOf(i);
      if (index > -1) {
        slotsNamelist.splice(index, 1);
      }
    }
    return slotsNamelist;
  }
  // update:expanded
  // const expand = computed({
  //   set(value: string) {
  //     emit('update:expanded', value);
  //   },
  //   get() {
  //     return props.expanded;
  //   }
  // })
  </script>
  
  <style lang="scss" scoped>
  // @import '@/scss/style.scss';
  </style>
  