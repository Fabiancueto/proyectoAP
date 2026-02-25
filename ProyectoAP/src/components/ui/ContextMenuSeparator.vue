<script setup>
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { cn } from "../../lib/utils"
</script>

<template>
  <ContextMenuPrimitive.Separator
    data-slot="context-menu-separator"
    :class="cn('bg-border -mx-1 my-1 h-px', $attrs.class)"
  />
</template>
