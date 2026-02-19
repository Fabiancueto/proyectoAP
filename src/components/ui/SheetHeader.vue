<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="sheet-header"
    :class="['flex flex-col gap-1.5 p-4', $props.class]"
  >
    <slot />
  </div>
</template>
