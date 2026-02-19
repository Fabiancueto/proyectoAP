<script setup>
import { cn } from "@/lib/utils"
</script>

<template>
  <li
    data-slot="navigation-menu-item"
    :class="cn('relative', $attrs.class)"
  >
    <slot />
  </li>
</template>
