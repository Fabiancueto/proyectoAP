<script setup lang="ts">
import { inject, computed } from "vue"

interface Props {
  value: string | number
  disabled?: boolean
  class?: string
}

const props = defineProps<Props>()
const ctx = inject<any>("selectContext")

const selected = computed(
  () => ctx.modelValue.value === props.value
)

const handleClick = () => {
  if (!props.disabled) ctx.selectValue(props.value)
}
</script>

<template>
  <div
    data-slot="select-item"
    @click="handleClick"
    :class="[
      'relative flex w-full cursor-pointer items-center rounded-sm py-1.5 pr-8 pl-2 text-sm select-none',
      selected ? 'bg-accent text-accent-foreground' : '',
      disabled ? 'opacity-50 pointer-events-none' : '',
      $props.class
    ]"
  >
    <span class="flex-1 truncate">
      <slot />
    </span>

    <span
      v-if="selected"
      class="absolute right-2 flex items-center justify-center"
    >
      ✓
    </span>
  </div>
</template>
