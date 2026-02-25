<script setup>
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
</script>

<template>
  <div
    data-slot="card-action"
    :class="cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', $attrs.class)"
  >
    <slot />
  </div>
</template>
