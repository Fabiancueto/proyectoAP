<script setup>
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
</script>

<template>
  <p
    data-slot="card-description"
    :class="cn('text-muted-foreground', $attrs.class)"
  >
    <slot />
  </p>
</template>
