<script setup>
import { inject } from "vue";

const toggle = inject("toggleCollapsible");
</script>

<template>
  <button data-slot="collapsible-trigger" @click="toggle">
    <slot />
  </button>
</template>
