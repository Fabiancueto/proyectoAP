<script setup>
import { inject } from "vue";

const isOpen = inject("collapsibleOpen");
</script>

<template>
  <div v-show="isOpen" data-slot="collapsible-content">
    <slot />
  </div>
</template>
