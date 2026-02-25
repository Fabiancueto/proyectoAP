<script setup>
import { cn } from "../utils";
import { MoreHorizontal } from "lucide-vue-next";

defineProps({
  class: String
});
</script>

<template>
  <span
    aria-hidden
    data-slot="pagination-ellipsis"
    :class="cn('flex size-9 items-center justify-center', $props.class)"
  >
    <MoreHorizontal class="size-4" />
    <span class="sr-only">More pages</span>
  </span>
</template>
