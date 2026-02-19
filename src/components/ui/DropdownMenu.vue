<template>
  <div class="relative inline-block" ref="menuRef">
    <!-- Trigger -->
    <div @click="toggle">
      <slot name="trigger" />
    </div>

    <!-- Menu -->
    <div
      v-if="open"
      class="absolute z-50 mt-2 min-w-[8rem] rounded-md border bg-white shadow-md p-1"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onClickOutside } from "vue";

const open = ref(false);
const menuRef = ref(null);

function toggle() {
  open.value = !open.value;
}

onClickOutside(menuRef, () => {
  open.value = false;
});
</script>