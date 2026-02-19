<script setup>
import * as DialogPrimitive from "@radix-ui/react-dialog"
</script>

<template>
  <DialogPrimitive.Trigger data-slot="dialog-trigger">
    <slot />
  </DialogPrimitive.Trigger>
</template>
