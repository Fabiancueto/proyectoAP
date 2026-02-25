<script setup lang="ts">
import { inject, ref } from "vue"

interface Props {
  withHandle?: boolean
  class?: string
}

const props = defineProps<Props>()

const group = inject<any>("resizableGroup")
if (!group) {
  throw new Error("ResizableHandle must be used inside ResizablePanelGroup")
}

const handle = ref<HTMLElement | null>(null)

let isDragging = false

const onMouseDown = (e: MouseEvent) => {
  e.preventDefault()
  isDragging = true

  const container = group.container.value
  if (!container) return

  const panels = Array.from(
    container.querySelectorAll('[data-slot="resizable-panel"]')
  ) as HTMLElement[]

  const index = Array.from(container.children).indexOf(handle.value!)
  const prevPanel = panels[Math.floor(index / 2)]
  const nextPanel = panels[Math.floor(index / 2) + 1]

  if (!prevPanel || !nextPanel) return

  const start = group.direction === "horizontal" ? e.clientX : e.clientY
  const containerSize =
    group.direction === "horizontal"
      ? container.offsetWidth
      : container.offsetHeight

  const prevSize = prevPanel.getBoundingClientRect()
  const nextSize = nextPanel.getBoundingClientRect()

  const onMouseMove = (event: MouseEvent) => {
    if (!isDragging) return

    const current =
      group.direction === "horizontal"
        ? event.clientX
        : event.clientY

    const delta = current - start
    const deltaPercent = (delta / containerSize) * 100

    const newPrev =
      (prevSize[group.direction === "horizontal" ? "width" : "height"] /
        containerSize) *
        100 +
      deltaPercent

    const newNext =
      (nextSize[group.direction === "horizontal" ? "width" : "height"] /
        containerSize) *
        100 -
      deltaPercent

    if (newPrev > 5 && newNext > 5) {
      prevPanel.style.flexBasis = newPrev + "%"
      nextPanel.style.flexBasis = newNext + "%"
    }
  }

  const onMouseUp = () => {
    isDragging = false
    window.removeEventListener("mousemove", onMouseMove)
    window.removeEventListener("mouseup", onMouseUp)
  }

  window.addEventListener("mousemove", onMouseMove)
  window.addEventListener("mouseup", onMouseUp)
}
</script>

<template>
  <div
    ref="handle"
    data-slot="resizable-handle"
    :data-panel-group-direction="group.direction"
    @mousedown="onMouseDown"
    :class="[
      'bg-border relative flex items-center justify-center',
      group.direction === 'horizontal'
        ? 'w-px cursor-col-resize'
        : 'h-px w-full cursor-row-resize',
      $props.class
    ]"
  >
    <div
      v-if="withHandle"
      class="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border"
    >
      <svg
        class="w-2.5 h-2.5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <circle cx="12" cy="5" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="12" cy="19" r="1.5" />
      </svg>
    </div>
  </div>
</template>
