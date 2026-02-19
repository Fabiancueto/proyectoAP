<script setup lang="ts">
import { provide, ref, onMounted } from "vue"

interface Props {
  direction?: "horizontal" | "vertical"
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  direction: "horizontal",
})

const container = ref<HTMLElement | null>(null)

provide("resizableGroup", {
  direction: props.direction,
  container,
})
</script>

<template>
  <div
    ref="container"
    data-slot="resizable-panel-group"
    :data-panel-group-direction="direction"
    :class="[
      'flex h-full w-full',
      direction === 'vertical' ? 'flex-col' : '',
      $props.class
    ]"
  >
    <slot />
  </div>
</template>
