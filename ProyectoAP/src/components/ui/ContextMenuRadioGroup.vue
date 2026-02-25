<script setup>
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
</script>

<template>
  <ContextMenuPrimitive.RadioGroup data-slot="context-menu-radio-group">
    <slot />
  </ContextMenuPrimitive.RadioGroup>
</template>
