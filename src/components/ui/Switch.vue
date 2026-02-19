<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from "radix-vue"
import { computed } from "vue"
import { cn } from "@/lib/utils" // tu helper de classnames

interface Props {
  modelValue?: boolean
  disabled?: boolean
  class?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void
}>()

const model = computed({
  get: () => props.modelValue ?? false,
  set: (value: boolean) => emit("update:modelValue", value),
})
</script>

<template>
  <SwitchRoot
    v-model:checked="model"
    data-slot="switch"
    :disabled="disabled"
    :class="
      cn(
        'peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        ($attrs.class as string)
      )
    "
  >
    <SwitchThumb
      data-slot="switch-thumb"
      :class="
        cn(
          'bg-card dark:data-[state=unchecked]:bg-card-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0'
        )
      "
    />
  </SwitchRoot>
</template>
