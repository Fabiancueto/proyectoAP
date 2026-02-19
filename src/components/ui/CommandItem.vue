<script setup>
defineProps({
  disabled: Boolean
});
</script>

<template>
  <div
    data-slot="command-item"
    :class="[
      'relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm select-none',
      disabled ? 'opacity-50 pointer-events-none' : 'hover:bg-accent'
    ]"
  >
    <slot />
  </div>
</template>
