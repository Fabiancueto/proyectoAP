<script setup>
import { cn } from "@/lib/utils";
</script>

<template>
  <button
    data-slot="menubar-trigger"
    :class="cn('focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none', $attrs.class)"
  >
    <slot />
  </button>
</template>
