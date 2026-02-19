<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="sidebar-content"
    class="flex flex-1 flex-col overflow-auto"
  >
    <slot />
  </div>
</template>
