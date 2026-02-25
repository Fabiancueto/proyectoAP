<script setup>
import { cn } from "@/lib/utils";
</script>

<template>
  <div
    data-slot="menubar-item"
    :class="cn('focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm select-none', $attrs.class)"
  >
    <slot />
  </div>
</template>
