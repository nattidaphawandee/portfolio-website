<template>
  <div>
      <v-card class="layout-card-Box">
        <div>
          <div class="form-add-edit-title">{{ props.title }}</div>
          <hr class="form-add-edit-hr" />
        </div>
      </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// const disabledCancel = defineModel<boolean>('disabledCancel', { default: false });
// const disabledConfirm = defineModel<boolean>('disabledConfirm', { default: false });

let valid = ref<boolean>(true);
import { useCustomizerStore } from '@/stores/customizer';
const customizer = useCustomizerStore();
type propsModel = {
  maxWidth?: number;
  title?: string;
};
const props = withDefaults(defineProps<propsModel>(), {
  maxWidth: 500,
  title: '',
});

</script>

<style lang="scss" scoped>
.layout-card-Box{
   display: flex;
// flex-direction: column;
// justify-content: center;
// align-items: flex-start;
// padding: 16px;
// gap: 19px;
 flex: 2;
            margin: 15px;
            padding: 40px;
            border: 2px solid #ccc;

// width: 405.67px;
height: 131px;

// background: #FFFFFF;
background: orange;

/* Drop Shadow */
box-shadow: 0px 0px 12px rgba(198, 198, 198, 0.49);

}
</style>
