<script setup>
import { cn } from "@/lib/utils"
</script>

<template>
  <ul
    data-slot="navigation-menu-list"
    :class="cn('group flex flex-1 list-none items-center justify-center gap-1', $attrs.class)"
  >
    <slot />
  </ul>
</template>
