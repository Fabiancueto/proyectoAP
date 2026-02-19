<script setup lang="ts">
import { cn } from "@/lib/utils"
</script>

<template>
  <tbody
    data-slot="table-body"
    :class="cn('[&_tr:last-child]:border-0', ($attrs.class as string))"
  >
    <slot />
  </tbody>
</template>
