<script setup>
import { inject, computed } from "vue";

const props = defineProps({
  active: Boolean,
  payload: Array,
  label: [String, Number],
  class: String,
  hideLabel: Boolean,
  hideIndicator: Boolean,
  indicator: { default: "dot" },
  nameKey: String,
  labelKey: String,
  color: String
});

const config = inject("chartConfig");

function getPayloadConfig(payload, key) {
  if (!payload) return;
  const p = payload.payload || payload;
  const k = p[key] || key;
  return config?.[k] || config?.[key];
}

const show = computed(() => props.active && props.payload?.length);
</script>

<template>
  <div
    v-if="show"
    :class="[
      'border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl',
      props.class
    ]"
  >
    <div class="grid gap-1.5">
      <div v-for="item in payload" :key="item.dataKey" class="flex gap-2 items-center">
        <div
          v-if="!hideIndicator"
          class="h-2.5 w-2.5 rounded-[2px]"
          :style="{ background: props.color || item.color || item.payload?.fill }"
        />
        <div class="flex justify-between w-full">
          <span class="text-muted-foreground">
            {{ getPayloadConfig(item, nameKey || item.name || item.dataKey)?.label || item.name }}
          </span>
          <span class="font-mono font-medium">
            {{ item.value }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
