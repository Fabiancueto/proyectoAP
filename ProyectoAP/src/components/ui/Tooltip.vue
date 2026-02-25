<script setup lang="ts">
import { TooltipRoot } from "radix-vue"
import TooltipProvider from "./TooltipProvider.vue"
</script>

<template>
  <TooltipProvider>
    <TooltipRoot data-slot="tooltip">
      <slot />
    </TooltipRoot>
  </TooltipProvider>
</template>
