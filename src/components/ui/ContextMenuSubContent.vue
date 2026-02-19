<script setup>
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { cn } from "../../lib/utils"
</script>

<template>
  <ContextMenuPrimitive.SubContent
    data-slot="context-menu-sub-content"
    :class="cn('bg-popover text-popover-foreground rounded-md border p-1 shadow-lg', $attrs.class)"
    v-bind="$attrs"
  >
    <slot />
  </ContextMenuPrimitive.SubContent>
</template>
