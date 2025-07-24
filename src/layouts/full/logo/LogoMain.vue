<script setup lang="ts">
import { ref } from 'vue'
let host = ref<string>('')
host.value = window.location.hostname

import { computed } from 'vue'
import LogoManageAiLight from './LogoManageAiLight.vue'
import LogoManageAiDark from './LogoManageAiDark.vue'
import { useCustomizerStore } from '@/stores/customizer'
const customizer = useCustomizerStore()

const dark = computed(() => {
    if (
        customizer.actTheme === 'DarkMaTheme' ||
        customizer.actTheme === 'DarkPurpleTheme' ||
        customizer.actTheme === 'DarkGreenTheme' ||
        customizer.actTheme === 'DarkSpeechBlueTheme' ||
        customizer.actTheme === 'DarkOliveGreenTheme' ||
        customizer.actTheme === 'DarkPinkTheme' ||
        customizer.actTheme === 'DarkYellowTheme' ||
        customizer.actTheme === 'DarkSeaGreenTheme'
    ) {
        return true
    } else {
        return false
    }
})
</script>
<template>
    <LogoManageAiDark v-if="dark" />
    <LogoManageAiLight v-else />
</template>
