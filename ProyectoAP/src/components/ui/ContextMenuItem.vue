<script setup>
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { cn } from "../../lib/utils"

defineProps({
  inset: Boolean,
  variant: { type: String, default: "default" }
})
</script>

<template>
  <ContextMenuPrimitive.Item
    data-slot="context-menu-item"
    :data-inset="inset"
    :data-variant="variant"
    :class="cn(
      'flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-default',
      $attrs.class
    )"
    v-bind="$attrs"
  >
    <slot />
  </ContextMenuPrimitive.Item>
</template>
