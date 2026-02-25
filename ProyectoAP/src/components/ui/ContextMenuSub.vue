<script setup>
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
</script>

<template>
  <ContextMenuPrimitive.Sub data-slot="context-menu-sub">
    <slot />
  </ContextMenuPrimitive.Sub>
</template>
