<script setup lang="ts">
import { computed } from "vue"
import { useSidebar } from "./useSidebar"

interface Props {
  side?: "left" | "right"
  collapsible?: "offcanvas" | "icon" | "none"
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  side: "left",
  collapsible: "offcanvas",
})

const { open, state, isMobile, openMobile } = useSidebar()

const collapsed = computed(() => state.value === "collapsed")
</script>

<template>
  <!-- Mobile -->
  <div
    v-if="isMobile && openMobile"
    class="fixed inset-0 z-50 flex"
  >
    <div
      class="fixed inset-0 bg-black/50"
      @click="openMobile = false"
    />
    <aside
      class="relative bg-sidebar w-[18rem] h-full shadow-lg"
    >
      <slot />
    </aside>
  </div>

  <!-- Desktop -->
  <aside
    v-else
    data-slot="sidebar"
    :data-state="state"
    :class="[
      'hidden md:flex flex-col bg-sidebar transition-all duration-200',
      collapsed && collapsible === 'icon'
        ? 'w-[var(--sidebar-width-icon)]'
        : 'w-[var(--sidebar-width)]',
      props.class
    ]"
  >
    <slot />
  </aside>
</template>
