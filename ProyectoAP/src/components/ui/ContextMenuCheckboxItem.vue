<script setup>
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { CheckIcon } from "lucide-react"
import { cn } from "../../lib/utils"

defineProps({
  checked: Boolean
})
</script>

<template>
  <ContextMenuPrimitive.CheckboxItem
    data-slot="context-menu-checkbox-item"
    :checked="checked"
    :class="cn('relative flex items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm', $attrs.class)"
    v-bind="$attrs"
  >
    <span class="absolute left-2 flex size-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <CheckIcon class="size-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    <slot />
  </ContextMenuPrimitive.CheckboxItem>
</template>
