<script setup lang="ts">
import { inject, ref, onMounted } from "vue"

interface Props {
  orientation?: "vertical" | "horizontal"
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  orientation: "vertical",
})

const viewport = inject<any>("scrollAreaViewport")
if (!viewport) {
  throw new Error("ScrollBar must be used inside ScrollArea")
}

const thumb = ref<HTMLElement | null>(null)

const updateThumb = () => {
  const el = viewport.value
  if (!el || !thumb.value) return

  if (props.orientation === "vertical") {
    const ratio = el.clientHeight / el.scrollHeight
    thumb.value.style.height = ratio * 100 + "%"
    thumb.value.style.transform = `translateY(${
      (el.scrollTop / el.scrollHeight) * 100
    }%)`
  } else {
    const ratio = el.clientWidth / el.scrollWidth
    thumb.value.style.width = ratio * 100 + "%"
    thumb.value.style.transform = `translateX(${
      (el.scrollLeft / el.scrollWidth) * 100
    }%)`
  }
}

onMounted(() => {
  updateThumb()
  viewport.value?.addEventListener("scroll", updateThumb)
})
</script>

<template>
  <div
    data-slot="scroll-area-scrollbar"
    :class="[
      'absolute flex touch-none select-none p-px transition-colors',
      orientation === 'vertical'
        ? 'top-0 right-0 h-full w-2.5'
        : 'bottom-0 left-0 w-full h-2.5 flex-col',
      $props.class
    ]"
  >
    <div
      ref="thumb"
      data-slot="scroll-area-thumb"
      class="relative flex-1 rounded-full bg-border"
    />
  </div>
</template>
