<script setup>
import { cn } from "@/lib/utils"
</script>

<template>
  <nav
    data-slot="navigation-menu"
    :class="cn('group relative flex max-w-max flex-1 items-center justify-center', $attrs.class)"
  >
    <slot />
  </nav>
</template>
