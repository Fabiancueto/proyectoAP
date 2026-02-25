<script setup>
import { cn } from "@/lib/utils"
</script>

<template>
  <div class="absolute top-full left-0 flex justify-center w-full">
    <div
      data-slot="navigation-menu-viewport"
      :class="cn(
        'bg-popover text-popover-foreground mt-2 w-full md:w-[400px] rounded-md border shadow overflow-hidden',
        $attrs.class
      )"
    >
      <slot />
    </div>
  </div>
</template>
