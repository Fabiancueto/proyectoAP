<script setup lang="ts">
import { cn } from "@/lib/utils"
</script>

<template>
  <thead
    data-slot="table-header"
    :class="cn('[&_tr]:border-b', ($attrs.class as string))"
  >
    <slot />
  </thead>
</template>
