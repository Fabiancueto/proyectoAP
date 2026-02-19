<script setup>
import { cn } from "../../lib/utils"
</script>

<template>
  <div
    data-slot="dialog-header"
    :class="cn('flex flex-col gap-2 text-center sm:text-left', $attrs.class)"
  >
    <slot />
  </div>
</template>
