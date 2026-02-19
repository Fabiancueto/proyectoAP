<script setup>
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
</script>

<template>
  <ContextMenuPrimitive.Group data-slot="context-menu-group">
    <slot />
  </ContextMenuPrimitive.Group>
</template>
