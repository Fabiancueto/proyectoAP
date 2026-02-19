<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <main class="flex flex-1 flex-col bg-background">
    <slot />
  </main>
</template>
