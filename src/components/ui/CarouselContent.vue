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
  <div ref="carousel.carouselRef" class="overflow-hidden" data-slot="carousel-content">
    <div
      :class="cn(
        'flex',
        carousel.orientation === 'horizontal'
          ? '-ml-4'
          : '-mt-4 flex-col',
        props.class
      )"
    >
      <slot />
    </div>
  </div>
</template>
