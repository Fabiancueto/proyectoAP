<script setup lang="ts">
import { TooltipProvider } from "radix-vue"

defineProps<{
  delayDuration?: number
}>()
</script>

<template>
  <TooltipProvider
    data-slot="tooltip-provider"
    :delay-duration="delayDuration ?? 0"
  >
    <slot />
  </TooltipProvider>
</template>
