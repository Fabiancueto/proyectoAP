<script setup lang="ts">
import { computed, useAttrs } from "vue"
import { cn } from "../../lib/utils"

interface Props {
  class?: string
}

const props = defineProps<Props>()
const attrs = useAttrs()

const classes = computed(() =>
  cn("bg-accent animate-pulse rounded-md", props.class)
)
</script>

<template>
  <div
    data-slot="skeleton"
    :class="classes"
    v-bind="attrs"
  />
</template>
