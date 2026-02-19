<script setup lang="ts">
import { inject, computed } from "vue"

interface Props {
  value: string | number
  disabled?: boolean
  class?: string
}

const props = defineProps<Props>()

const radioGroup = inject<any>("radioGroup")

if (!radioGroup) {
  throw new Error("RadioGroupItem must be used inside RadioGroup")
}

const checked = computed(() => {
  return radioGroup.modelValue.value === props.value
})

const handleChange = () => {
  if (!props.disabled) {
    radioGroup.updateValue(props.value)
  }
}
</script>

<template>
  <button
    type="button"
    role="radio"
    :aria-checked="checked"
    :disabled="disabled"
    data-slot="radio-group-item"
    @click="handleChange"
    :class="[
      'relative aspect-square size-4 shrink-0 rounded-full border transition outline-none focus-visible:ring-[3px]',
      'border-input text-primary shadow-xs',
      disabled ? 'cursor-not-allowed opacity-50' : '',
      $props.class
    ]"
  >
    <span
      v-if="checked"
      data-slot="radio-group-indicator"
      class="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
    />
  </button>
</template>
