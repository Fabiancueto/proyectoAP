<script setup>
import { cn } from "@/lib/utils"
</script>

<template>
  <div
    data-slot="navigation-menu-content"
    :class="cn(
      'absolute top-full left-0 w-full md:w-auto bg-popover text-popover-foreground rounded-md border shadow p-2',
      $attrs.class
    )"
  >
    <slot />
  </div>
</template>
