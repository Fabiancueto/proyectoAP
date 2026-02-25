<script setup>
import { AvatarRoot, AvatarImage, AvatarFallback } from "radix-vue";
import { computed } from "vue";

// función tipo cn (class merge)
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const props = defineProps({
  className: String,
  src: String,
  alt: String,
  fallback: String
});
</script>

<template>
  <AvatarRoot
    :class="cn('relative flex size-10 shrink-0 overflow-hidden rounded-full', className)"
  >
    <!-- Imagen -->
    <AvatarImage
      v-if="src"
      :src="src"
      :alt="alt"
      class="aspect-square size-full"
    />

    <!-- Fallback -->
    <AvatarFallback
      class="bg-muted flex size-full items-center justify-center rounded-full"
    >
      {{ fallback || "?" }}
    </AvatarFallback>
  </AvatarRoot>
</template>
