<script setup>
import { cn } from "../../lib/utils"
</script>

<template>
  <div
    data-slot="dialog-footer"
    :class="cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', $attrs.class)"
  >
    <slot />
  </div>
</template>
