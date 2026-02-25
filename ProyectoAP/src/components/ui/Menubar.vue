<script setup>
import { cn } from "@/lib/utils";
</script>

<template>
  <div data-slot="menubar" :class="cn('bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs', $attrs.class)">
    <slot />
  </div>
</template>
