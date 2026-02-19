<script setup>
import { PopoverAnchor } from "radix-vue";
</script>

<template>
  <PopoverAnchor data-slot="popover-anchor">
    <slot />
  </PopoverAnchor>
</template>
