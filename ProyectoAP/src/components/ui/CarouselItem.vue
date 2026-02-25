<script setup>
import { inject } from "vue";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const props = defineProps({
  class: String,
});

const carousel = inject("carousel");
</script>

<template>
  <div
    role="group"
    aria-roledescription="slide"
    data-slot="carousel-item"
    :class="cn(
      'min-w-0 shrink-0 grow-0 basis-full',
      carousel.orientation === 'horizontal' ? 'pl-4' : 'pt-4',
      props.class
    )"
  >
    <slot />
  </div>
</template>
