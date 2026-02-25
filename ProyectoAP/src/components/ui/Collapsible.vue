<script setup>
import { ref, provide, inject } from "vue";

const props = defineProps({
  defaultOpen: Boolean,
});

const isOpen = ref(props.defaultOpen ?? false);

function toggle() {
  isOpen.value = !isOpen.value;
}

provide("collapsibleOpen", isOpen);
provide("toggleCollapsible", toggle);
</script>

<template>
  <div data-slot="collapsible">
    <slot />
  </div>
</template>
