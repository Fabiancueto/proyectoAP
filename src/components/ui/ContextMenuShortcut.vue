<script setup>
import { cn } from "../../lib/utils"
</script>

<template>
  <span
    data-slot="context-menu-shortcut"
    :class="cn('ml-auto text-xs tracking-widest text-muted-foreground', $attrs.class)"
  >
    <slot />
  </span>
</template>
