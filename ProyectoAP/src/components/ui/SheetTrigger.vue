<script setup lang="ts">
import { inject } from "vue"

defineProps<{ class?: string }>()

const ctx = inject<any>("sheetContext")
</script>

<template>
  <button
    data-slot="sheet-trigger"
    @click="ctx.openSheet"
    :class="$props.class"
  >
    <slot />
  </button>
</template>
