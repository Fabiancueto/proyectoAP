<script setup>
import { computed } from "vue";
import { ProgressRoot, ProgressIndicator } from "radix-vue";
import { cn } from "../utils";

const props = defineProps({
  value: {
    type: Number,
    default: 0
  },
  class: String
});

const indicatorStyle = computed(() => {
  const val = props.value ?? 0;
  return {
    transform: `translateX(-${100 - val}%)`
  };
});
</script>

<template>
  <ProgressRoot
    data-slot="progress"
    :class="cn(
      'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
      props.class
    )"
  >
    <ProgressIndicator
      data-slot="progress-indicator"
      class="bg-primary h-full w-full flex-1 transition-all"
      :style="indicatorStyle"
    />
  </ProgressRoot>
</template>
