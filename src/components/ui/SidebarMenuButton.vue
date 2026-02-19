<script setup lang="ts">
import { computed } from "vue"
import { useSidebar } from "./useSidebar"

interface Props {
  isActive?: boolean
  class?: string
}

const props = defineProps<Props>()
const { state } = useSidebar()

const collapsed = computed(() => state.value === "collapsed")
</script>

<template>
  <button
    :data-active="isActive"
    class="flex items-center gap-2 rounded-md p-2 text-sm transition hover:bg-sidebar-accent"
    :class="[
      isActive ? 'bg-sidebar-accent font-medium' : '',
      collapsed ? 'justify-center' : '',
      props.class
    ]"
  >
    <slot />
  </button>
</template>
