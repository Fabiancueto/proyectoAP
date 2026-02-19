<script setup>
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
</script>

<template>
  <div
    data-slot="card"
    :class="cn('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border', $attrs.class)"
  >
    <slot />
  </div>
</template>
