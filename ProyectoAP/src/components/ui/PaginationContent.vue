<script setup>
import { cn } from "../utils";

defineProps({
  class: String
});
</script>

<template>
  <ul
    data-slot="pagination-content"
    :class="cn('flex flex-row items-center gap-1', $props.class)"
  >
    <slot />
  </ul>
</template>
