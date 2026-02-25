<script setup lang="ts">
interface Props {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  orientation: "horizontal",
  decorative: true,
})
</script>

<template>
  <div
    data-slot="separator-root"
    :role="decorative ? undefined : 'separator'"
    :aria-orientation="orientation"
    :data-orientation="orientation"
    :class="[
      'bg-border shrink-0',
      orientation === 'horizontal'
        ? 'h-px w-full'
        : 'h-full w-px',
      $props.class
    ]"
  />
</template>
