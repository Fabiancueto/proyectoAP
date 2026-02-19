<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <h2
    data-slot="sheet-title"
    :class="['font-semibold text-foreground', $props.class]"
  >
    <slot />
  </h2>
</template>
