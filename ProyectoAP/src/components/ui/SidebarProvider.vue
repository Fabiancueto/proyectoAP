<script setup lang="ts">
import { ref, computed, provide, onMounted, onBeforeUnmount } from "vue"

interface Props {
  modelValue?: boolean
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: true,
})

const emit = defineEmits(["update:modelValue"])

const isMobile = window.innerWidth < 768

const openInternal = ref(props.defaultOpen)

const open = computed({
  get: () => props.modelValue ?? openInternal.value,
  set: (val: boolean) => {
    if (props.modelValue !== undefined) {
      emit("update:modelValue", val)
    } else {
      openInternal.value = val
    }
    document.cookie = `sidebar_state=${val}; path=/; max-age=604800`
  },
})

const openMobile = ref(false)

const toggleSidebar = () => {
  if (isMobile) openMobile.value = !openMobile.value
  else open.value = !open.value
}

const state = computed(() =>
  open.value ? "expanded" : "collapsed"
)

const handleKey = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "b") {
    e.preventDefault()
    toggleSidebar()
  }
}

onMounted(() => window.addEventListener("keydown", handleKey))
onBeforeUnmount(() =>
  window.removeEventListener("keydown", handleKey)
)

provide("sidebarContext", {
  open,
  openMobile,
  state,
  isMobile,
  toggleSidebar,
})
</script>

<template>
  <div
    data-slot="sidebar-wrapper"
    class="flex min-h-screen w-full"
    style="--sidebar-width:16rem; --sidebar-width-icon:3rem;"
  >
    <slot />
  </div>
</template>
