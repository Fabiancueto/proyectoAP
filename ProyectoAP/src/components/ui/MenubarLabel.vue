<script setup>
import { cn } from "@/lib/utils";
</script>

<template>
  <div
    data-slot="menubar-label"
    :class="cn('px-2 py-1.5 text-sm font-medium', $attrs.class)"
  >
    <slot />
  </div>
</template>
