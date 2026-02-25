<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <p
    data-slot="sheet-description"
    :class="['text-sm text-muted-foreground', $props.class]"
  >
    <slot />
  </p>
</template>
