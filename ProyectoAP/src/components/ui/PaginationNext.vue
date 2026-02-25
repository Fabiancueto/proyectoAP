<script setup>
import { cn } from "../utils";
import PaginationLink from "./PaginationLink.vue";
import { ChevronRight } from "lucide-vue-next";

defineProps({
  class: String,
  href: String
});
</script>

<template>
  <PaginationLink
    :href="href"
    aria-label="Go to next page"
    size="default"
    :class="cn('gap-1 px-2.5 sm:pr-2.5', $props.class)"
  >
    <span class="hidden sm:block">Next</span>
    <ChevronRight />
  </PaginationLink>
</template>
