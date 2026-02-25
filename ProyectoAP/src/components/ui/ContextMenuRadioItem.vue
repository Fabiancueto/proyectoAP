<script setup>
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { CircleIcon } from "lucide-react"
import { cn } from "../../lib/utils"
</script>

<template>
  <ContextMenuPrimitive.RadioItem
    data-slot="context-menu-radio-item"
    :class="cn('relative flex items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm', $attrs.class)"
    v-bind="$attrs"
  >
    <span class="absolute left-2 flex size-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <CircleIcon class="size-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    <slot />
  </ContextMenuPrimitive.RadioItem>
</template>
