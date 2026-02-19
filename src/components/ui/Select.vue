<script setup lang="ts">
import { ref, provide, computed, onMounted, onBeforeUnmount } from "vue"

interface Props {
  modelValue?: string | number | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void
}>()

const open = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

const toggle = () => (open.value = !open.value)
const close = () => (open.value = false)

const selectValue = (value: string | number) => {
  emit("update:modelValue", value)
  close()
}

const onClickOutside = (e: MouseEvent) => {
  if (
    !triggerRef.value?.contains(e.target as Node) &&
    !contentRef.value?.contains(e.target as Node)
  ) {
    close()
  }
}

onMounted(() => window.addEventListener("mousedown", onClickOutside))
onBeforeUnmount(() =>
  window.removeEventListener("mousedown", onClickOutside)
)

provide("selectContext", {
  open,
  toggle,
  close,
  selectValue,
  modelValue: computed(() => props.modelValue),
  triggerRef,
  contentRef,
})
</script>

<template>
  <div data-slot="select" class="relative inline-block w-full">
    <slot />
  </div>
</template>
