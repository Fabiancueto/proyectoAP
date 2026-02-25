<script setup lang="ts">
import { inject } from "vue"

interface Props {
  class?: string
}

defineProps<Props>()
const ctx = inject<any>("selectContext")
</script>

<template>
  <div
    v-if="ctx.open.value"
    ref="ctx.contentRef"
    data-slot="select-content"
    class="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-md max-h-60 overflow-auto"
  >
    <slot />
  </div>
</template>
