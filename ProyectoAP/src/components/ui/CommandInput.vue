<script setup>
import { inject } from "vue";

const search = inject("commandSearch");
</script>

<template>
  <div data-slot="command-input-wrapper" class="flex h-9 items-center gap-2 border-b px-3">
    <span class="opacity-50">🔍</span>
    <input
      v-model="search"
      data-slot="command-input"
      class="placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none"
      placeholder="Buscar..."
    />
  </div>
</template>