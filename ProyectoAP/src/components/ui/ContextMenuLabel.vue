<script setup>
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { cn } from "../../lib/utils"

defineProps({ inset: Boolean })
</script>

<template>
  <ContextMenuPrimitive.Label
    data-slot="context-menu-label"
    :data-inset="inset"
    :class="cn('px-2 py-1.5 text-sm font-medium', $attrs.class)"
    v-bind="$attrs"
  >
    <slot />
  </ContextMenuPrimitive.Label>
</template>
