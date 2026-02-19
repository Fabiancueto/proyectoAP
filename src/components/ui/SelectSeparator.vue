<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="select-separator"
    :class="['my-1 h-px bg-border', $props.class]"
  />
</template>
