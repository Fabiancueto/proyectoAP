<script setup>
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
</script>

<template>
  <div
    data-slot="card-content"
    :class="cn('px-6 [&:last-child]:pb-6', $attrs.class)"
  >
    <slot />
  </div>
</template>
