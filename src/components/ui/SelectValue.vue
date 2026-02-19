<script setup lang="ts">
import { inject, computed } from "vue"

const ctx = inject<any>("selectContext")

const selected = computed(() => ctx.modelValue.value)
</script>

<template>
  <span data-slot="select-value" class="truncate">
    <slot :value="selected">
      {{ selected }}
    </slot>
  </span>
</template>
