<script setup lang="ts">
import { Toaster as VueSonner } from "vue-sonner"
import { computed } from "vue"
import { useColorMode } from "@vueuse/core"

interface Props {
  theme?: "light" | "dark" | "system"
}

const props = defineProps<Props>()

// Equivalente a next-themes
const colorMode = useColorMode()

const theme = computed(() => {
  if (props.theme) return props.theme
  return colorMode.value === "dark" ? "dark" : "light"
})
</script>

<template>
  <VueSonner
    :theme="theme"
    class="toaster group"
    :style="{
      '--normal-bg': 'var(--popover)',
      '--normal-text': 'var(--popover-foreground)',
      '--normal-border': 'var(--border)',
    }"
    v-bind="$attrs"
  />
</template>
