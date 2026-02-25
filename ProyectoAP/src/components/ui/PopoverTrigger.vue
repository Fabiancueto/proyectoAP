<script setup>
import { PopoverTrigger } from "radix-vue";
</script>

<template>
  <PopoverTrigger data-slot="popover-trigger">
    <slot />
  </PopoverTrigger>
</template>
