<script setup lang="ts">
import { TabsContent } from "radix-vue"
import { cn } from "@/lib/utils"

defineProps<{
  value: string
}>()
</script>

<template>
  <TabsContent
    :value="value"
    data-slot="tabs-content"
    :class="cn('flex-1 outline-none', ($attrs.class as string))"
  >
    <slot />
  </TabsContent>
</template>
