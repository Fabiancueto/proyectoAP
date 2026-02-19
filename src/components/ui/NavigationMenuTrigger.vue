<script setup>
import { cn } from "@/lib/utils"
</script>

<template>
  <button
    data-slot="navigation-menu-trigger"
    :class="cn(
      'group inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition',
      $attrs.class
    )"
  >
    <slot />
    <svg
      class="ml-1 size-3 transition-transform duration-300 group-hover:rotate-180"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M7 10l5 5 5-5z"/>
    </svg>
  </button>
</template>
