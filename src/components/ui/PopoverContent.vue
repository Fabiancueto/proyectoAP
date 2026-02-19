<script setup>
import { cn } from "../utils";
import { PopoverContent, PopoverPortal } from "radix-vue";

const props = defineProps({
  class: String,
  align: {
    type: String,
    default: "center"
  },
  sideOffset: {
    type: Number,
    default: 4
  }
});
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      data-slot="popover-content"
      :align="align"
      :side-offset="sideOffset"
      :class="cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden',
        props.class
      )"
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
