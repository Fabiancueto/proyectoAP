<script setup lang="ts">
import { inject } from "vue"

defineProps<{ class?: string }>()

const ctx = inject<any>("sheetContext")
</script>

<template>
  <div
    v-if="ctx.open.value"
    data-slot="sheet-overlay"
    class="fixed inset-0 z-50 bg-black/50 transition-opacity duration-300"
    @click="ctx.close"
  />
</template>
