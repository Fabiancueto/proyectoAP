<script setup>
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { cn } from "../../lib/utils"
</script>

<template>
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      data-slot="context-menu-content"
      :class="cn('bg-popover text-popover-foreground rounded-md border p-1 shadow-md', $attrs.class)"
      v-bind="$attrs"
    >
      <slot />
    </ContextMenuPrimitive.Content>
  </ContextMenuPrimitive.Portal>
</template>
