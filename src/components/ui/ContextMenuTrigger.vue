<script setup>
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
</script>

<template>
  <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger">
    <slot />
  </ContextMenuPrimitive.Trigger>
</template>
