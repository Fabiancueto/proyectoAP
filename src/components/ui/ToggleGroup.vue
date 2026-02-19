<script setup lang="ts">
import { ToggleGroupRoot } from "radix-vue"
import { provide } from "vue"
import { cn } from "@/lib/utils"
import { toggleGroupKey } from "./toggle-group-context"

const props = defineProps<{
  modelValue?: string | string[]
  type?: "single" | "multiple"
  variant?: string
  size?: string
  class?: string
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: string | string[]): void
}>()

provide(toggleGroupKey, {
  variant: props.variant,
  size: props.size,
})
</script>

<template>
  <ToggleGroupRoot
    v-model="modelValue"
    :type="type"
    data-slot="toggle-group"
    :data-variant="variant"
    :data-size="size"
    :class="
      cn(
        'group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs',
        ($attrs.class as string)
      )
    "
    @update:modelValue="(v) => emit('update:modelValue', v)"
  >
    <slot />
  </ToggleGroupRoot>
</template>
