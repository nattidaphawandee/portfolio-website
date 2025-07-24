<template>
  <div class="layout-switch">
    <label class="switch">
      <input v-model="model" type="checkbox" name="" id="" :disabled="props.loading" />
      <div @click="change()" class="slider"></div>
    </label>
  </div>
</template>

<script setup lang="ts">
type propsModel = {
  loading?: boolean;
};
const props = withDefaults(defineProps<propsModel>(), {
  loading: false,
});
// import { watch } from 'vue';
const emit = defineEmits<{
  (e: 'change', value: boolean): void;
}>();
const model = defineModel<boolean>({ default: false });
function change() {
  if(!props.loading){
    emit('change', !model.value);
  }
}
</script>

<style lang="css" scoped>
.layout-switch {
  display: flex;
  justify-content: center;
  align-content: center;
}
:root {
  --bg1: #e0e0e0e0;
  --bg2: #100f12;
  --orange: #ffc207;
  --dark-purple: #27173a;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px; /*30px*/
  border-radius: 50px;
  overflow: hidden;
}

input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  /* background-color: #27173a; */
  background: rgba(var(--v-theme-lightprimary));
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50px;
  transition: all 0.4s;
  cursor: pointer;
}

.slider::before {
  position: absolute;
  content: '';
  background: #ffc207;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 5px;
  bottom: 5px; /**5px */
  transition: 0.4s;
}

.slider::after {
  position: absolute;
  content: '';
  /* background: #27173a; */
  background: rgba(var(--v-theme-lightprimary));
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: -26px;
  bottom: 4px;
  transition: 0.4s;
}

input:checked + .slider::before {
  transform: translateX(24px);
}

input:checked + .slider {
  background: rgba(var(--v-theme-primary));
}

input:checked + .slider::after {
  transform: translateX(47px);
  background: rgba(var(--v-theme-primary));
}
</style>
