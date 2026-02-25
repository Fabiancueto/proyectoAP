<script setup lang="ts">
import { TabsRoot } from "radix-vue"
import { cn } from "@/lib/utils"

defineProps<{
  modelValue?: string
  class?: string
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
}>()
</script>

<template>
  <TabsRoot
    v-model="modelValue"
    data-slot="tabs"
    :class="cn('flex flex-col gap-2', ($attrs.class as string))"
    @update:modelValue="(v) => emit('update:modelValue', v)"
  >
    <slot />
  </TabsRoot>
</template>
