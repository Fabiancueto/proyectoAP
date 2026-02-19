<script setup lang="ts">
import { useSidebar } from "./useSidebar"


defineProps<{ class?: string }>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  <button
    data-slot="sidebar-trigger"
    class="size-7 flex items-center justify-center"
    @click="toggleSidebar"
  >
    <slot>☰</slot>
  </button>
</template>
