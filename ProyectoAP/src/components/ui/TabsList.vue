<script setup lang="ts">
import { TabsList } from "radix-vue"
import { cn } from "@/lib/utils"
</script>

<template>
  <TabsList
    data-slot="tabs-list"
    :class="
      cn(
        'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] flex',
        ($attrs.class as string)
      )
    "
  >
    <slot />
  </TabsList>
</template>
