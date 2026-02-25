<template>
  <div>
    <!-- Trigger -->
    <div data-slot="drawer-trigger" @click="open = true">
      <slot name="trigger" />
    </div>

    <!-- Overlay -->
    <transition name="fade">
      <div
        v-if="open"
        data-slot="drawer-overlay"
        class="fixed inset-0 z-50 bg-black/50"
        @click="open = false"
      />
    </transition>

    <!-- Drawer Content -->
    <transition name="slide">
      <div
        v-if="open"
        data-slot="drawer-content"
        :class="[
          'fixed z-50 flex flex-col bg-background',
          positionClasses,
          contentClass
        ]"
      >
        <div
          class="bg-muted mx-auto mt-4 h-2 w-[100px] rounded-full"
        ></div>

        <!-- Header -->
        <div
          v-if="$slots.header"
          data-slot="drawer-header"
          class="flex flex-col gap-1.5 p-4"
        >
          <slot name="header" />
        </div>

        <!-- Body -->
        <div class="p-4">
          <slot />
        </div>

        <!-- Footer -->
        <div
          v-if="$slots.footer"
          data-slot="drawer-footer"
          class="mt-auto flex flex-col gap-2 p-4"
        >
          <slot name="footer" />
        </div>

        <!-- Close btn hidden helper -->
        <button
          data-slot="drawer-close"
          class="hidden"
          @click="open = false"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  side: { type: String, default: "right" }, // left right top bottom
  contentClass: { type: String, default: "" }
});

const open = ref(false);

const positionClasses = computed(() => {
  switch (props.side) {
    case "left":
      return "left-0 top-0 h-full w-3/4 max-w-sm border-r";
    case "right":
      return "right-0 top-0 h-full w-3/4 max-w-sm border-l";
    case "top":
      return "top-0 left-0 w-full max-h-[80vh] border-b";
    case "bottom":
      return "bottom-0 left-0 w-full max-h-[80vh] border-t";
    default:
      return "right-0 top-0 h-full w-3/4 max-w-sm border-l";
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform .25s;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
