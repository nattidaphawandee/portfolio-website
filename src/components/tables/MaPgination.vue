<template>
    <div class="pagination-main">
      <div class="title-pagination">Rows per page :</div>
      <div class="pl-1">
        <v-select
          v-model="row"
          :items="props.itemPerpage"
          variant="underlined"
          hide-details
          density="compact"
          @update:modelValue="onChangePagination('selecter')"
          :disabled="loading"
          :color="props.color"
        ></v-select>
      </div>
      <div class="title-pagination-page">
        {{ row * (page - 1) + 1 }} - {{ row * (page - 1) + row >= total ? total : row * (page - 1) + row }} of
        {{ total }}
      </div>
      <div class="pagination-btn">
        <div>
          <v-btn
            icon="mdi-chevron-left"
            variant="text"
            density="compact"
            :color="props.color"
            :disabled="page <= 1"
            @click="page--, onChangePagination('button')"
            :loading="loading"
          ></v-btn>
        </div>
        <div>
          <v-btn
            icon="mdi-chevron-right"
            variant="text"
            density="compact"
            :color="props.color"
            :disabled="page >= Math.ceil(total / row)"
            @click="page++, onChangePagination('button')"
            :loading="loading"
          ></v-btn>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // table header
  type itemPerpageModel = {
    value: number;
    title: string;
  };
  
  type propsModel = {
    itemPerpage?: itemPerpageModel[];
    loading?: boolean;
    color?: string;
  };
  const props = withDefaults(defineProps<propsModel>(), {
    itemPerpage: () => [
      { value: 10, title: '10' },
      { value: 20, title: '20' },
      { value: 30, title: '30' },
      { value: 40, title: '40' },
      { value: 50, title: '50' }
    ],
    loading: false,
    color: 'primary'
  });
  
  const row = defineModel<number>('row', { default: 10 });
  const page = defineModel<number>('page', { default: 1 });
  const total = defineModel<number>('total', { default: 0 });
  
  // change
  export type paginationModel = {
    page: number;
    row: number;
    total: number;
  };
  const emit = defineEmits<{
    (e: 'change', value: paginationModel): void;
  }>();
  
  function onChangePagination(from: 'button' | 'selecter') {
    if (from === 'selecter') {
      page.value = 1;
    }
    let pagination: paginationModel = { page: page.value, row: row.value, total: total.value };
    emit('change', pagination);
  }
  </script>
  
  <style lang="scss" scoped></style>
  