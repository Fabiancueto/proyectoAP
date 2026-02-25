<script setup lang="ts">
import { provide, computed } from "vue"

interface Props {
  modelValue: string | number | null
  name?: string
  class?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void
}>()

const updateValue = (value: string | number) => {
  emit("update:modelValue", value)
}

provide("radioGroup", {
  modelValue: computed(() => props.modelValue),
  updateValue,
  name: props.name,
})
</script>

<template>
  <div
    data-slot="radio-group"
    role="radiogroup"
    :class="['grid gap-3', $props.class]"
  >
    <slot />
  </div>
</template>


