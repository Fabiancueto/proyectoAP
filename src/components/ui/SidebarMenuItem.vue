<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <li class="relative">
    <slot />
  </li>
</template>
