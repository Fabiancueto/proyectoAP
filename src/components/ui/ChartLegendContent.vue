<script setup>
import { inject } from "vue";

const props = defineProps({
  payload: Array,
  verticalAlign: {
    type: String,
    default: "bottom",
  },
  hideIcon: Boolean,
  nameKey: String,
  className: String,
});

const config = inject("chartConfig") || {};

function getItemConfig(item) {
  const key = props.nameKey || item.dataKey || "value";
  return config[key] || {};
}
</script>

<template>
  <div
    v-if="payload && payload.length"
    :class="[
      'flex items-center justify-center gap-4',
      verticalAlign === 'top' ? 'pb-3' : 'pt-3',
      className,
    ]"
  >
    <div
      v-for="item in payload"
      :key="item.value"
      class="flex items-center gap-1.5"
    >
      <!-- iconito -->
      <div
        v-if="!hideIcon"
        class="h-2 w-2 rounded-[2px]"
        :style="{ backgroundColor: item.color }"
      ></div>

      <!-- label -->
      <span>
        {{ getItemConfig(item)?.label || item.value }}
      </span>
    </div>
  </div>
</template>
