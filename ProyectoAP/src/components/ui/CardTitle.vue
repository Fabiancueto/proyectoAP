<script setup>
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
</script>

<template>
  <h4
    data-slot="card-title"
    :class="cn('leading-none', $attrs.class)"
  >
    <slot />
  </h4>
</template>
