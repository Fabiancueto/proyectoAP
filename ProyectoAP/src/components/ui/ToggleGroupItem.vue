<script setup lang="ts">
import { ToggleGroupItem } from "radix-vue"
import { inject, computed } from "vue"
import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"
import { toggleGroupKey } from "./toggle-group-context"

const props = defineProps<{
  value: string
  variant?: string
  size?: string
  class?: string
}>()

const context = inject(toggleGroupKey, {})

const finalVariant = computed(() => context.variant || props.variant)
const finalSize = computed(() => context.size || props.size)
</script>

<template>
  <ToggleGroupItem
    :value="value"
    data-slot="toggle-group-item"
    :data-variant="finalVariant"
    :data-size="finalSize"
    :class="
      cn(
        toggleVariants({
          variant: finalVariant as unknown as 'default' | 'outline' | null | undefined,
          size: finalSize as unknown as 'default' | 'sm' | 'lg' | null | undefined,
        }),
        'min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l',
        ($attrs.class as string)
      )
    "
  >
    <slot />
  </ToggleGroupItem>
</template>
