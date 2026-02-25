<script setup lang="ts">
import { ref, provide, onMounted, computed } from "vue"
import ScrollBar from "./ScrollBar.vue"

interface Props {
  class?: string
}

defineProps<Props>()

const viewport = ref<HTMLElement | null>(null)

provide("scrollAreaViewport", viewport)
</script>

<template>
  <div
    data-slot="scroll-area"
    :class="['relative overflow-hidden', $props.class]"
  >
    <div
      ref="viewport"
      data-slot="scroll-area-viewport"
      class="size-full rounded-[inherit] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 transition-[color,box-shadow] overflow-auto"
    >
      <slot />
    </div>

    <ScrollBar orientation="vertical" />
    <ScrollBar orientation="horizontal" />
  </div>
</template>
