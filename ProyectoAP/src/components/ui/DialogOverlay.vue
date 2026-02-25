<script setup>
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "../../lib/utils"
</script>

<template>
  <DialogPrimitive.Overlay
    data-slot="dialog-overlay"
    :class="cn(
      'fixed inset-0 z-50 bg-black/50',
      $attrs.class
    )"
    v-bind="$attrs"
  />
</template>
