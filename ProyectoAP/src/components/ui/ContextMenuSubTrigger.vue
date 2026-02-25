<script setup>
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "../../lib/utils"

defineProps({ inset: Boolean })
</script>

<template>
  <ContextMenuPrimitive.SubTrigger
    data-slot="context-menu-sub-trigger"
    :data-inset="inset"
    :class="cn('flex items-center px-2 py-1.5 text-sm rounded-sm', $attrs.class)"
    v-bind="$attrs"
  >
    <slot />
    <ChevronRightIcon class="ml-auto" />
  </ContextMenuPrimitive.SubTrigger>
</template>
