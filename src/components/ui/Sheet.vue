<script setup lang="ts">
import { ref, provide, computed, watch } from "vue"

interface Props {
  modelValue?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void
}>()

const open = computed({
  get: () => props.modelValue ?? false,
  set: (val: boolean) => emit("update:modelValue", val),
})

const toggle = () => (open.value = !open.value)
const close = () => (open.value = false)
const openSheet = () => (open.value = true)

provide("sheetContext", {
  open,
  toggle,
  close,
  openSheet,
})
</script>

<template>
  <div data-slot="sheet">
    <slot />
  </div>
</template>
