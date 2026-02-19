<script setup>
import { cn } from "../utils";
import PaginationLink from "./PaginationLink.vue";
import { ChevronLeft } from "lucide-vue-next";

defineProps({
  class: String,
  href: String
});
</script>

<template>
  <PaginationLink
    :href="href"
    aria-label="Go to previous page"
    size="default"
    :class="cn('gap-1 px-2.5 sm:pl-2.5', $props.class)"
  >
    <ChevronLeft />
    <span class="hidden sm:block">Previous</span>
  </PaginationLink>
</template>
