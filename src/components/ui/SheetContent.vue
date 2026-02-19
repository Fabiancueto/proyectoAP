<script setup lang="ts">
import { inject, computed } from "vue"
import SheetOverlay from "./SheetOverlay.vue"

interface Props {
  side?: "top" | "right" | "bottom" | "left"
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  side: "right",
})

const ctx = inject<any>("sheetContext")

const sideClasses = computed(() => {
  switch (props.side) {
    case "left":
      return "left-0 inset-y-0 h-full w-3/4 sm:max-w-sm border-r"
    case "right":
      return "right-0 inset-y-0 h-full w-3/4 sm:max-w-sm border-l"
    case "top":
      return "top-0 inset-x-0 border-b"
    case "bottom":
      return "bottom-0 inset-x-0 border-t"
  }
})
</script>

<template>
  <Teleport to="body">
    <SheetOverlay />

    <transition name="sheet-slide">
      <div
        v-if="ctx.open.value"
        data-slot="sheet-content"
        :class="[
          'fixed z-50 flex flex-col gap-4 bg-white shadow-lg transition-all duration-300',
          sideClasses,
          $props.class
        ]"
      >
        <slot />

        <button
          class="absolute top-4 right-4 opacity-70 hover:opacity-100"
          @click="ctx.close"
        >
          ✕
        </button>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.sheet-slide-enter-from.right,
.sheet-slide-leave-to.right {
  transform: translateX(100%);
}
.sheet-slide-enter-from.left,
.sheet-slide-leave-to.left {
  transform: translateX(-100%);
}
.sheet-slide-enter-from.top,
.sheet-slide-leave-to.top {
  transform: translateY(-100%);
}
.sheet-slide-enter-from.bottom,
.sheet-slide-leave-to.bottom {
  transform: translateY(100%);
}
.sheet-slide-enter-active,
.sheet-slide-leave-active {
  transition: transform 0.3s ease;
}
</style>
