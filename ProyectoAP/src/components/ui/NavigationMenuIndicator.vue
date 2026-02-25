<script setup>
import { cn } from "@/lib/utils"
</script>

<template>
  <div
    data-slot="navigation-menu-indicator"
    :class="cn('flex justify-center mt-1', $attrs.class)"
  >
    <div class="bg-border h-2 w-2 rotate-45 rounded-tl-sm shadow-md"></div>
  </div>
</template>
