<script setup lang="ts">
import { Toggle as ToggleRoot } from "radix-vue"
import { computed } from "vue"
import { cn } from "@/lib/utils"
import { toggleVariants, type ToggleVariants } from "./toggle"

const props = defineProps<
  ToggleVariants & {
    modelValue?: boolean
    class?: string
  }
>()

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void
}>()

const model = computed({
  get: () => props.modelValue ?? false,
  set: (value: boolean) => emit("update:modelValue", value),
})
</script>

<template>
  <ToggleRoot
    v-model:pressed="model"
    data-slot="toggle"
    :class="
      cn(
        toggleVariants({
          variant: variant,
          size: size,
        }),
        ($attrs.class as string)
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </ToggleRoot>
</template>
