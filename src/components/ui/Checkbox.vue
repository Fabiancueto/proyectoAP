<script setup>
import { ref } from "vue";

const model = defineModel({ default: false });
</script>

<template>
  <label class="flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      v-model="model"
      class="peer hidden"
    />

    <!-- Caja -->
    <div
      class="size-4 rounded-[4px] border border-gray-400 
      flex items-center justify-center
      bg-white
      peer-checked:bg-primary
      peer-checked:border-primary
      transition-all"
    >
      <!-- palomita -->
      <svg
        v-if="model"
        xmlns="http://www.w3.org/2000/svg"
        class="w-3 h-3 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
      >
        <path d="M5 13l4 4L19 7"/>
      </svg>
    </div>

    <slot />
  </label>
</template>
