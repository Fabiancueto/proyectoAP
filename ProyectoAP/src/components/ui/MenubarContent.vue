<script setup>
import { cn } from "@/lib/utils";
</script>

<template>
  <div
    data-slot="menubar-content"
    :class="cn('bg-popover text-popover-foreground z-50 min-w-[12rem] overflow-hidden rounded-md border p-1 shadow-md', $attrs.class)"
  >
    <slot />
  </div>
</template>
