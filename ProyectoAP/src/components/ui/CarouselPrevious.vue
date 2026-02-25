<script setup>
import { inject } from "vue";
import { ArrowLeft } from "lucide-vue-next";

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
    data-slot="carousel-previous"
    :disabled="!carousel.canScrollPrev"
    @click="carousel.scrollPrev"
    :class="cn(
      'absolute size-8 rounded-full border flex items-center justify-center bg-white',
      carousel.orientation === 'horizontal'
        ? 'top-1/2 -left-12 -translate-y-1/2'
        : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
      props.class
    )"
  >
    <ArrowLeft class="size-4" />
  </button>
</template>
