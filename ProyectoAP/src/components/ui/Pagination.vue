<script setup>
import { cn } from "../utils";

defineProps({
  class: String
});
</script>

<template>
  <nav
    role="navigation"
    aria-label="pagination"
    data-slot="pagination"
    :class="cn('mx-auto flex w-full justify-center', $props.class)"
  >
    <slot />
  </nav>
</template>
