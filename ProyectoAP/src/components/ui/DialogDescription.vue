<script setup>
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "../../lib/utils"
</script>

<template>
  <DialogPrimitive.Description
    data-slot="dialog-description"
    :class="cn('text-sm text-muted-foreground', $attrs.class)"
    v-bind="$attrs"
  >
    <slot />
  </DialogPrimitive.Description>
</template>
