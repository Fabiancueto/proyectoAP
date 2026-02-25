<script setup lang="ts">
import { inject } from "vue"

interface Props {
  size?: "sm" | "default"
  class?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: "default",
})

const ctx = inject<any>("selectContext")
</script>

<template>
  <button
    ref="ctx.triggerRef"
    type="button"
    data-slot="select-trigger"
    :data-size="size"
    :disabled="disabled"
    @click="ctx.toggle"
    :class="[
      'flex w-full items-center justify-between rounded-md border px-3 text-sm outline-none transition',
      size === 'default' ? 'h-9 py-2' : 'h-8 py-1',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      $props.class
    ]"
  >
    <slot />
    <svg class="w-4 h-4 opacity-50" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 10l5 5 5-5z" />
    </svg>
  </button>
</template>
