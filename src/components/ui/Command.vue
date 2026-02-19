<script setup>
import { ref, provide, inject } from "vue";

const open = ref(false);
const search = ref("");

provide("commandSearch", search);
provide("commandOpen", open);
</script>

<template>
  <div
    data-slot="command"
    class="bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md"
  >
    <slot />
  </div>
</template>