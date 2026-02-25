<script setup>
import { cn } from "@/lib/utils";
</script>

<template>
  <div
    data-slot="menubar-separator"
    :class="cn('bg-border -mx-1 my-1 h-px', $attrs.class)"
  />
</template>
