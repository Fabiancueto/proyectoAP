<script setup>
import { PopoverRoot } from "radix-vue";

defineProps({});
</script>

<template>
  <PopoverRoot data-slot="popover">
    <slot />
  </PopoverRoot>
</template>
