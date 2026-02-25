<script setup>
import { inject } from "vue";
import { ArrowRight } from "lucide-vue-next";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const props = defineProps({
  class: String,
});

const carousel = inject("carousel");
</script>

<template>
  <button
    data-slot="carousel-next"
    :disabled="!carousel.canScrollNext"
    @click="carousel.scrollNext"
    :class="cn(
      'absolute size-8 rounded-full border flex items-center justify-center bg-white',
      carousel.orientation === 'horizontal'
        ? 'top-1/2 -right-12 -translate-y-1/2'
        : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
      props.class
    )"
  >
    <ArrowRight class="size-4" />
  </button>
</template>
