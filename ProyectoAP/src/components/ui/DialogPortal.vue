<script setup>
import * as DialogPrimitive from "@radix-ui/react-dialog"
</script>

<template>
  <DialogPrimitive.Portal data-slot="dialog-portal">
    <slot />
  </DialogPrimitive.Portal>
</template>
