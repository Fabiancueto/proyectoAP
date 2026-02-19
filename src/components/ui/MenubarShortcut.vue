<script setup>
import { cn } from "@/lib/utils";
</script>

<template>
  <span
    data-slot="menubar-shortcut"
    :class="cn('text-muted-foreground ml-auto text-xs tracking-widest', $attrs.class)"
  >
    <slot />
  </span>
</template>
