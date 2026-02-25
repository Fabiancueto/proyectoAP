<script setup lang="ts">
import { ref, inject, onMounted } from "vue"

interface Props {
  defaultSize?: number // porcentaje (0-100)
  minSize?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultSize: 50,
  minSize: 10,
})

const panel = ref<HTMLElement | null>(null)

onMounted(() => {
  if (panel.value) {
    panel.value.style.flexBasis = props.defaultSize + "%"
  }
})
</script>

<template>
  <div
    ref="panel"
    data-slot="resizable-panel"
    :class="['relative overflow-auto', $props.class]"
  >
    <slot />
  </div>
</template>
