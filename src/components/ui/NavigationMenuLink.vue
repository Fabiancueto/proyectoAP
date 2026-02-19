<script setup>
import { cn } from "@/lib/utils"
</script>

<template>
  <a
    data-slot="navigation-menu-link"
    :class="cn(
      'flex flex-col gap-1 rounded-sm p-2 text-sm hover:bg-accent hover:text-accent-foreground transition',
      $attrs.class
    )"
  >
    <slot />
  </a>
</template>
