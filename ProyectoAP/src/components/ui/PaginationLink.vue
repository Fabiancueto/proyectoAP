<script setup>
import { computed } from "vue";
import { cn } from "../utils";
import { buttonVariants } from "../button";

const props = defineProps({
  isActive: Boolean,
  size: {
    type: String,
    default: "icon"
  },
  class: String,
  href: String
});

const classes = computed(() =>
  cn(
    buttonVariants({
      variant: props.isActive ? "outline" : "ghost",
      size: props.size
    }),
    props.class
  )
);
</script>

<template>
  <a
    :href="href"
    :aria-current="isActive ? 'page' : undefined"
    data-slot="pagination-link"
    :data-active="isActive"
    :class="classes"
  >
    <slot />
  </a>
</template>
