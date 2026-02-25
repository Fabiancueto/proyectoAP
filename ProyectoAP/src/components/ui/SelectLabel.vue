<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="select-label"
    :class="['px-2 py-1.5 text-xs text-muted-foreground', $props.class]"
  >
    <slot />
  </div>
</template>
