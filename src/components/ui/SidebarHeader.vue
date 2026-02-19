<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <div class="p-2 flex flex-col gap-2">
    <slot />
  </div>
</template>
