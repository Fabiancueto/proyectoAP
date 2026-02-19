<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <div
    data-slot="sheet-footer"
    :class="['mt-auto flex flex-col gap-2 p-4', $props.class]"
  >
    <slot />
  </div>
</template>
