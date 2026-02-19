<script setup lang="ts">
import { computed } from "vue"
import {
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderThumb,
} from "radix-vue"
import { cn } from "../../lib/utils"

interface Props {
  modelValue?: number[] | number
  defaultValue?: number[]
  min?: number
  max?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
})

const emit = defineEmits<{
  (e: "update:modelValue", value: number[]): void
}>()

const values = computed<number[]>(() => {
  if (Array.isArray(props.modelValue)) return props.modelValue
  if (Array.isArray(props.defaultValue)) return props.defaultValue
  return [props.min, props.max]
})

function updateValue(val: number[] | undefined) {
  if (val !== undefined) {
    emit("update:modelValue", val)
  }
}
</script>

<template>
  <SliderRoot
    data-slot="slider"
    :model-value="values"
    @update:model-value="updateValue"
    :min="min"
    :max="max"
    :class="cn(
      'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
      props.class
    )"
  >
    <SliderTrack
      data-slot="slider-track"
      class="bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
    >
      <SliderRange
        data-slot="slider-range"
        class="bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
      />
    </SliderTrack>

    <SliderThumb
      v-for="(_, index) in values"
      :key="index"
      data-slot="slider-thumb"
      class="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderRoot>
</template>
