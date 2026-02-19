<script setup lang="ts">
import { inject } from "vue"

defineProps<{ class?: string }>()

const ctx = inject<any>("sheetContext")
</script>

<template>
  <button
    data-slot="sheet-close"
    @click="ctx.close"
    :class="$props.class"
  >
    <slot />
  </button>
</template>
