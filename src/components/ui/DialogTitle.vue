<script setup>
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "../../lib/utils"
</script>

<template>
  <DialogPrimitive.Title
    data-slot="dialog-title"
    :class="cn('text-lg font-semibold', $attrs.class)"
    v-bind="$attrs"
  >
    <slot />
  </DialogPrimitive.Title>
</template>
