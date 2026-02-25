<script setup>
import { ref, provide, inject, onMounted, watch } from "vue";
import useEmblaCarousel from "embla-carousel-vue";
import { ArrowLeft, ArrowRight } from "lucide-vue-next";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const props = defineProps({
  opts: Object,
  plugins: Array,
  orientation: {
    type: String,
    default: "horizontal",
  },
  class: String,
});

const emit = defineEmits(["setApi"]);

const [carouselRef, api] = useEmblaCarousel(
  {
    ...props.opts,
    axis: props.orientation === "horizontal" ? "x" : "y",
  },
  props.plugins
);

const canScrollPrev = ref(false);
const canScrollNext = ref(false);

function updateScroll() {
  if (!api.value) return;
  canScrollPrev.value = api.value.canScrollPrev();
  canScrollNext.value = api.value.canScrollNext();
}

function scrollPrev() {
  api.value?.scrollPrev();
}

function scrollNext() {
  api.value?.scrollNext();
}

provide("carousel", {
  carouselRef,
  api,
  orientation: props.orientation,
  scrollPrev,
  scrollNext,
  canScrollPrev,
  canScrollNext,
});

onMounted(() => {
  if (!api.value) return;

  emit("setApi", api.value);
  updateScroll();

  api.value.on("select", updateScroll);
  api.value.on("reInit", updateScroll);
});
</script>

<template>
  <div
    :class="cn('relative', props.class)"
    role="region"
    aria-roledescription="carousel"
    data-slot="carousel"
  >
    <slot />
  </div>
</template>
