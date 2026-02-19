<script setup>
import * as DialogPrimitive from "@radix-ui/react-dialog"
</script>

<template>
  <DialogPrimitive.Close data-slot="dialog-close">
    <slot />
  </DialogPrimitive.Close>
</template>
