<script setup>
defineProps({
  title: { type: String, default: "Command Palette" },
  description: { type: String, default: "Search for a command..." },
  open: Boolean
});
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div class="bg-white dark:bg-zinc-900 rounded-lg w-[500px] max-w-full shadow-xl overflow-hidden">
      <div class="sr-only">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>

      <div class="overflow-hidden p-0">
        <slot />
      </div>
    </div>
  </div>
</template>
