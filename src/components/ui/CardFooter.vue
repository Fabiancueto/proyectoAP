<script setup>
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
</script>

<template>
  <div
    data-slot="card-footer"
    :class="cn('flex items-center px-6 pb-6 [.border-t]:pt-6', $attrs.class)"
  >
    <slot />
  </div>
</template>
