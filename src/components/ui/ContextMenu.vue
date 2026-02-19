<script setup>
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import { cn } from "../../lib/utils"
</script>

<!-- Root -->
<template>
  <ContextMenuPrimitive.Root data-slot="context-menu">
    <slot />
  </ContextMenuPrimitive.Root>
</template>
