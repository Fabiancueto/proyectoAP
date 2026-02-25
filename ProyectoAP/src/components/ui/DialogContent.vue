<script setup>
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import { cn } from "../../lib/utils"
import DialogPortal from "./DialogPortal.vue"
import DialogOverlay from "./DialogOverlay.vue"
</script>

<template>
  <DialogPortal>
    <DialogOverlay />

    <DialogPrimitive.Content
      data-slot="dialog-content"
      :class="cn(
        'bg-background fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border p-6 shadow-lg sm:max-w-lg',
        $attrs.class
      )"
      v-bind="$attrs"
    >
      <slot />

      <DialogPrimitive.Close
        class="absolute top-4 right-4 opacity-70 hover:opacity-100"
      >
        <XIcon />
        <span class="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
</template>
