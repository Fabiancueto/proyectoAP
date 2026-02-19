<script setup>
import * as DialogPrimitive from "@radix-ui/react-dialog"
</script>

<template>
  <DialogPrimitive.Root data-slot="dialog">
    <slot />
  </DialogPrimitive.Root>
</template>
